import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.body// variable container qui cible le body du html

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement )//  Ajout du rendu WebGL dans le body (via la variable container)


const geometry = new THREE.SphereGeometry( 50, 32, 32); // Création d'une sphère avec un rayon de 50 et une résolution de 32 segments
const texture = new THREE.TextureLoader().load('./test-2.jpg'); 
texture.wrapS = THREE.RepeatWrapping; 
texture.repeat.x = -1 
const material = new THREE.MeshBasicMaterial( { 
    map: texture, 
    side: THREE.DoubleSide 
} ); 
const sphere = new THREE.Mesh( geometry, material );
scene.add( sphere );


// modification de la tooltip. On creer un fonction pour placer des tooltips sous forme de sprite sur la sphère
function addTooltip (position) {
    const spriteMap = new THREE.TextureLoader().load( 'tooltip.png' );
    const spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } ); 
    const sprite = new THREE.Sprite( spriteMaterial);
    sprite.position.copy(position.clone().normalize().multiplyScalar(20)); 
    scene.add( sprite )
}

/*const map = new THREE.TextureLoader().load( 'tooltip.png' );
const spriteMaterial = new THREE.SpriteMaterial( { map: map } ); 
const sprite = new THREE.Sprite( spriteMaterial);
const position = new THREE.Vector3(20, 0, 0);
sprite.position.copy(position); 
scene.add( sprite );*/

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


function onResize() {
    renderer.setSize(window.innerWidth, window.innerHeight); 
    camera.aspect = window.innerWidth / window.innerHeight; 
    camera.updateProjectionMatrix(); 
}
// fonction qui va donner x et y de la souris. Raycaster permet de memoriser par rapport a la camera le point de la souris
function onClick (e) {
    // a) la position de la souris
    const mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        - (e.clientY / window.innerHeight) * 2 + 1,
    )
    // b) memorisation de la souris par la camera
    const rayCaster = new THREE.Raycaster();
    rayCaster.setFromCamera( mouse, camera );
    // c) verification des points intesection et injections des points pour creer une tooltip
    const intersects = rayCaster.intersectObject(sphere)
    if (intersects.length > 0) {
        addTooltip(intersects[0].point)
    }
}

window.addEventListener('resize', onResize);
container.addEventListener('click', onClick) // grace a cette variable on peut ecouter un click et appeler une methode