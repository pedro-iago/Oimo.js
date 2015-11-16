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
  
  Interface.prevDemo = Editor.prevDemo;  
  Interface.nextDemo = Editor.nextDemo;
  TE.allObjectLoaded = Editor.currDemo;
 
  document.body.appendChild( TE.domElement );
  document.body.appendChild( Editor.domElement );
  document.body.appendChild( Interface.domElement );
  Interface.menu.appendChild( Ambience.domElement );

  demoName = Interface.demoName;
  ADD = TE.ADD;
  CAM = TE.CAM;

  TE.init();
  Editor.init();
}

//-----------------------------------------------------
//  OIMO ON MESSAGE MAIN
//-----------------------------------------------------

OimoWorker.onmessage = function(e) {
  var phase = e.data.tell;
  if(phase === "INIT_DEMO"){
    if( Editor.getScript() ) initDemo();
  }
  // create mesh
  if(phase === "INIT_THREE"){
    TE.createStaticObjects(e.data.static_objects);
    TE.createObjects(e.data.non_static);
    TE.createJoints(e.data.non_static.joints);
    OimoWorker.postMessage({tell:"UPDATE_OIMO"});
  }
  // clear three object
  if(phase === "CLEAR_THREE"){
    TE.clearAll();
  }
}

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
  OimoWorker.postMessage({tell:"CLEAR_OIMO"});
  OimoWorker.postMessage({tell:"INIT_OIMO", settings:worldSettings});
}  

//-----------------------------------------------------
//  OIMO INFO
//-----------------------------------------------------
