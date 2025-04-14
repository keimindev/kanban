const { app, BrowserWindow } = await import("electron");
const isDev = await import("electron-is-dev");

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    minWidth : 480,
    minHeight: 500,
    maxHeight: 950,
    resizable: true,      // 🔒 창 크기 조절 비활성화
    maximizable: false,    // 🔒 최대화 버튼 비활성화
    webPreferences: {
      nodeIntegration: false, // 노드 통합 비활성화
      contextIsolation: true, // 컨텍스트 분리
      sandbox: true, // 샌드박스화
      contextBridge: true, // contextBridge 활성화
    },
  });

  // ***중요***
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );

  if (isDev) mainWindow.webContents.openDevTools({ mode: "detach" });

  // mainWindow.setResizable(true);
  mainWindow.on("closed", () => {
    mainWindow = null;
    app.quit();
  });
  mainWindow.focus();
}

app.on("ready", createWindow);

app.on("activate", () => {
  if (mainWindow === null) createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

