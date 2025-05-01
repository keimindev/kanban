"use client";

import {
  IoFlagSharp,
  IoNotificationsOutline,
} from "react-icons/io5";
import { useSortable } from "@dnd-kit/sortable";
import { KanbanItem } from "../page";
import { useEffect } from "react";
import { useModalStore } from "../store/modalStore";
import { useTimeStore } from "../store/timeStore";
import { useTaskStore } from "../store/taskStore";

type KanbanProps = KanbanItem & { dragId: number };

const Kanban = ({
  id,
  title,
  description,
  time,
  notification,
  priority,
  deadline,
  dragId,
}: KanbanProps) => {
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: dragId,
  });
  const { open } = useModalStore();
  const { completeTask, deleteTask } = useTaskStore();

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  useEffect(() => {
    if (notification && time) {
      useTimeStore.getState().addEntry({ id, title, time, notified: false });
    }
  }, []);

  const formatToAMPM = (time: string) => {
    if (!time) return "";

    const [hourStr, minute] = time.split(":");
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? "PM" : "AM";

    hour = hour % 12;
    if (hour === 0) hour = 12; // 0시는 12로 바꿔야 함

    return `${hour}:${minute} ${ampm}`;
  };

  return (
    <>
    <div className="border border-gray-100 rounded-lg p-3 m-2 shadow-md bg-white flex flex-row justify-between">
      <div
        id="output"
        key={id}
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
        className="w-[99%] cursor-pointer"
        onDoubleClick={() => open(id)}
      >
        <div className="flex justify-between items-center">
          <div className="">
            <div className="flex">
              {priority != "default" ? (
                <div className="pt-1.5 mr-2">
                  <IoFlagSharp color={priority == "top" ? "red" : "green"} />
                </div>
              ) : (
                <></>
              )}
              <div className="text-lg">{title}</div>
              {notification && (
                <>
                  <div className="mt-2 mx-1 text-gray-400 ml-2">
                    <IoNotificationsOutline size={16} />
                  </div>
                  <div className="mt-1.5 text-gray-400 text-sm">
                    {formatToAMPM(time || "")}
                  </div>
                </>
              )}
            </div>
            <div className="text-gray-500">{description}</div>
            {deadline && (
              <div className="text-gray-500 mt-2 text-sm">
                Notification {time}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="z-10 w-[230px] h-[100%] flex flex-row justify-center items-center">
        <button className="mr-2 w-[49%] h-[40px] bg-indigo-100 text-indigo-500 rounded-lg cursor-pointer"  onClick={() => completeTask(id)}>Complete</button>
        <button className="w-[49%] h-[40px] bg-indigo-100 text-indigo-500 rounded-lg cursor-pointer" onClick={() => deleteTask(id)}>Delete</button>
      </div>
      </div>
    </>
  );
}
export default Kanban;