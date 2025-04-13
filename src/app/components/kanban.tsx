"use client";

import { IoNotificationsOutline } from "react-icons/io5";
import { IoFlagOutline } from "react-icons/io5";
import { useSortable } from "@dnd-kit/sortable";
import { KanbanItem } from "../page";

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
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: dragId.toString(),
  });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
  };

  return (
    <div
      key={id}
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="border border-gray-100 rounded-lg p-3 m-2 shadow-md bg-white"
    >
      <div className="flex">
        {priority != "default" ? (
          <div className="pt-1.5 mr-2">
            <IoFlagOutline color={priority == "top" ? "red" : "green"} />
          </div>
        ) : <></>}
        <div className="text-lg">{title}</div>
        {notification && (
          <>
            <div className="pt-1.5 mx-1">
              <IoNotificationsOutline />
            </div>
            <div className="mt-0.5">{time}</div>
          </>
        )}
      </div>
      <div>{description}</div>
      {deadline && (
        <div className="text-gray-500 mt-2 text-sm">Notification {time}</div>
      )}
    </div>
  );
};

export default Kanban;
