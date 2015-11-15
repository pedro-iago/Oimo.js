//runned by index.html
"use strict";

var version='DEV';
var TE;
var Ambience;
var Interface;
var Editor;
var OimoWorker = new Worker('js/oimo/worker_oimo_dev.js');
OimoWorker.postMessage = OimoWorker.webkitPostMessage || OimoWorker.postMessage;

window.onload = init;
function init() {
  if ( ! Detector.webgl ) Detector.addGetWebGLMessage();

  TE = new ThreeEngine();
  Editor = new Editor();
  Interface = new Interface('dev');
  Ambience = new Ambience();
 
  document.body.appendChild( TE.domElement );
  document.body.appendChild( Editor.domElement );
  document.body.appendChild( Interface.domElement );
  Interface.menu.appendChild( Ambience.domElement );

  demoName = Interface.demoName;
  ADD = TE.ADD;
  CAM = TE.CAM;

  TE.init();
}

//-----------------------------------------------------
//  OIMO ON MESSAGE MAIN
//-----------------------------------------------------


//-----------------------------------------------------
//  OIMO POST MESSAGE FUNCTION
//-----------------------------------------------------


//-----------------------------------------------------
// TRANSE SCRIPT
//-----------------------------------------------------

let worldSettings = null;
var demoName;
var CAM;
var ADD;
var WORLD = function(obj){
  worldSettings = obj || {ground:false};
}  

//-----------------------------------------------------
//  OIMO INFO
//-----------------------------------------------------

