import * as THREE from "https://unpkg.com/three@0.170.0/build/three.module.js";

export class Player {

    constructor(scene) {

        this.mesh = new THREE.Group();

        // マテリアル
        const skin = new THREE.MeshStandardMaterial({
            color:0xffd5b5
        });

        const cap = new THREE.MeshStandardMaterial({
            color:0x1565ff
        });

        const uniform = new THREE.MeshStandardMaterial({
            color:0xffffff
        });

        const shoes = new THREE.MeshStandardMaterial({
            color:0x222222
        });

        // 頭
        const head = new THREE.Mesh(

            new THREE.SphereGeometry(1.2,32,32),

            skin

        );

        head.position.y = 4;

        this.mesh.add(head);

        // キャップ

        const capTop = new THREE.Mesh(

            new THREE.SphereGeometry(
                1.28,
                32,
                32,
                0,
                Math.PI*2,
                0,
                Math.PI/2
            ),

            cap

        );

        capTop.position.y = 4.2;

        this.mesh.add(capTop);

        // つば

        const brim = new THREE.Mesh(

            new THREE.BoxGeometry(
                1.4,
                0.15,
                0.8
            ),

            cap

        );

        brim.position.set(0,3.9,1);

        this.mesh.add(brim);

        // 胴体

        const body = new THREE.Mesh(

            new THREE.CylinderGeometry(
                1,
                1,
                2.4,
                24
            ),

            uniform

        );

        body.position.y = 2.2;

        this.mesh.add(body);

        // 左腕

        this.leftArm = new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.2,
                0.2,
                1.6,
                16
            ),

            uniform

        );

        this.leftArm.position.set(-1.1,2.5,0);

        this.leftArm.rotation.z = 0.4;

        this.mesh.add(this.leftArm);

        // 右腕

        this.rightArm = this.leftArm.clone();

        this.rightArm.position.x = 1.1;

        this.rightArm.rotation.z = -0.4;

        this.mesh.add(this.rightArm);

        // 左足

        this.leftLeg = new THREE.Mesh(

            new THREE.CylinderGeometry(
                0.25,
                0.25,
                2,
                16
            ),

            uniform

        );

        this.leftLeg.position.set(-0.4,0.6,0);

        this.mesh.add(this.leftLeg);

        // 右足

        this.rightLeg = this.leftLeg.clone();

        this.rightLeg.position.x = 0.4;

        this.mesh.add(this.rightLeg);

        // 靴

        const shoe1 = new THREE.Mesh(

            new THREEBoxGeometry(0.45,0.2,0.8),

            shoes

        );

        shoe1.position.set(-0.4,-0.45,0.2);

        this.mesh.add(shoe1);

        const shoe2 = shoe1.clone();

        shoe2.position.x = 0.4;

        this.mesh.add(shoe2);

        this.mesh.position.set(0,0,10);

        scene.add(this.mesh);

        this.walk = 0;

    }

    update(speed){

        this.walk += speed*8;

        this.leftLeg.rotation.x = Math.sin(this.walk)*0.5;

        this.rightLeg.rotation.x = -Math.sin(this.walk)*0.5;

        this.leftArm.rotation.x = -Math.sin(this.walk)*0.4;

        this.rightArm.rotation.x = Math.sin(this.walk)*0.4;

    }

    swing(){

        this.rightArm.rotation.z = -1.5;

        setTimeout(()=>{

            this.rightArm.rotation.z = -0.4;

        },180);

    }

}
