import React from "react";
import { useDraggable } from "@dnd-kit/core";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoFlagOutline } from "react-icons/io5";

type KanbanItem = {
  id: string;
  title: string;
  description: string;
  notification: boolean;
  time: string;
  deadline: string;
  priority: string;
};

type KanbanProps = KanbanItem & { dragId: string };

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

  return (
    <div
      key={id}
      className="border border-gray-100 rounded-lg p-3 m-2 shadow-md bg-white"
    >
      <div className="flex">
        {priority && (
          <div className="pt-1.5">
            <IoFlagOutline color="red" />
          </div>
        )}
        <div className="text-lg ml-2">{title}</div>
        {deadline && (
          <>
            <div className="pt-1.5 mx-1">
              <IoNotificationsOutline />
            </div>
            <div className="mt-0.5">{time}</div>
          </>
        )}
      </div>
      <div>{description}</div>
      {notification && (
        <div className="text-gray-500 mt-2 text-sm">Notification {time}</div>
      )}
    </div>
  );
};

export default Kanban;
