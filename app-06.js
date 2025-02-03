import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.body

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement )


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


function addTooltip (position) {
    const spriteMap = new THREE.TextureLoader().load( 'tooltip.png' );
    const spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } ); 
    const sprite = new THREE.Sprite( spriteMaterial);
    sprite.position.copy(position.clone().normalize().multiplyScalar(30)); // ici le multiplyscalar positionne par rapport a la sphere 40 est proche du rayon 50
    sprite.scale.multiplyScalar(2) // modifie la taille de la sprite (ici tooltip)
    scene.add( sprite )
}

const controls = new OrbitControls( camera, renderer.domElement );
controls.rotateSpeed = 0.2 
controls.enableZoom = false 
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
function onClick (e) {

    const mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        - (e.clientY / window.innerHeight) * 2 + 1,
    )

    const rayCaster = new THREE.Raycaster();
    rayCaster.setFromCamera( mouse, camera );

// c) observer le click d'un utilsateur  sur la sprite additionnée
const intersects = rayCaster.intersectObjects(scene.children)
console.log(intersects) // object: Object { isObject3D: true, uuid: "9bdadc5a-0267-4248-a568-31bf82b270f0", type: "Sprite", … }
/*
    const intersects = rayCaster.intersectObject(sphere)
    if (intersects.length > 0) {
        console.log(intersects[0].point) // a) permet dans la console de memoriser un point
        addTooltip(intersects[0].point)
    }
    */
}
// b) apres le console.log on peut ajouter une tooltip a un point precis.
addTooltip(new THREE.Vector3( 45.51802272267461, -18.56677565020162, 8.924361641450966), 'intersecion') // d) enfin une nouvelle proprieté un string 

window.addEventListener('resize', onResize);
container.addEventListener('click', onClick)