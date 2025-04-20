const { app, BrowserWindow} = await import("electron");
const isDev = await import("electron-is-dev");


let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    minWidth: 480,
    minHeight: 500,
    maxHeight: 950,
    resizable: true, // 🔒 창 크기 조절 비활성화
    maximizable: false, // 🔒 최대화 버튼 비활성화
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true, // 샌드박스화
      contextBridge: true, // contextBridge 활성화
      enableRemoteModule: true,
    },
  });

  mainWindow.loadURL(
    isDev
      ? "http://localhost:3000"
      : `file://${path.join(__dirname, "../build/index.html")}`
  );


  
  if (isDev) mainWindow.webContents.openDevTools({ mode: "detach" });

  mainWindow.on("closed", () => {
    mainWindow = null;
    app.quit();
  });
  mainWindow.focus();
}


app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

