"use client";

import Newkanban from "./components/newkanban";
import { useModalStore } from "./store/modalStore";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { FaPlus } from "react-icons/fa";
import dynamic from "next/dynamic";
import TimeNotifier from "./components/timeNotification";
import { useTaskStore } from "./store/taskStore";
import { useEffect, useState } from "react";

const Kanban = dynamic(() => import("./components/kanban"), { ssr: false });

export type KanbanItem = {
  id: number;
  title: string;
  description: string;
  notification?: boolean;
  time?: string;
  deadline?: string;
  priority?: string;
  completed: boolean;
};

export default function Home() {
  const { isOpen, openNew } = useModalStore();
  const { taskList, changeIdxTask, completedTasksList } = useTaskStore();

  const [showCompleted, setShowCompleted] = useState(true);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = taskList.findIndex(
      (t) => t.id.toString() === active.id.toString()
    );
    const newIndex = taskList.findIndex(
      (t) => t.id.toString() === over.id.toString()
    );

    if (oldIndex === -1 || newIndex === -1) return;

    changeIdxTask(arrayMove(taskList, oldIndex, newIndex));
  }

  useEffect(() => {
    console.log(completedTasksList, "com");
    setShowCompleted(true);
  }, [completedTasksList, taskList]);

  return (
    <>
      <div className="relative h-screen">
        {isOpen && (
          <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/40">
            <Newkanban />
          </div>
        )}
        <DndContext onDragEnd={handleDragEnd}>
          <div className="p-2">
            <SortableContext items={taskList}>
              {taskList?.map((task) => {
                return <Kanban key={task.id} {...task} dragId={task.id} />;
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
        {showCompleted && (
          <div className="absolute bottom-0 left-0 grid grid-cols-5 gap-2 p-4 mt-2 rounded-md">
            {completedTasksList.map((task) => (
              <div
                key={task.id}
                className="w-12 aspect-square bg-indigo-500 rounded-md flex items-center justify-center text-white text-xs"
                title={task.title}
              >
                ✓
              </div>
            ))}
          </div>
        )}
      </div>
      <TimeNotifier />
    </>
  );
}
