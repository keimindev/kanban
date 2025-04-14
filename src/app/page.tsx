'use client';

import Newkanban from "./components/newkanban";
import Kanban from "./components/kanban";
import { useModalStore } from "./store/modalStore";
import { useEffect, useState } from "react";
import { dummydata } from "./utils/data";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { FaPlus } from "react-icons/fa";



export type KanbanItem = {
  id: string;
  title: string;
  description: string;
  notification?: boolean;
  time?: string;
  deadline?: string;
  priority?: string;
};

export default function Home() {
  const { isOpen, openNew } = useModalStore();
  const [tasks, setTasks] = useState<KanbanItem[]>(dummydata);

  useEffect(() => {
    setTasks(dummydata);
  }, []);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = tasks.findIndex(
      (t) => t.id.toString() === active.id.toString()
    );
    const newIndex = tasks.findIndex(
      (t) => t.id.toString() === over.id.toString()
    );

    if (oldIndex === -1 || newIndex === -1) return;

    setTasks((tasks) => arrayMove(tasks, oldIndex, newIndex));
  }

  return (
    <>
      <div className="text-center">Kanban</div>
      <div className="relative h-screen">
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
            <Newkanban />
          </div>
        )}
        <DndContext onDragEnd={handleDragEnd}>
          <div className="p-2">
            <SortableContext items={tasks}>
              {tasks?.map((task) => {
                return (
                  <Kanban key={task.id} {...task} dragId={task.id.toString()} />
                );
              })}
            </SortableContext>
          </div>
        </DndContext>
        <div
          className="fixed bottom-[30px] right-[30px] w-[50px] h-[50px] rounded-full bg-indigo-600 text-white cursor-pointer flex justify-center items-center shadow-xl/20"
          onClick={openNew}
        >
          <FaPlus size={24} />
        </div>
      </div>
    </>
  );
}
