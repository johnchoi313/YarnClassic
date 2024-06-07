// This file serves as e middle layer to communicate between the web app and electron's native features
const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;
const path = require('path');
const fs = require('fs');
const yarnWindow = electron.remote.getCurrentWindow();
let yarn = null;

const editorFrameEl = document.getElementById('yarn-frame');
window.addEventListener('yarnReady', (e) => {
  
  //give the yarn webb app the fs module, so we can ctrl+s in electron without pop ups
  yarn = e;
  yarn.app.fs = fs;
  yarn.app.electron = electron;
  yarn.app.path = path;
  ipcRenderer.send('yarn-ready');
  console.log('connected to electron', yarn, yarn.electron);
});
editorFrameEl.src = 'app/index.html';

// Called on load yarn data.
window.addEventListener('yarnLoadedData', (e) => {
  yarnWindow.setTitle(yarn.app.data.editingPath());
  yarn.app.refreshWindowTitle();
});

// Called on save yarn data.
window.addEventListener('yarnSavedData', (e) => {
  // console.log("RENAME TITLE")
  yarnWindow.setTitle(yarn.app.data.editingPath());
  yarn.app.refreshWindowTitle();
});
