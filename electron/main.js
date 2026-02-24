const { app, BrowserWindow, Menu, shell } = require('electron');
const path = require('path');

// Disable GPU and sandbox for better AppImage compatibility
app.commandLine.appendSwitch('no-sandbox');
app.commandLine.appendSwitch('disable-gpu');
app.commandLine.appendSwitch('disable-software-rasterizer');
app.commandLine.appendSwitch('disable-dev-shm-usage');

// Disable hardware acceleration
app.disableHardwareAcceleration();

function createMenu() {
  const template = [
    {
      label: 'File',
      submenu: [
        {
          label: 'Import CSV',
          accelerator: 'CmdOrCtrl+O',
          click: () => {
            // This will be handled by the web app
          }
        },
        { type: 'separator' },
        {
          label: 'Quit',
          accelerator: 'CmdOrCtrl+Q',
          click: () => {
            app.quit();
          }
        }
      ]
    },
    {
      label: 'Edit',
      submenu: [
        { role: 'undo' },
        { role: 'redo' },
        { type: 'separator' },
        { role: 'cut' },
        { role: 'copy' },
        { role: 'paste' },
        { role: 'selectAll' }
      ]
    },
    {
      label: 'View',
      submenu: [
        { role: 'reload' },
        { role: 'forceReload' },
        { type: 'separator' },
        { role: 'resetZoom' },
        { role: 'zoomIn' },
        { role: 'zoomOut' },
        { type: 'separator' },
        { role: 'togglefullscreen' }
      ]
    },
    {
      label: 'Window',
      submenu: [
        { role: 'minimize' },
        { role: 'close' }
      ]
    },
    {
      label: 'Help',
      submenu: [
        {
          label: '📖 What is VCF?',
          enabled: false
        },
        {
          label: '   VCF (vCard) is a universal contact file format',
          enabled: false
        },
        {
          label: '   Works across all devices and platforms',
          enabled: false
        },
        { type: 'separator' },
        {
          label: '🎯 Why Convert CSV to VCF?',
          enabled: false
        },
        {
          label: '   📞 Import to Phone (iPhone, Android)',
          enabled: false
        },
        {
          label: '   📧 Email Clients (Gmail, Outlook)',
          enabled: false
        },
        {
          label: '   ☁️  Cloud Services (Google, iCloud)',
          enabled: false
        },
        {
          label: '   🔄 Backup & Migration',
          enabled: false
        },
        {
          label: '   👥 Share Contacts',
          enabled: false
        },
        { type: 'separator' },
        {
          label: '📝 How to Use This App',
          enabled: false
        },
        {
          label: '   1. Click "Import CSV" and select your file',
          enabled: false
        },
        {
          label: '   2. Review and edit contacts in table',
          enabled: false
        },
        {
          label: '   3. Choose Single File or Multiple Files',
          enabled: false
        },
        {
          label: '   4. Click "Convert to VCF"',
          enabled: false
        },
        {
          label: '   5. Click "Download" to save',
          enabled: false
        },
        { type: 'separator' },
        {
          label: '📱 Where to Use VCF Files',
          enabled: false
        },
        {
          label: '   iPhone: Open VCF → Add All Contacts',
          enabled: false
        },
        {
          label: '   Android: Contacts → Import from file',
          enabled: false
        },
        {
          label: '   Gmail: Google Contacts → Import',
          enabled: false
        },
        {
          label: '   Outlook: File → Import/Export → vCard',
          enabled: false
        },
        {
          label: '   WhatsApp: Import to phone, then sync',
          enabled: false
        },
        { type: 'separator' },
        {
          label: '🔒 100% Offline & Secure',
          enabled: false
        },
        {
          label: '   All processing happens on your device',
          enabled: false
        },
        {
          label: '   Your data never leaves your computer',
          enabled: false
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: false,
      enableRemoteModule: false
    },
    icon: path.join(__dirname, '../packaging/debian/usr/share/icons/hicolor/scalable/apps/csv-to-vcf-converter.svg')
  });

  // Load the built Vite app
  if (process.env.NODE_ENV === 'development') {
    mainWindow.loadURL('http://localhost:3000');
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
  }
}

app.whenReady().then(() => {
  createMenu();
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
