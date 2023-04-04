const electron = require('electron')
var x = document.getElementById('x')
var y = document.getElementById('y')
var z = document.getElementById('z')
var dat = document.getElementById('data')
var bound = document.getElementById('bound')
var com = document.getElementById('com')
var close = document.getElementById('close')
var stationcode = document.getElementById('stationcode')
var enn = document.getElementById('enn')
var boyy = document.getElementById('boyy')
var xstart = document.getElementById('xstart')
var ystart = document.getElementById('ystart')
var zstart = document.getElementById('zstart')


const {ipcRenderer,ipcMain} = electron

close.addEventListener('click',()=>{

   
    ipcRenderer.send('firebase',{
        stationcode:stationcode.value,
        boundfirebase:bound.value,
        portfirebase:com.value,
        enfirebase:enn.value,
        boyfirebase:boyy.value


    })

})


let count = 0;






ipcRenderer.on('consol', (err,data)=>{
    x.innerHTML = data.x
    y.innerHTML = data.y
    z.innerHTML = data.z

})
ipcRenderer.on('connectwarning', (err,data)=>{
    const newParagraph = document.createElement("p");
    newParagraph.textContent = data;
   dat.appendChild(newParagraph);
   count++;

   if (count > 10) {
       dat.removeChild(dat.firstChild);
       count--;
   }
})
ipcRenderer.on('connecterror', (err,data)=>{
    const newParagraph = document.createElement("p");
    newParagraph.textContent = data;
   dat.appendChild(newParagraph);
   count++;

   if (count > 10) {
       dat.removeChild(dat.firstChild);
       count--;
   }
})
ipcRenderer.on('connect', (err,data)=>{
    const newParagraph = document.createElement("p");
    newParagraph.textContent = data;
   dat.appendChild(newParagraph);
   count++;

   if (count > 10) {
       dat.removeChild(dat.firstChild);
       count--;
   }
})

ipcRenderer.on('dataerror', (err,data)=>{
    const newParagraph = document.createElement("p");
    newParagraph.textContent = data;
   dat.appendChild(newParagraph);
   count++;

   if (count > 10) {
       dat.removeChild(dat.firstChild);
       count--;
   }
})
ipcRenderer.on('value',(err,data)=>{
bound.value = data.boundfirebasevalue
com.value = data.portfirebasevalue
stationcode.value = data.stationcodvalue
boyy.value = data. boyfirebasevalue
enn.value = data. enfirebasevalue

})
let audio = new Audio('./teknim-hirsiz-alarm-siren-sesi.mp3');
ipcRenderer.on('alarmm',  (err, data) => {
    console.log(data);
   
    audio.play();
    const newParagraph = document.createElement("p");
    newParagraph.textContent = data;
   dat.appendChild(newParagraph);
   count++;

   if (count > 10) {
       dat.removeChild(dat.firstChild);
       count--;
   }
});



xstart.addEventListener('click',()=>{
    ipcRenderer.send('xstart','geldi')
})
ystart.addEventListener('click',()=>{
    ipcRenderer.send('ystart','geldi')
})
zstart.addEventListener('click',()=>{
    ipcRenderer.send('zstart','geldi')
})

