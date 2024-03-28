import { app, shell, BrowserWindow, Menu, ipcMain } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import fs from 'fs'
import os from 'os'
import path from 'path'
import ping from 'ping'

// Global data array
let tabelleArray = []
let timeObject = {}

// Get the user's home directory
const userHomeDirectory = os.homedir()

// Define the file path
const filePath = path.join(userHomeDirectory, 'Indrivetec-Tabelle')

// Define the file name
const tabelleData = 'tabelleData.json'
const timeData = 'timeData.json'

// Create the directory if it doesn't exist
if (!fs.existsSync(filePath)) {
  fs.mkdirSync(filePath)
}

// Create the file if it doesn't exist
if (
  !fs.existsSync(path.join(filePath, tabelleData)) ||
  !fs.existsSync(path.join(filePath, timeData))
) {
  fs.writeFileSync(path.join(filePath, tabelleData), '[]')
  fs.writeFileSync(path.join(filePath, timeData), '{}')
}

// Read the file
// Ping the HTTP adresses before inserting
tabelleArray = JSON.parse(fs.readFileSync(path.join(filePath, tabelleData), 'utf8'))
tabelleArray.forEach(function (item) {
  const host = item.remoteAccessIPAddress;
  ping.sys.probe(host, function (isAlive) {
    if (isAlive) {
      item.onlineOffline = true
    } else {
      console.log('Host ' + host + ' is offline')
    }
  })
})

timeObject = JSON.parse(fs.readFileSync(path.join(filePath, timeData), 'utf8'))

function createWindow() {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 900,
    height: 670,
    show: false,
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      contextIsolation: true,
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
    mainWindow.maximize() // Add this line
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  Menu.setApplicationMenu(
    Menu.buildFromTemplate([
      {
        label: 'Datei',
        submenu: [
          {
            label: 'Laden',
            click: async () => {}
          }
        ]
      },

      {
        label: 'Dev',
        submenu: [
          {
            label: 'Open DevTools',
            accelerator: 'F12',
            click: () => {
              mainWindow.webContents.openDevTools()
            }
          },
          {
            label: 'Reload',
            accelerator: 'CommandOrControl+R',
            click: () => {
              mainWindow.webContents.reload()
            }
          }
        ]
      }
    ])
  )

  ipcMain.on('save-data', (event, arg) => {
    tabelleArray.push(arg)
  })

  ipcMain.on('load-data', () => {
    mainWindow.webContents.send('load-data', tabelleArray)
  })

  ipcMain.on('delete-data', (event, arg) => {
    tabelleArray.splice(arg, 1)
  })

  ipcMain.on('update-data', (event, arg) => {
    tabelleArray = JSON.parse(arg)
  })

  ipcMain.on('save-time', (event, arg) => {
    timeObject = arg
  })

  ipcMain.on('load-time', () => {
    mainWindow.webContents.send('load-time', timeObject)
  })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('com.electron')

  // Default open or close DevTools by F12 in development
  // and ignore CommandOrControl + R in production.
  // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  // Save the data to the file
  const dataJSON = JSON.stringify(tabelleArray)
  fs.writeFileSync(path.join(filePath, tabelleData), dataJSON)

  const timeJSON = JSON.stringify(timeObject)
  fs.writeFileSync(path.join(filePath, timeData), timeJSON)

  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
