"use client";

import { ChangeEvent, useState } from "react";
import { useModalStore } from "../store/modalStore";
import { IoCloseCircle, IoNotificationsOutline } from "react-icons/io5";
import { KanbanItem } from "../page";

function Newkanban() {
  const { close } = useModalStore();

  const [newTask, setNewTask] = useState<KanbanItem>({
    id: "1",
    title: "",
    description: "",
    notification: false,
    time: "00:00",
    deadline: "",
    priority: "default",
  });

  const [open, setOpen] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTask((prev) => ({
      ...prev,
      time: e.target.value,
    }));
  };

  const handleSetTask = (key: keyof KanbanItem, value: string | boolean) => {
    setNewTask((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleSaveNewTask = () => {
    console.log(newTask);
  };

  return (
    <div className="min-w-[450px] bg-white rounded-lg m-2 shadow-md">
      <div className="bg-indigo-200 h-[28px] rounded-t-lg flex justify-end items-center">
        <div className="mr-2 cursor-pointer" onClick={close}>
          <IoCloseCircle size={18} color="gray" />
        </div>
      </div>
      <div className="m-2">
        <div className="flex">
          <input
            type="text"
            className="w-[450px] outline-none"
            placeholder="Taks"
            maxLength={150}
            value={newTask.title}
            onChange={(e) => handleSetTask("title", e.target.value)}
          />
          <div className="relative cursor-pointer">
            <div
              className={`w-4 h-4 rounded-sm bg-${
                newTask.priority == "top"
                  ? "red-500"
                  : newTask.priority == "middle"
                  ? "green-500"
                  : "gray-200"
              } mt-1`}
              onClick={() => setOpen(true)}
            ></div>
            {open && (
              <div className="absolute top-5.5 right-0 cursor-pointer flex-column">
                <div
                  className="w-4 h-4 rounded-sm bg-red-500 mb-0.5"
                  onClick={() => {
                    setOpen(false);
                    setNewTask((prev) => ({
                      ...prev,
                      priority: "top",
                    }));
                  }}
                ></div>
                <div
                  className="w-4 h-4 rounded-sm bg-green-500 mb-0.5"
                  onClick={() => {
                    setOpen(false);
                    setNewTask((prev) => ({
                      ...prev,
                      priority: "middle",
                    }));
                  }}
                ></div>
                <div
                  className="w-4 h-4 rounded-sm bg-gray-200 mb-0.5"
                  onClick={() => {
                    setOpen(false);
                    setNewTask((prev) => ({
                      ...prev,
                      priority: "default",
                    }));
                  }}
                ></div>
              </div>
            )}
          </div>
        </div>
        <textarea
          className="mt-2 w-[450px] outline-none resize-none h-[100px]"
          placeholder="Leave comment"
          maxLength={300}
          onChange={(e) => handleSetTask("description", e.target.value)}
        />
        <div className="mt-2 h-[40px] text-sm">
          <div className="inline-flex">
            <div className="mx-1">
              <IoNotificationsOutline size={20} />
            </div>
            {newTask.notification ? (
              <form className="max-w-[8rem] outline-none mr-2">
                <div className="relative">
                  <input
                    type="time"
                    id="time"
                    className="w-[6rem] outline-none text-gray-900 text-sm border-b-2 border-indigo-500"
                    min="09:00"
                    max="18:00"
                    value={newTask.time}
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
              onChange={() =>
                handleSetTask("notification", !newTask.notification)
              }
              checked={newTask.notification ? true : false}
            />
            <div className="relative w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600 dark:peer-checked:bg-indigo-600"></div>
          </label>
        </div>
        <div className="flex justify-end">
          <button
            className="disabled:bg-indigo-200 bg-indigo-500 hover:bg-indigo-500 p-2 text-white rounded-lg outline-none cursor-pointer"
            type="button"
            onClick={() => {
              close();
              handleSaveNewTask();
            }}
            disabled={newTask.title == ""}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}

export default Newkanban;
