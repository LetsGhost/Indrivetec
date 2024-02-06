import { app, shell, BrowserWindow, Menu, ipcMain, dialog } from 'electron'
import { join } from 'path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/icon.png?asset'
import Store from 'electron-store'
import fs from 'fs'
import axios from 'axios'
import url from 'url'


const store = new Store()
const timeStore = new Store({ name: 'date-time' })

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
            label: 'Speichern',
            click: async () => {
              const currentTime = new Date()
              const date = currentTime.toLocaleDateString('de-DE')
              const dateTime = `${date}`
              const { filePath } = await dialog.showSaveDialog({
                title: 'Save data to file',
                defaultPath: `Tabelle_${dateTime}.json`,
                filters: [{ name: `JSON`, extensions: ['json'] }]
              })

              if (filePath) {
                const data = JSON.stringify(store.store)
                fs.writeFileSync(filePath, data)
              }
            }
          },
          {
            label: 'Laden',
            click: async () => {
              const { filePaths } = await dialog.showOpenDialog({
                title: 'Load data from file',
                filters: [{ name: `JSON`, extensions: ['json'] }]
              })

              if (filePaths[0]) {
                const data = fs.readFileSync(filePaths[0])
                const parsedData = JSON.parse(data)
                store.clear()
                for (const [key, value] of Object.entries(parsedData)) {
                  store.set(key, value)
                }
                mainWindow.webContents.reload()
              }
            }
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
          },
          {
            label: 'Clear',
            accelerator: 'CommandOrControl+D',
            click: () => {
              store.clear()
              timeStore.clear()
            }
          }
        ]
      }
      
    ])
  )

  let id = 0
  ipcMain.on('save-data', (event, arg) => {
    store.set(id.toString(), arg)
    id++
    //mainWindow.webContents.reload()
  })

  ipcMain.on('load-data', () => {
    const items = store.store
    const length = Object.keys(items).length
    id = length

    let fetchPromises = []

    for (let key in items) {
      let remoteAccessURL = items[key].remoteAccessIPAddress;
      let parsedURL = url.parse(remoteAccessURL, true);
    
      // If the protocol is not specified, assume it's http
      if (!parsedURL.protocol) {
        // Check if the hostname is not null and starts with 'www.' 
        if (parsedURL.hostname && parsedURL.hostname.startsWith('www.')) {
          // If it does, assume it's an https URL
          remoteAccessURL = 'https://' + remoteAccessURL;
        } else {
          // If it doesn't, assume it's an http URL
          remoteAccessURL = 'http://' + remoteAccessURL;
        }
      }
    
      let fetchPromise = axios.get(remoteAccessURL)
        .then(() => {
          items[key].onlineOffline = true
        })
        .catch((error) => {
          console.error(`Failed to fetch from ${remoteAccessURL}: ${error.message}`);
          items[key].onlineOffline = false
        })
    
      fetchPromises.push(fetchPromise)
    }

    Promise.all(fetchPromises).then(() => {
      mainWindow.webContents.send('load-data', items)
    })
  })

  ipcMain.on('delete-data', (event, arg) => {
    store.delete(arg.toString())
  })

  ipcMain.on('update-data', (event, arg) => {
    const parsedData = JSON.parse(arg)
    for(let i = 0; i < parsedData.length; i++) {
      store.set(i.toString(), parsedData[i])
    }
  })

  ipcMain.on('save-date', (event, arg) => {
    timeStore.set('time', arg.time)
    timeStore.set('date', arg.date)
  })

  ipcMain.on('load-date', () => {
    const items = timeStore.store
    mainWindow.webContents.send('load-date', items)
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
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
