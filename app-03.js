import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement )


const geometry = new THREE.SphereGeometry( 15, 32, 16 ); 
//const loader = new THREE.TextureLoader(); n'est plus necessaire en modifiant l17 et 29
const texture = new THREE.TextureLoader().load('./test-2.jpg'); 
texture.wrapS = THREE.RepeatWrapping; 
texture.repeat.x = -1 
const material = new THREE.MeshBasicMaterial( { 
    map: texture, 
    side: THREE.DoubleSide 
} ); 
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );


// Ajout d'une tooltip avec sprite
const map = new THREE.TextureLoader().load( 'tooltip.png' );//chargement de la texture
const spriteMaterial = new THREE.SpriteMaterial( { map: map } ); // creation de l'outil sprite
const sprite = new THREE.Sprite( spriteMaterial);// creation de la sprite avec la texture
const position = new THREE.Vector3(10, 0, 0);// position du tooltip
sprite.position.copy(position); //application de la position
scene.add( sprite );
/* pour plusieurs tooltips on peut factoriser
function createTooltip(texturePath, position) {
    const map = new THREE.TextureLoader().load(texturePath);
    const spriteMaterial = new THREE.SpriteMaterial({ map: map });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.position.copy(position);
    scene.add(sprite);
    return sprite;
}

// Exemple d'utilisation
const tooltip1 = createTooltip('tooltip.png', new THREE.Vector3(10, 0, 0));
const tooltip2 = createTooltip('tooltip.png', new THREE.Vector3(-5, 2, 3));
*/

const controls = new OrbitControls( camera, renderer.domElement );
camera.position.set( -1, 0, 0 ); 
controls.update();


function animate() {
	requestAnimationFrame( animate );
	renderer.render( scene, camera ); 
}

animate();