import React, { useContext, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlay,
  faPause,
  faRotateLeft,
  faChevronDown,
  faChevronUp,
  faToggleOn,
} from "@fortawesome/free-solid-svg-icons";
import { InventoryContext } from "../contexts/inventory.context";
import { OrdersContext } from "../contexts/orders.context";

export default function DemoControls() {
  const {
    startUsage,
    stopUsage,
    resetInventory,
    useSelectedOnlyOn,
    setUseSelectedOnlyOn,
    isUsingStock,
  } = useContext(InventoryContext);
  const { deliveriesOn, setDeliveriesOn } = useContext(OrdersContext);
  const [isPlaying, setIsPlaying] = useState(false);
  const [resetActive, setResetActive] = useState(false);

  const [expandDemoControls, setExpandDemoControls] = useState(false);
  const toggleDemoControlsBox = (event) => {
    setExpandDemoControls(!expandDemoControls);
  };

  // Synchronize isPlaying state with isUsingStock
  useEffect(() => {
    setIsPlaying(isUsingStock);
  }, [isUsingStock]);

  useEffect(() => {
    // This empty useEffect will force the component to re-render whenever deliveriesOn changes.
  }, [deliveriesOn]);

  const startUsageWithState = () => {
    startUsage();
    setIsPlaying(true);
    setResetActive(false);
  };

  const pauseUsageWithState = () => {
    stopUsage();
    setIsPlaying(false);
    setResetActive(false);
  };

  const resetInventoryWithState = () => {
    resetInventory();
    setIsPlaying(false);
    setResetActive(true);
    setTimeout(() => {
      setResetActive(false);
    }, 500);
  };

  const handleDeliveriesToggleChange = (event) => {
    setDeliveriesOn(event.target.checked);
  };
  const handleUseSelectedOnlyToggleChange = (event) => {
    setUseSelectedOnlyOn(event.target.checked);
  };

  const togglePlayStop = () => {
    if (isPlaying) {
      pauseUsageWithState();
    } else {
      startUsageWithState();
    }
  };

  return (
    <div
      className={`flex flex-col text-dark-grey bg-zinc-50 drop-shadow-xl fixed bottom-2 right-12  w-80 p-2 rounded-2xl z-50 ${
        expandDemoControls ? "bg-white shadow-none" : ""
      }`}
    >
      <div className="flex justify-between items-center px-4 p-2 ">
        <h5 className=" font-bold text-xl text-zinc-700 flex items-center gap-2">
          <FontAwesomeIcon
            icon={faToggleOn}
            className=" text-zinc-500 text-xl"
          />{" "}
          Demo Controls
        </h5>
        <button onClick={toggleDemoControlsBox} className="">
          <FontAwesomeIcon
            icon={expandDemoControls ? faChevronDown : faChevronUp}
            className="text-xl text-zinc-400"
          />
        </button>
      </div>

      {expandDemoControls && (
        <div
          className={`w-full transition-all ease-in-out duration-500  overflow-hidden mt-5 ${
            expandDemoControls ? "opacity-100 h-auto" : "opacity-0 h-0"
          }`}
        >
          <div className="flex  gap-4 items-center mb-4 px-2">
            <p className="text-base font-semibold text-zinc-700">
              Use Inventory
            </p>

            <button
              className={` px-1 w-auto h-7.5 ${isPlaying ? "bg-teal-400" : ""}`}
              onClick={togglePlayStop}
            >
              <FontAwesomeIcon
                icon={isPlaying ? faPause : faPlay}
                className="text-xl text-zinc-600"
              />
            </button>
            <button
              className={` px-1 w-auto h-7.5 ${
                resetActive ? "bg-teal-400" : ""
              }`}
              onClick={resetInventoryWithState}
            >
              <FontAwesomeIcon
                icon={faRotateLeft}
                className="text-xl text-zinc-600"
              />
            </button>
          </div>
          <div className="flex  gap-4 items-center mb-4 px-2">
            <p className="text-base font-semibold text-zinc-700">Deliveries</p>
            <label
              htmlFor="deliveriesToggle"
              aria-label="toggle deliveries on or off"
              className="flex items-center cursor-pointer"
            >
              <div className="relative">
                <input
                  id="deliveriesToggle"
                  type="checkbox"
                  className="sr-only"
                  checked={deliveriesOn}
                  onChange={handleDeliveriesToggleChange}
                />
                <div className="block bg-emerald-400 w-10 h-6 rounded-full"></div>
                <div
                  className={`absolute left-1 top-1 bg-zinc-50 w-4 h-4 rounded-full transition-transform duration-300 ease-in-out 
                        ${deliveriesOn ? "transform translate-x-full" : ""}`}
                ></div>
              </div>
            </label>
          </div>
          <div className="p-2">
            <p className="text-sm tracking-wide text-zinc-700 ">
              Select a few products from the inventory then hit play. This will
              run down the stock for those products. When the "Stock" hits the
              "Target", you should see an order created for that product. You
              can turn deliveries on (this delivers orders at random times
              between 2 and 20 seconds) or manually deliver each order with the
              edit icon. Click reset to get the original stock numbers.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

{
  /* this below section was used to have play-selected-products-only option */
}
{
  /* <div className="use-selected-switch-container">
                        <p>Use Selected Only</p>
                        <FormControlLabel
                            control={
                                <Switch
                                    size="small"
                                    className="play-selected-only-switch"
                                    checked={useSelectedOnlyOn}
                                    onChange={handleUseSelectedOnlyToggleChange}
                                    inputProps={{ "aria-label": "Toggle switch" }}
                                    sx={{
                                        '& .MuiSwitch-thumb': {
                                            backgroundColor: 'var(--light-grey)',
                                        },
                                        '& .MuiSwitch-track': {
                                            backgroundColor: 'grey',
                                        },
                                        '&.Mui-checked .MuiSwitch-thumb': {
                                            backgroundColor: 'rgb(134, 208, 199)',
                                        },
                                        '&.Mui-checked .MuiSwitch-track': {
                                            backgroundColor: 'rgb(134, 208, 199)',
                                        },
                                    }}
                                />
                            }
                        // label="Toggle"
                        />
                    </div> */
}
{
  /* usageSpeed slider */
}
{
  /*  <div className="slider-container">
                        <p>Usage Speed</p>
                        <div className="slider">
                            <Slider
                                aria-label="Temperature"
                                defaultValue={1}
                                valueLabelDisplay="slow"
                                step={1}
                                marks
                                min={1}
                                max={5}
                                sx={{
                                    width: '100px',
                                    '& .MuiSlider-thumb': {
                                        backgroundColor: 'var(--light-grey)',
                                        borderColor: '',
                                    },
                                    '& .MuiSlider-track': {
                                        backgroundColor: 'rgb(134, 208, 199)',
                                        borderColor: 'rgb(134, 208, 199)',
                                    },
                                    '& .MuiSlider-rail': {
                                        backgroundColor: 'grey',
                                    },
                                }}
                            />
                        </div>
                    </div> */
}
