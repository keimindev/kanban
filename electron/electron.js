const { app, BrowserWindow, ipcMain } = await import("electron");
const isDev = await import("electron-is-dev");
const path = import('path');
const { Low } = import('lowdb');
const { JSONFile } = import('lowdb/node');

const adapter = new JSONFile('tasks.json');
const db = new Low(adapter);

let mainWindow;

async function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 700,
    minWidth: 480,
    minHeight: 500,
    maxHeight: 950,
    resizable: true, // 🔒 창 크기 조절 비활성화
    maximizable: false, // 🔒 최대화 버튼 비활성화
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: true, // 샌드박스화
      contextBridge: true, // contextBridge 활성화
      enableRemoteModule: true,
    },
  });

  await db.read();
  db.data ||= { tasks: [] };

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

ipcMain.handle('get-tasks', async () => {
  await db.read();
  return db.data.tasks;
});

ipcMain.handle('add-task', async (event, task) => {
  db.data.tasks.push(task);
  await db.write();
  return true;
});



app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

