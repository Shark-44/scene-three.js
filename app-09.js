import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const container = document.body
const tooltip = document.querySelector('.tooltip') // constante qui cible la class tooltip
let tooltipActive = false // variable qui va permettre de definir l'etat active 

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


function addTooltip (position, name) { 
    const spriteMap = new THREE.TextureLoader().load( 'tooltip.png' );
    const spriteMaterial = new THREE.SpriteMaterial( { map: spriteMap } ); 
    const sprite = new THREE.Sprite( spriteMaterial);
    sprite.name = name 
    sprite.position.copy(position.clone().normalize().multiplyScalar(30)); 
    sprite.scale.multiplyScalar(2) 
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

const rayCaster = new THREE.Raycaster();

function onClick (e) {

    const mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        - (e.clientY / window.innerHeight) * 2 + 1,
    )
    rayCaster.setFromCamera( mouse, camera );

    const intersects = rayCaster.intersectObjects(scene.children)

    intersects.forEach(function(intersect) {
        if (intersect.object.type === 'Sprite') {
            console.log(intersect.object.name)

        }
    })
}

function onMouseMouve (e) {
    const mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        - (e.clientY / window.innerHeight) * 2 + 1,
    )
    rayCaster.setFromCamera( mouse, camera );
    let foundSprite = false
    const intersects = rayCaster.intersectObjects(scene.children)
    intersects.forEach(function(intersect) {
        if (intersect.object.type === 'Sprite') {
            let p = intersect.object.position.clone().project(camera)
            //console.log(p)
            tooltip.style.top = ((-1 * p.y + 1 ) * window.innerHeight /2) + 'px'// ajout de la position de tooltip (la formule est une mise a l'echelle -1,1 a 0,2 pour une valeur positive et /2 pour un 100% * par taille ecran)
            tooltip.style.left = ((p.x + 1) * window.innerWidth / 2) + 'px'// idem en y
            tooltip.classList.add('is-active') // pour affichage lors du survole
            tooltipActive = true // permet de changer l'etat au survol
            foundSprite = true
        }
    })
    if (foundSprite === false && tooltipActive) {
        tooltip.classList.remove('is-active')
    }
}

addTooltip(new THREE.Vector3( 45.51802272267461, -18.56677565020162, 8.924361641450966), 'intersecion') 

window.addEventListener('resize', onResize);
container.addEventListener('click', onClick);
container.addEventListener('mousemove', onMouseMouve)