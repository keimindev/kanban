// types/electron.d.ts
export {};

declare global {
  interface Window {
    electron: {
      scheduleNotification(arg0: { title: string; body: string; time: string; }): unknown;
      ipcRenderer: {
        send: (channel: string, ...args: unknown[]) => void;
        on: (channel: string, callback: (...args: unknown[]) => void) => void;
      };
    };
  }
}
