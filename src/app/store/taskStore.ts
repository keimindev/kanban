import { create } from "zustand";
import { dummydata } from "../utils/data";

declare global {
  interface Window {
    api: {
      getTasks: () => Promise<Task[]>;
      addTask: (task: Task) => Promise<void>;
    };
  }
}

export interface Task {
  id: number;
  title: string;
  description: string;
  notification?: boolean;
  time?: string;
  deadline?: string;
  priority?: string;
  completed: boolean;
}

interface TaskStore {
  taskList: Task[];
  addTask: (content: Task) => void;
  changeIdxTask: (content: Task[]) => void;
  modifyTask: (content: Task) => void;
  completedTasksList: Task[]; 
  completeTask: (id: number) => void;
  deleteTask: (id: number) => void;
}

export const useTaskStore = create<TaskStore>((set) => ({
  taskList: dummydata.filter((task) => task.completed === false),
  completedTasksList: dummydata.filter((task) => task.completed === true),
  loadTasks: async () => {
    const tasks = await window.api.getTasks();
    set({ taskList: tasks });
  },
  addTask: async (content) => {
    const exists = useTaskStore.getState().taskList.find((e) => e.title === content.title);
    if (exists) return;
    await window.api.addTask({ ...content });
    const tasks = await window.api.getTasks();
    set((state) => ({
      taskList: [...state.taskList, ...tasks],
    }));
  },
  changeIdxTask: (content) =>
    set((state) => {
      if (state.taskList === content) {
        return {
          taskList: state.taskList,
        };
      } else {
        return {
          taskList: [...content],
        };
      }
    }),
  modifyTask: (content) =>
    set((state) => {
      const exists = state.taskList.some((task) => task.id === content.id);

      if (exists) {
        return {
          taskList: state.taskList.map((task) =>
            task.id === content.id ? content : task
          ),
        };
      } else {
        return {
          taskList: [...state.taskList, content],
        };
      }
    }),
  completeTask: (id) =>
    set((state) => {
      const taskToComplete = state.taskList.find((task) => task.id === id);
      if (!taskToComplete) return state;

      return {
        taskList: state.taskList.filter((task) => task.id !== id),
        completedTasksList: [
          ...state.completedTasksList,
          { ...taskToComplete, completed: true }, 
        ],
  
      };
    }),
    deleteTask: (id) =>
      set((state) => {
        return {
          taskList: state.taskList.filter((task) => task.id !== id),
        };
      }),
}));
