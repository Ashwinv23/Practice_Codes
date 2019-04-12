'use strict';
var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 2, 1000);
// var controls = new THREE.OrbitControls( camera );
camera.position.set( 0, 10, 0 );
camera.position.z = 50;
var texture = new THREE.TextureLoader().load( "./images/stomach.png" );
var material = new THREE.MeshPhongMaterial( { map: texture, shininess: 10 } );
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var loader = new THREE.OBJLoader();
var stomachObj;
var stomachAngle = Math.PI / 2;
var target = Math.PI / 2;
var isRotating = false;
// var directionalLight = new THREE.DirectionalLight( 0xFFFFFF, 1.5 );
// directionalLight.position.set( 10, 20, 50 );
// // directionalLight.target(0, 30, 0);
// scene.add( directionalLight );
// var directionalLight1 = new THREE.DirectionalLight( 0xFFFFFF, -1.5 );
// directionalLight1.position.set( 0, 20, -50 );
// // directionalLight1.target(0, 30, 0);
// scene.add( directionalLight1 );

const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.DirectionalLight(color, intensity);
  light.position.set(3, 8, 4);
  scene.add(light);

loader.load('model.obj', function (obj) {
  stomachObj = obj;
  event.preventDefault();
  for(var i = 0; i < obj.children.length; i++) {
    obj.children[i].material = material;
  }
  obj.scale.set(12,12,12);
  obj.rotation.set(-Math.PI/2, -0.02, stomachAngle);
  obj.position.set(0, 30, 0);
  scene.add(obj);
});

function moveObj(zaxis) {
  // stomachObj.rotation.set(-Math.PI/2, -0.02, zaxis);
  isRotating = true;
  target = zaxis;
}

function render() {
  requestAnimationFrame(render);
  if (isRotating) {
    if (target < stomachAngle) {
      stomachAngle -= 0.075;
    }
    if (target > stomachAngle) {
      stomachAngle += 0.075;
    }
    stomachObj.rotation.z = stomachAngle;
  }
  renderer.render(scene, camera);
}

render();
