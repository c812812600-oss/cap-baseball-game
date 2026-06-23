import * as THREE from "https://unpkg.com/three@0.170.0/build/three.module.js";

export class Ball{

constructor(scene){

this.mesh=new THREE.Mesh(

new THREE.SphereGeometry(.35,20,20),

new THREE.MeshStandardMaterial({

color:0xffffff

})

);

scene.add(this.mesh);

this.mesh.position.set(0,1,-15);

this.velocity=new THREE.Vector3(0,0,.35);

}

update(){

this.mesh.position.add(this.velocity);

}

pitch(){

this.mesh.position.set(0,1,-15);

this.velocity.set(0,0,.35);

}

}
