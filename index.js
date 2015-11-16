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
  // update three object
  if(phase === "UPDATE_THREE"){
    var mtx = new THREE.Matrix4();
    var mesh;
    // Update rendering meshes
    var m = e.data.matrix;
    var i = m.length;
    while (i--) {
      if( TE.content.children[i] ){
        mesh = TE.content.children[i];
        if( m[i][15] === 0 ){// not sleep
          mtx.fromArray( m[i] );
          mesh.position.setFromMatrixPosition( mtx )
          mesh.quaternion.setFromRotationMatrix( mtx );
        } 
      }
    }
    // Update rendering joints
    m = e.data.matrixJoint;
    i = m.length;
    while (i--) {
      if( TE.contentJoint.children[i] ){
        mesh = TE.contentJoint.children[i];
        mesh.geometry.vertices[0].set( m[i][0], m[i][1], m[i][2] );
        mesh.geometry.vertices[1].set( m[i][4], m[i][5], m[i][6] );
        mesh.geometry.verticesNeedUpdate = true;
      }
    }
    displayInfo(e.data.infos);
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

function displayInfo(a){
  var info =[
      "Broadphase: "+a[0]+"<br>",
      "Rigidbody: "+a[1]+"<br>",
      "Contact: "+a[2]+"<br>",
      "Pair Check: "+a[3]+"<br>",
      "Contact Point: "+a[4]+"<br>",
      "Island: " + a[5] +"<br><br>",
      "Broad-Phase: " + a[6].toFixed(2) + " ms<br>",
      "Narrow-Phase: " + a[7].toFixed(2) + " ms<br>",
      "Solving: " + a[8].toFixed(2) + " ms<br>",
      "Updating: " + a[9].toFixed(2) + " ms<br><br>",
      "Physics: " + a[11] +" fps / "+a[10].toFixed(2)+" ms<br>",
      "Render: " + TE.getFps()+"<br><br>",
      "Selected: "+ TE.getSelected()+"<br>",
      "Mode: "+ TE.getMouseMode()
  ].join("\n");
  Interface.log(info);
}