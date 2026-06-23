import * as THREE from "https://unpkg.com/three@0.170.0/build/three.module.js";

export class Player{

constructor(scene){

this.group = new THREE.Group();

const skin = new THREE.MeshStandardMaterial({color:0xffd3b5});
const cap = new THREE.MeshStandardMaterial({color:0x0066ff});
const body = new THREE.MeshStandardMaterial({color:0xffffff});

const head = new THREE.Mesh(
new THREE.SphereGeometry(1.2,24,24),
skin
);

head.position.y=3.2;

const capTop = new THREE.Mesh(
new THREE.SphereGeometry(1.28,24,24,0,Math.PI*2,0,Math.PI/2),
cap
);

capTop.position.y=3.4;

const torso = new THREE.Mesh(
new THREE.CylinderGeometry(.9,.9,2.2,20),
body
);

torso.position.y=1.5;

const leftLeg = new THREE.Mesh(
new THREE.CylinderGeometry(.25,.25,1.6,10),
body
);

leftLeg.position.set(-.3,.4,0);

const rightLeg = leftLeg.clone();
rightLeg.position.x=.3;

this.group.add(head);
this.group.add(capTop);
this.group.add(torso);
this.group.add(leftLeg);
this.group.add(rightLeg);

scene.add(this.group);

this.speed=.25;

this.keys={};

window.addEventListener("keydown",e=>{
this.keys[e.key.toLowerCase()]=true;
});

window.addEventListener("keyup",e=>{
this.keys[e.key.toLowerCase()]=false;
});

}

update(){

if(this.keys["w"]) this.group.position.z-=this.speed;
if(this.keys["s"]) this.group.position.z+=this.speed;
if(this.keys["a"]) this.group.position.x-=this.speed;
if(this.keys["d"]) this.group.position.x+=this.speed;

}

}
