import * as THREE from "https://unpkg.com/three@0.170.0/build/three.module.js";

export class Ball {

    constructor(scene) {

        this.scene = scene;

        this.mesh = new THREE.Mesh(

            new THREE.SphereGeometry(0.25,32,32),

            new THREE.MeshStandardMaterial({

                color:0xffffff

            })

        );

        scene.add(this.mesh);

        this.reset();

    }

    reset(){

        this.mesh.position.set(

            0,

            1,

            -18

        );

        this.velocity = new THREE.Vector3(

            0,

            0,

            0.18

        );

        this.gravity = -0.002;

        this.hitFlag = false;

    }

    update(){

        this.mesh.position.add(this.velocity);

        if(this.hitFlag){

            this.velocity.y += this.gravity;

        }

        if(this.mesh.position.y<0.25){

            this.mesh.position.y=0.25;

            if(this.hitFlag){

                this.velocity.y*=-0.35;

                this.velocity.x*=0.95;

                this.velocity.z*=0.95;

            }

        }

    }

    hit(playerPos){

        let d = this.mesh.position.distanceTo(playerPos);

        if(d>3){

            return;

        }

        this.hitFlag=true;

        this.velocity.set(

            (Math.random()-0.5)*0.18,

            0.22+Math.random()*0.08,

            -0.8-Math.random()*0.5

        );

    }

}
