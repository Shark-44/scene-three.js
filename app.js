import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement )


const geometry = new THREE.SphereGeometry( 15, 32, 16 ); 
const loader = new THREE.TextureLoader() // chargement de l'outil
const texture = loader.load('./test-2.jpg') // utilisation de l'outil pour rechercher l'image
const material = new THREE.MeshBasicMaterial( { 
    map: texture, // mise en application de l'outil
    side: THREE.DoubleSide 
} ); 
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );


const controls = new OrbitControls( camera, renderer.domElement );

camera.position.set( 1, 0, 0 ); 
controls.update();


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera ); 
}

animate();