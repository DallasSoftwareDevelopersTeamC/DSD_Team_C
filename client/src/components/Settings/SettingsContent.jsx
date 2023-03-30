import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticateUser } from '../../services/authenticationAPIcalls';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';

function SettingsContent() {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useQuery(
    'authenticateUser',
    authenticateUser,
    {
      onSuccess: (data) => {
        if (data === 'JsonWebTokenError' || data === 'TokenExpiredError') {
          navigate('/login');
        }
      },
    }
  );
  if (isError) {
    return Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: `Unable to communicate with the server. Please refresh the webpage.`,
      background: '#333',
      color: '#fff',
      confirmButtonColor: '#3b9893',
    });
  }

  const dataTwo = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
  { id: 3, name: 'Item 3' },
  { id: 4, name: 'Item 4' },
];

const TableRow = ({ item, onPin, onUnpin, isPinned }) => (
  <tr>
    <td>{item.name}</td>
    <td>
      <button onClick={() => (isPinned ? onUnpin(item) : onPin(item))}>
        {isPinned ? 'Unpin' : 'Pin'}
      </button>
    </td>
  </tr>
);

  const [pinnedItems, setPinnedItems] = useState([]);
  const [unpinnedItems, setUnpinnedItems] = useState(dataTwo);

  const handlePin = (item) => {
    setPinnedItems([...pinnedItems, item]);
    setUnpinnedItems(unpinnedItems.filter((i) => i.id !== item.id));
  };

  const handleUnpin = (item) => {
    setUnpinnedItems([...unpinnedItems, item]);
    setPinnedItems(pinnedItems.filter((i) => i.id !== item.id));
  };

  return (
    <div>
      <h1>Pinned Rows</h1>
      <table>
        <tbody>
          {pinnedItems.map((item) => (
            <TableRow key={item.id} item={item} onUnpin={handleUnpin} isPinned />
          ))}
        </tbody>
      </table>

      <h1>Unpinned Rows</h1>
      <table>
        <tbody>
          {unpinnedItems.map((item) => (
            <TableRow key={item.id} item={item} onPin={handlePin} />
          ))}
        </tbody>
      </table>
    </div>
  );
};



export default SettingsContent;
