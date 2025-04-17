// types/electron.d.ts
export {};

declare global {
  interface Window {
    electronAPI?: {
      sendButtonClick: () => void;
      // 필요에 따라 다른 IPC 함수들도 추가할 수 있음
    };
  }
}