import { create } from "zustand";
import { dummydata } from "../utils/data";

export interface Task {
    id: number;
    title: string;
    description: string;
    notification?: boolean;
    time?: string;
    deadline?: string;
    priority?: string;
} 

interface TaskStore {
    taskList : Task[];
    addTask : (content: Task) => void;
    changeIdxTask : (content: Task[]) => void;
}


export const useTaskStore = create<TaskStore>((set) => ({
    taskList: dummydata,
    addTask : (content) => 
        set((state) => {
            const exists = state.taskList.find((e) => e.title === content.title);
            if(exists) return state;
            return {
                taskList : [...state.taskList, content],
            };
        }),
    changeIdxTask : (content) =>
        set((state) => {
            if(state.taskList === content){
                return {
                  taskList : state.taskList
                }
            }else{
                return {
                    taskList : [...content]
                  }
            }
        }),
}))
