import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js'
import { GLTFLoader } from 'https://unpkg.com/three@0.160.0/examples/jsm/loaders/GLTFLoader.js'

document.addEventListener('DOMContentLoaded', () => {
  initThree()
})

function initThree() {
  const modelContainer = document.querySelector('.ringsBlender')

  const scene = new THREE.Scene()
  scene.background = null
  scene.position.set(0, -10, 0)

  const camera = new THREE.PerspectiveCamera(
    10,
    window.innerWidth / window.innerHeight,
    2,
    3000
  )
  camera.position.set(0, 0, 400)

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  const rect = modelContainer.getBoundingClientRect()
  renderer.setSize(rect.width, rect.height)
  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  modelContainer.appendChild(renderer.domElement)

  function updateRendererSize() {
    const containerRect = modelContainer.getBoundingClientRect()
    renderer.setSize(containerRect.width, containerRect.height)
    camera.aspect = containerRect.width / containerRect.height
    camera.updateProjectionMatrix()
  }
  updateRendererSize()

  window.addEventListener('resize', updateRendererSize)

  {
    const loader = new GLTFLoader()
    loader.load(
      './rings.glb',
      (gltf) => {
        scene.add(gltf.scene)
        console.log('ok')
      },
      (error) => {
        console.log('Error:' + error)
      }
    )
  }

  const light = new THREE.AmbientLight(0xeeeeee)
  scene.add(light)

  const dirLight = new THREE.DirectionalLight(0xffffff, 1)
  dirLight.position.set(0, 0, 0)
  scene.add(dirLight)

  const baseRotation = -Math.PI / 2

  function animate() {
    requestAnimationFrame(animate)

    renderer.render(scene, camera)
  }
  animate()

  window.addEventListener('scroll', () => {
    scene.rotation.y += 0.03
  })
}
