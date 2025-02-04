import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import gsap from "gsap";


const container = document.body
const tooltip = document.querySelector('.tooltip') 
let spriteActive = false 

// Derniere etape pour transition de scene

class Scene {
   
    constructor (image) {
        this.image = image
        this.points = []
        this.sprites = []
        this.scene = null
    }

    
    createScene (scene) {
        this.scene = scene
        const geometry = new THREE.SphereGeometry( 50, 32, 32); 
        const texture = new THREE.TextureLoader().load(this.image); 
        texture.wrapS = THREE.RepeatWrapping; 
        texture.repeat.x = -1 
        const material = new THREE.MeshBasicMaterial( { 
            map: texture, 
            side: THREE.DoubleSide 
        } ); 
        this.sphere = new THREE.Mesh( geometry, material );
        this.scene.add( this.sphere );
        this.points.forEach(this.addTooltip.bind(this))
        }

    addPoint (point) {
        this.points.push(point);
       

    }
   

    addTooltip (point) { 
        const spriteMap = new THREE.TextureLoader().load( 'tooltip.png' );
        const spriteMaterial = new THREE.SpriteMaterial({ 
            map: spriteMap,
            transparent: true, 
            alphaTest: 0.5 
        }); 
        const sprite = new THREE.Sprite( spriteMaterial);
        sprite.name = point.name 
        sprite.position.copy(point.position.clone().normalize().multiplyScalar(30)); 
        sprite.scale.multiplyScalar(2) 
        this.scene.add( sprite )
        this.sprites.push(sprite)
        
    
        sprite.onClick = () => {
            this.destroy();
            // Attendre la fin de l'animation avant de créer la nouvelle scène
            setTimeout(() => {
                point.scene.createScene(scene);
            }, 500); // 1000ms = durée de l'animation
        }
    }

   
    destroy () {
        
        this.sphere.material.transparent = true;
        tooltip.classList.remove('is-active');   
        gsap.to(this.sphere.material, {
            duration: 1,
            opacity: 0,
            onUpdate: () => {
                
                renderer.render(scene, camera);
            },
            onComplete: () => {
                this.scene.remove(this.sphere)
            }
        });
       
        this.sprites.forEach((sprite) => {
            sprite.material.transparent = true; 
            gsap.to(sprite.material, {          
                duration: 1,
                opacity: 0,
                onComplete: () => {
                    this.scene.remove(sprite)
                }
            });
        });
    }

}


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );


const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
container.appendChild( renderer.domElement )

// instance de sphere
let s = new Scene('test-2.jpg')
let s2 = new Scene('test.jpg') 

s.addPoint({
    position:new THREE.Vector3( 45.51802272267461, -18.56677565020162, 8.924361641450966),
    name: 'go Venise',
    scene: s2 
})

s2.addPoint({
    position:new THREE.Vector3(45.51802272267461, -15.56677565020162, 1.924361641450966),
    name: 'retour',
    scene: s 
})

s.createScene(scene)



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

function onClick(e) {
    const mouse = new THREE.Vector2(
        (e.clientX / window.innerWidth) * 2 - 1,
        -(e.clientY / window.innerHeight) * 2 + 1,
    )
    rayCaster.setFromCamera(mouse, camera);
    const intersects = rayCaster.intersectObjects(scene.children)
    intersects.forEach(function(intersect) {
        if (intersect.object.type === 'Sprite') {
            intersect.object.onClick() 
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
          
            tooltip.style.top = ((-1 * p.y + 1 ) * window.innerHeight /2) + 'px'
            tooltip.style.left = ((p.x + 1) * window.innerWidth / 2) + 'px'
            tooltip.classList.add('is-active') 
            tooltip.innerHTML = intersect.object.name 
            spriteActive = intersect.object 
            foundSprite = true
            gsap.to(intersect.object.scale, { duration: 0.3, x: 6, y: 6 }); 

        }
    })
    if (foundSprite === false && spriteActive) {
        tooltip.classList.remove('is-active')
        gsap.to(spriteActive.scale, { duration: 0.3, x: 2, y: 2 }); 
    }
}

window.addEventListener('resize', onResize);
container.addEventListener('click', onClick);
container.addEventListener('mousemove', onMouseMouve)