import React from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoFlagOutline } from "react-icons/io5";

const Kanban = () => {
  return (
    <div className="border border-gray-100 rounded-lg p-3 m-2 shadow-md">
      <div className="flex">
        <div className="pt-1.5"><IoFlagOutline color="red"/></div>
        <div className="text-xl ml-2">this is title ...</div>
        <div className="pt-1.5 mx-1">
          <IoNotificationsOutline />
        </div>
        <div className="mt-0.5">03:00 pm</div>
      </div>
      <div>thislkdflk sjdifke,skjdlkfj slkjdlkfjalk dlkjf lajdljasl ldjfjdj</div>
      <div className="text-gray-500">Notification 03:00</div>
    </div>
  );
};

export default Kanban;
