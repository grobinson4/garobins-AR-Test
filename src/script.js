import './style.css'
import * as THREE from 'three'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from 'dat.gui'
import gsap from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


//Debug
const gui = new dat.GUI({closed: true, width: 400})

const parameters = {
    color: 0xff0000,
    spin: () =>
    {
        gsap.to(basketball.rotation, {duration: 1, y: basketball.rotation.y + 10})

    }
}

//Canvas
const canvas = document.querySelector('.webgl')


//Scene
const scene = new THREE.Scene()


const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => 
{
    sizes.width = window.innerWidth,
    sizes.height = window.innerHeight

    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    renderer.setSize(sizes.width, sizes.height)
})


/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

const pointLightHigh = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 15
pointLight.position.z = 4
scene.add(pointLightHigh)

const pointLightWhite = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 2
pointLight.position.y = 45
pointLight.position.z = 4
scene.add(pointLightWhite)


const pointLight2 = new THREE.PointLight(0xff0000, 1)
pointLight2.position.x = -2
pointLight2.position.y = 3
pointLight2.position.z = -44
scene.add(pointLight2)

const pointLightRed = new THREE.PointLight(0xff0000, 1)
pointLight2.position.x = -2
pointLight2.position.y = 15
pointLight2.position.z = -44
scene.add(pointLightRed)


/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 1, 1000)
camera.position.z = 3
// camera.lookAt(gltf.position)



/**
 * Models
 */
 const gltfLoader = new GLTFLoader()

 gltfLoader.load(
     '/models/robot/wraith.gltf',
     (gltf)=>
     {
         scene.add(gltf.scene.children[0]),
         camera.lookAt(gltf.position)
     }
 )

 scene.add(camera)
 
 const loadingManager = new THREE.LoadingManager()
 


/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})

const controls = new OrbitControls( camera, renderer.domElement)
controls.enableDamping = true;

renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const clock = new THREE.Clock()
let time = Date.now()

/**
 * Animate
 */
const animate = () => 
{
    const elapsedTime = clock.getElapsedTime()
    //basketball.rotation.y = 0.1 * elapsedTime
    // const currentTime = Date.now()
    // const deltaTime = currentTime - time
    // time = currentTime
    // console.log(deltaTime)

    //   cube.rotation.y += 0.01 * deltaTime 
      controls.update()
      renderer.render(scene, camera)
      window.requestAnimationFrame(animate)    
}

animate()




