const electron = require('electron')
const path = require('path')
const url = require('url')
const fs = require('fs')
const { SerialPort } = require('serialport')
var admin = require("firebase-admin");
var firebase = require("firebase");



function date() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth() + 1;
  const day = now.getDate();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  return formattedDateTime
}

const console = require('console')
const { app, BrowserWindow, Menu, ipcMain } = electron




var serviceAccount = require("./aglsistem-71590-firebase-adminsdk-olxun-43c7913481.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),


});
const db = admin.firestore();

firebase.initializeApp({
  apiKey: "AIzaSyDct6Llp5nINGWnp6t-NBsxWin1riyccig",
  authDomain: "aglsistem-71590.firebaseapp.com",
  databaseURL: "https://aglsistem-71590-default-rtdb.firebaseio.com",
  projectId: "aglsistem-71590",
  storageBucket: "aglsistem-71590.appspot.com",
  messagingSenderId: "510994901595",
  appId: "1:510994901595:web:c12a5b74517b3a2c4ced7e",
  measurementId: "G-MFWNV461CE"
});
const database = firebase.database()


let graarray = []
let grafikxmain;
let grafikymain;
let grafikzmain;
let mainwindow;
app.on('ready', () => {
  mainwindow = new BrowserWindow({
    width: 550,
    height: 570

  })
  mainwindow.setResizable(false)

  Menu.setApplicationMenu(null)
  mainwindow.loadURL(
    url.format({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    })
  )

  fs.readFile('C:\\erkenuyari\\istasyon_name.txt', async (error, daa) => {


    const user = db.collection('station').where('stationcode', '==', daa.toString());
    const snapshot = await user.get()

    snapshot.forEach(doc => {
      let stationcode = doc.data().stationcode
      let portfirebase = doc.data().portfirebase
      let boundfirebase = doc.data().boundfirebase
      let boyfirebase = doc.data().boyfirebase
      let enfirebase = doc.data().enfirebase

      mainwindow.webContents.send('value', {
        stationcodvalue: stationcode,
        portfirebasevalue: portfirebase,
        boundfirebasevalue: boundfirebase,
        enfirebasevalue: enfirebase,
        boyfirebasevalue: boyfirebase,



      })


      const port = new SerialPort({ path: portfirebase, baudRate: Number(boundfirebase) })
      port.on('readable', function () {
        graarray = []



        let data = port.read()
        let str = data.toString()
        graarray.push(str)
        var array = str.split('#')
        const nums = array.map(st => parseInt(st.split(':')[1]));
        nums[2] = nums[2] + 210;
        // console.log(nums)

      


        if (nums[0] > 30) {
          if (nums[0] > -30) {
            mainwindow.webContents.send('alarmm', 'alarm aktif')
            database.ref("uyari_ver_1").set(date())
          }
        }
        if (nums[1] > 30) {
          if (nums[1] > -30) {
            mainwindow.webContents.send('alarmm', 'alarm aktif')
            database.ref("uyari_ver_1").set(date())

          }
        }
        if (nums[2] > 30) {
          if (nums[2] > -30) {
            mainwindow.webContents.send('alarmm', 'alarm aktif')

            database.ref("uyari_ver_1").set(date())

          }
        }
        mainwindow.webContents.send('consol', {
          x: nums[0],
          y: nums[1],
          z: nums[2],

        })



      })

      port.on('open', function () {
        console.log('SeriPorta Bağlanildi')
        mainwindow.webContents.send('connect', 'SeriPorta Bağlanildi')
      })
      let errorSent = false;

      port.on('close', function () {
        console.error('Seri port bağlanti kesildi')
        mainwindow.webContents.send('connecterror', 'Seri port bağlanti kesildi')
        errorSent = false
        setTimeout(function () {
          port.open()

        }, 1000)
      })



      port.on('error', (err) => {
        if (!errorSent) {
          mainwindow.webContents.send('connectwarning', 'SeriPort Bağlantısını Kontrol edin');
          errorSent = true;
        }
        setTimeout(function () {
          port.open();
          console.log('SeriPort Bağlantısını Kontrol edin');

        }, 1000);

      });





    })

  })

})

ipcMain.on('firebase', (err, data) => {

  console.log(data.stationcode)
  console.log(data.portfirebase)
  console.log(data.stationcode)

  db.collection('station').doc(data.stationcode)
    .set({
      stationcode: data.stationcode,
      portfirebase: data.portfirebase,
      boundfirebase: data.boundfirebase,
      enfirebase: data.enfirebase,
      boyfirebase: data.boyfirebase,

    })

  const directoryPath = 'C:/erkenuyari';
  const filePath = `${directoryPath}/istasyon_name.txt`;

  if (fs.existsSync(directoryPath)) {
    writeToFile();
  } else {
    fs.mkdir(directoryPath, { recursive: true }, (err) => {
      if (err) {
        console.log('Station is Undefined')
        return;
      }

      writeToFile();
    });
  }

  function writeToFile() {
    fs.writeFile(filePath, data.stationcode, { flag: 'w' }, (err) => {
      if (err) {
        console.log('Station is Undefined')
      } else {
        console.log('Station is Defined')

      }
    });
  }




})



app.on('ready', () => {
  ipcMain.on('xstart', (err, data) => {
    // console.log(data)
    grafikxmain = new BrowserWindow({
      width: 950,
      height: 350

    })



    grafikxmain.loadURL(
      url.format({
        pathname: path.join(__dirname, 'grafik.html'),
        protocol: 'file',
        slashes: true
      }))

function updatee(){
  var array = graarray[0].split('#')
  const nums = array.map(st => parseInt(st.split(':')[1]));
  nums[2] = nums[2] + 210;
  console.log(nums)
   grafikxmain.webContents.send('grafikx',nums[0])

}

 setInterval(updatee,50)



  })
})

app.on('ready', () => {
  ipcMain.on('ystart', (err, data) => {
    // console.log(data)
    grafikymain = new BrowserWindow({
      width: 950,
      height: 350

    })



    grafikymain.loadURL(
      url.format({
        pathname: path.join(__dirname, 'grafiky.html'),
        protocol: 'file',
        slashes: true
      }))

function updatee(){
  var array = graarray[0].split('#')
  const nums = array.map(st => parseInt(st.split(':')[1]));
  nums[2] = nums[2] + 210;
  // console.log(nums)
   grafikymain.webContents.send('grafiky',nums[1])

}

 setInterval(updatee,50)



  })
})

app.on('ready', () => {
  ipcMain.on('zstart', (err, data) => {
    // console.log(data)
    grafikzmain = new BrowserWindow({
      width: 950,
      height: 350

    })



    grafikzmain.loadURL(
      url.format({
        pathname: path.join(__dirname, 'grafikz.html'),
        protocol: 'file',
        slashes: true
      }))

function updatee(){
  var array = graarray[0].split('#')
  const nums = array.map(st => parseInt(st.split(':')[1]));
  nums[2] = nums[2] + 210;
  // console.log(nums)
   grafikzmain.webContents.send('grafikz',nums[2])

}

 setInterval(updatee,50)



  })
})


