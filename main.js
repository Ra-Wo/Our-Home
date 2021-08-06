import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js';
import {
   OrbitControls
} from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/controls/OrbitControls.js";

const scene = new THREE.Scene();
const Texture = new THREE.TextureLoader();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

camera.position.z = 6;


//A light that gets emitted from a single point in all directions
const plight = new THREE.PointLight(0x959595);
plight.position.set(10, 15, 15);

//This light globally illuminates all objects in the scene equally.
const light = new THREE.AmbientLight(0xffffff);
scene.add(light, plight);


/*
//This displays a helper object consisting of a spherical Mesh for visualizing a PointLight.
const LightHelper = new THREE.PointLightHelper(plight);
scene.add(LightHelper)
*/

/*
//The GridHelper is an object to define grids. Grids are two-dimensional arrays of lines.
const size = 20;
const divisions = 60;
const gridHelper = new THREE.GridHelper( size, divisions );
scene.add( gridHelper );
*/

//Orbit controls allow the camera to orbit around a target.
const controls = new OrbitControls(camera, renderer.domElement);


// Earth object
const Earth_geometry = new THREE.SphereGeometry(1, 100, 16);
const Earth_texture = Texture.load('Earth.jpg');
const Earth_material = new THREE.MeshStandardMaterial({
   map: Earth_texture
});
const Earth = new THREE.Mesh(Earth_geometry, Earth_material);


// Moon object
const Moon_geometry = new THREE.SphereGeometry(0.4, 100, 16);
const Moon_texture = Texture.load('Moon.jpg');
const Moon_material = new THREE.MeshStandardMaterial( {
      map: Moon_texture
});
const Moon = new THREE.Mesh(Moon_geometry, Moon_material);
Moon.position.x = 5

//add the objects to the scene
scene.add(Earth, Moon)


var t = 0;
(function animate() {
   requestAnimationFrame(animate);
   renderer.render(scene, camera);
   Earth.rotation.y += 0.002;
   Moon.rotation.y += 0.004;
   t += 0.005;
   Moon.position.x = 5*Math.cos(t) + 0;
   Moon.position.z = 5*Math.sin(t) + 0;
   controls.update();
})();
