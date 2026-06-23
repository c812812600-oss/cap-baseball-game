import * as THREE from "https://unpkg.com/three@0.170.0/build/three.module.js";

export class Game{

constructor(){

this.scene=new THREE.Scene();

this.scene.background=new THREE.Color(0x87ceeb);

this.camera=new THREE.PerspectiveCamera(

70,

window.innerWidth/window.innerHeight,

0.1,

1000

);

this.camera.position.set(0,20,30);

this.renderer=new THREE.WebGLRenderer({

canvas:document.getElementById("game"),

antialias:true

});

this.renderer.setSize(

window.innerWidth,

window.innerHeight

);

window.addEventListener("resize",()=>{

this.camera.aspect=

window.innerWidth/window.innerHeight;

this.camera.updateProjectionMatrix();

this.renderer.setSize(

window.innerWidth,

window.innerHeight

);

});

}

start(){

this.createLights();

this.createField();

document.getElementById("loading").style.display="none";

this.animate();

}

createLights(){

const light=new THREE.DirectionalLight(0xffffff,2);

light.position.set(30,60,30);

this.scene.add(light);

const amb=new THREE.AmbientLight(0xffffff,.7);

this.scene.add(amb);

}

createField(){

const grass=new THREE.Mesh(

new THREE.PlaneGeometry(300,300),

new THREE.MeshLambertMaterial({

color:0x32cd32

})

);

grass.rotation.x=-Math.PI/2;

this.scene.add(grass);

const mound=new THREE.Mesh(

new THREE.CylinderGeometry(3,3,.8,32),

new THREE.MeshLambertMaterial({

color:0xd2b48c

})

);

mound.position.y=.4;

this.scene.add(mound);

const baseMaterial=new THREE.MeshLambertMaterial({

color:0xffffff

});

const positions=[

[0,.1,12],

[12,.1,0],

[0,.1,-12],

[-12,.1,0]

];

positions.forEach(p=>{

const b=new THREE.Mesh(

new THREE.BoxGeometry(2,.3,2),

baseMaterial

);

b.position.set(...p);

this.scene.add(b);

});

}

animate(){

requestAnimationFrame(()=>this.animate());

this.renderer.render(

this.scene,

this.camera

);

}

}
