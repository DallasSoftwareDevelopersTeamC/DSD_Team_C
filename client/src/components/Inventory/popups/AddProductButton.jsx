import React, { useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { InventoryContext } from '../../../contexts/inventory.context';
import { faSquarePlus, faFileCsv, faPlusCircle, faUpload, faCloudUploadAlt, faFileUpload } from '@fortawesome/free-solid-svg-icons';
import { sendCSVfile } from '../../../services/inventoryAPIcalls';
import AddProductPopup from './AddProductPopup.jsx';
import './AddProductButton.css';
import Swal from 'sweetalert2';

export default function AddProductButton({ data }) {
  const { reloadInventory, userData } = useContext(InventoryContext);
  // console.log(document.getElementById('csv-file'));

  /* 
    useEffect(() => {
      console.log(userData)
    }) */
  // -------------------------- CSV ----------------------------
  const openCSVPopup = async () => {
    await Swal.fire({
      icon: 'info',
      title: 'How to upload product csv file',
      html: '<div class="csv-container"><ul><li>Download or make a copy of the following Google spreadsheet: <a class="google-hyperlink" href=https://docs.google.com/spreadsheets/d/11zLdc7QNXyBjnA-qKAbet-_KD8ODlS14SRF0b8n4HEw/edit?usp=sharing target="_blank">Orderly Product Inventory List</a></li><li>Add your products to spreadsheet. You can use the following example for reference: <a class="google-hyperlink" href=https://docs.google.com/spreadsheets/d/1JuiVfSlx31bWeiF6UiBeKYsL56ll1NAX7EDUStwrAww/edit?usp=sharing target="_blank">Orderly Product Inventory List - Example<a/></li><li>Download your spreadsheet as a Comma Separated Values (.csv)</li><li>Select OK to upload your .csv file</li></ul><div>',
      text: ` products have been added to inventory`,
      background: '#19191a',
      color: '#fff',
      confirmButtonColor: '#2952e3',
      showCancelButton: true,
      customClass: {
        confirmButton: 'csv-upload-button',
        popup: 'csv-instructions',
      },
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (document?.getElementById('csv-file')) {
          const csvButton = await document?.getElementById('csv-file').click();
        }
      }
    });
  };

  const handleChange = async (e) => {
    console.log(e.target.files[0]);
    if (!e.target.files[0]) {
      return;
    }
    await sendCSVfile(e.target.files[0]);
    reloadInventory();
  };
  // -------------------------- Popup ----------------------------
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const openPopup = () => {
    setIsPopupOpen(true);
  };

  const closePopup = () => {
    setIsPopupOpen(false);
  };




  return (
    <div className="flex gap-6 text-zinc-700">
      <button 
        className="text-base"
        onClick={openPopup}
      >
        <FontAwesomeIcon icon={faPlusCircle} className='mr-1 text-lg text-emerald-500'/>
        Add Item
      </button>

      <button 
        className="text-base"
        onClick={openCSVPopup}
      >
        <FontAwesomeIcon icon={faFileUpload} className='mr-1 text-lg text-emerald-500'/>
        From File
      </button>

      {isPopupOpen && <AddProductPopup onClose={closePopup} />}
      
      <input
        type="file"
        accept=".csv"
        onChange={(e) => handleChange(e)}
        style={{ display: 'none' }}
        id="csv-file"
      />
    </div>
  );
}
