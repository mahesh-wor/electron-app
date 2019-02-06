const {app, BrowserWindow} = require('electron') // http://electron.atom.io/docs/api

let window = null;
// Wait until the app is ready
app.once('ready', () => {
  // Loading screen loads instantly.
  createLoadingScreen();
  //sleep function shows the splash
  sleep(1).then(() => { //3000
  createMainScreen();
  })

});

function createMainScreen() {
    // Create a new window
    window = new BrowserWindow({
      // Set the initial width to 800px
      width: 800,
      // Set the initial height to 600px
      height: 600,
      // Don't show the window until it ready, this prevents any white flickering
      show: false,
      //frame: false,
      icon: __dirname + 'assets/icons/png/logo.png',
      webPreferences: {
        // Disable node integration in remote page
        nodeIntegration: false
      }
    })

    // URL is argument to npm start
    // const url = process.argv[2]
    window.loadURL("https://bisolutions.com.np")
    // Remove Menus
    window.setMenu(null);
    // Show window when page is ready
    window.once('ready-to-show', () => {
      window.setTitle("BI Inhouse")
      if (loadingScreen) {
            let loadingScreenBounds = loadingScreen.getBounds();
            window.setBounds(loadingScreenBounds);
            loadingScreen.close();
        }

      window.show()
      sleep(0).then(() => { //3000
      window.maximize()
      })

      if (loadingScreen) {
            let loadingScreenBounds = loadingScreen.getBounds();
            window.setBounds(loadingScreenBounds);
            loadingScreen.close();
        }

    })

}

//sleep function
const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

function createLoadingScreen() {
  loadingScreen = new BrowserWindow(Object.assign({
    parent: window,
    width: 800,
    height: 600,
    show: false,
    frame: false,
  }));

  loadingScreen.loadURL('file://' + __dirname + '/loading.html');
  loadingScreen.on('closed', () => loadingScreen = null);
  loadingScreen.webContents.on('did-finish-load', () => {
        loadingScreen.show()
      })
}
