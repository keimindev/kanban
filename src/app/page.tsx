"use client";

import Kanban from "./components/kanban";
import { FaPlus } from "react-icons/fa";
import Newkanban from "./components/newkanban";
import { useModalStore } from "./store/modalStore";

export default function Home() {
  const { isOpen, open } = useModalStore();

  return (
    <>
      <div className="text-center">Kanban</div>
      <div className="relative h-screen">
        {isOpen && <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40"> <Newkanban /></div>}
        <div className="p-2">
          <Kanban />
          <Kanban />
          <Kanban />
        </div>
        <div
          className="fixed bottom-[30px] right-[30px] w-[50px] h-[50px] rounded-full bg-sky-800 text-white cursor-pointer flex justify-center items-center shadow-xl/20"
          onClick={open}
        >
          <FaPlus size={24} />
        </div>
      </div>
    </>
  );
}
