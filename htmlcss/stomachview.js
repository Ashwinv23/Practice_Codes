var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 2, 1000);
// var controls = new THREE.OrbitControls( camera );
camera.position.set( 0, 10, 0 );
camera.position.z = 50;
var texture = new THREE.TextureLoader().load( "./images/stomach.png" );
var material = new THREE.MeshBasicMaterial( { map: texture } );
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var loader = new THREE.OBJLoader();
var stomachObj;
var stomachAngle = Math.PI / 2;
var target = Math.PI / 2;
var isRotating = false;

loader.load('model.obj', function (obj) {
  stomachObj = obj;
  // location.reload(true);
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
  if(isRotating) {
    var oldR = stomachObj.rotation;

    stomachAngle += 0.01;
    stomachObj.rotation.set(oldR.x, oldR.y, stomachAngle);
    if(stomachAngle > target) {
      isRotating = false;
    }
  }

  renderer.render(scene, camera);
}

render();
