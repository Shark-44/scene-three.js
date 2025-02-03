import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement )


const geometry = new THREE.SphereGeometry( 50, 32, 32); 
const texture = new THREE.TextureLoader().load('./test-2.jpg'); 
texture.wrapS = THREE.RepeatWrapping; 
texture.repeat.x = -1 
const material = new THREE.MeshBasicMaterial( { 
    map: texture, 
    side: THREE.DoubleSide 
} ); 
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );



const map = new THREE.TextureLoader().load( 'tooltip.png' );
const spriteMaterial = new THREE.SpriteMaterial( { map: map } ); 
const sprite = new THREE.Sprite( spriteMaterial);
const position = new THREE.Vector3(20, 0, 0);
sprite.position.copy(position); 
scene.add( sprite );

const controls = new OrbitControls( camera, renderer.domElement );
controls.rotateSpeed = 0.2 // option de orbitControls ici vitesse de rotation
controls.enableZoom = false //  option de orbitControls ici desactivation du zoom
camera.position.set( -1, 0, 0 ); 
controls.update();


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera ); 
}

animate();

// fonction responsive
function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight); // Met à jour la taille du rendu
    camera.aspect = window.innerWidth / window.innerHeight; // Met à jour le ratio d'aspect
    camera.updateProjectionMatrix(); // Applique la mise à jour à la caméra
}

window.addEventListener('resize', onResize);

// avoir renderer.setPixelRatio(window.devicePixelRatio);
