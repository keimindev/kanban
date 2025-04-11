'use client';

import { useModalStore } from '../store/modalStore';
import { IoCloseCircle } from "react-icons/io5";

function Newkanban() {
  const { close } = useModalStore();

  return (
    <div className="min-w-[450px] bg-white rounded-lg m-2 shadow-md">
      <div className="bg-green-500 h-[28px] rounded-t-lg flex justify-end items-center">
        <div className="mr-2 cursor-pointer" onClick={close}><IoCloseCircle size={18} color="gray"/></div>
      </div>
      <div className='m-2'>
      <div className="">title</div>
      <div className="">content</div>
      <div className="">Notification</div>
      </div>
    </div>
  );
}

export default Newkanban;
