"use client";

import { ChangeEvent, useState } from "react";
import { useModalStore } from "../store/modalStore";
import { IoCloseCircle, IoNotificationsOutline } from "react-icons/io5";

function Newkanban() {
  const { close } = useModalStore();

  const [timer, setTimer] = useState<string>("00:00");
  const [notification, setNotification] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTimer(e.target.value);
    console.log("Selected Time:", timer);
  };

  

  return (
    <div className="min-w-[450px] bg-white rounded-lg m-2 shadow-md">
      <div className="bg-indigo-200 h-[28px] rounded-t-lg flex justify-end items-center">
        <div className="mr-2 cursor-pointer" onClick={close}>
          <IoCloseCircle size={18} color="gray" />
        </div>
      </div>
      <div className="m-2">
        <div className="">
          <input
            type="text"
            className="w-[450px] outline-none"
            placeholder="Taks"
            maxLength={150}
          />
        </div>
        <textarea
          className="mt-2 w-[450px] outline-none resize-none h-[100px]"
          placeholder="Leave comment"
          maxLength={300}
        />
        <div className="mt-2 h-[40px] text-sm">
          <div className="inline-flex">
            <div className="mx-1">
              <IoNotificationsOutline size={20} />
            </div>
            {notification ? (
              <form className="max-w-[8rem] outline-none mr-2">
                <div className="relative">
                  <input
                    type="time"
                    id="time"
                    className="outline-none text-gray-900 text-sm border-b-2 border-indigo-500"
                    min="09:00"
                    max="18:00"
                    value={timer}
                    required
                    onChange={handleChange}
                  />
                </div>
              </form>
            ) : (
              <></>
            )}
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              value=""
              className="sr-only peer"
              onChange={() => {
                setNotification(!notification);
              }}
              checked={notification ? true : false}
            />
            <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-600"></div>
          </label>
        </div>
        <div className="flex justify-end">
          <button
            className="bg-indigo-200 hover:bg-indigo-500 p-2 text-white rounded-lg outline-none cursor-pointer"
            type="button"
            onClick={close}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Newkanban;
