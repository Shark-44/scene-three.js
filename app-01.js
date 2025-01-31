import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Création de la scène
const scene = new THREE.Scene();

// Configuration de la caméra
// Les parametres sont angle, ratio, et les 2 derniers chiffres  (near, far) sont la zone mini et lointaine
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Création du renderer
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement )

// Création d'une sphère
const geometry = new THREE.SphereGeometry( 15, 32, 16 ); 
const material = new THREE.MeshBasicMaterial( { 
    color: 0xffff00,
    side: THREE.DoubleSide //permet de voir la texture a l'intérieur de la sphere soit les 2 faces visibles
} ); 
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );

// OrbitControls ou controle de la camera
const controls = new OrbitControls( camera, renderer.domElement );
// camera.position.set( 200, 0, 0 ); camera eloignée de 200 unités
camera.position.set( 1, 0, 0 ); //camera dans la sphere
controls.update();

// fonction qui rend dynamique app
function animate() {
	requestAnimationFrame( animate ); // boucle
	renderer.render( scene, camera );  // methode pour le render
}

animate();