var scene = new THREE.Scene();
scene.background = new THREE.Color( 0x000000 );
var camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000);
var controls = new THREE.OrbitControls( camera );
camera.position.set( 0, 10, 0 );
camera.position.z = 50;
var texture = new THREE.TextureLoader().load( "./images/stomach.png" );
var material = new THREE.MeshBasicMaterial( { map: texture } );
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var loader = new THREE.OBJLoader();
var stomachObj;


  loader.load('model.obj', function (obj) {
    stomachObj = obj;
    // location.reload(true);
    event.preventDefault();
    for(var i = 0; i < obj.children.length; i++) {
      obj.children[i].material = material;
    }
    obj.scale.set(13,13,13);
    // obj.rotation.set(-Math.PI/2, -0.02, zaxis);
    obj.position.set(0, 30, 0);
    scene.add(obj);
  });

  function moveObj(zaxis) {
    stomachObj.rotation.set(-Math.PI/2, -0.02, zaxis);
  }

function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}

render();
// moveObj(1.5); // front
// moveObj(-Math.PI/2, -0.02, 4.7); // back
// moveObj(-Math.PI/2, -0.02, 0.25); // left
//  moveObj(-Math.PI/2, -0.02, 3); // right
