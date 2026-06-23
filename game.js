import * as THREE from "https://unpkg.com/three@0.170.0/build/three.module.js";
import { Player } from "./player.js";
import { Ball } from "./ball.js";

export class Game {

    constructor() {

        this.scene = null;
        this.camera = null;
        this.renderer = null;

        this.player = null;
        this.ball = null;

        this.keys = {};

        this.homeScore = 0;
        this.awayScore = 0;
        this.outs = 0;
        this.inning = 1;

    }

    init() {

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x7ecbff);

        this.camera = new THREE.PerspectiveCamera(
            70,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.camera.position.set(0, 12, 18);

        this.renderer = new THREE.WebGLRenderer({

            canvas: document.getElementById("game"),
            antialias: true

        });

        this.renderer.setPixelRatio(window.devicePixelRatio);

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

        this.createLights();

        this.createField();

        this.player = new Player(this.scene);

        this.ball = new Ball(this.scene);

    }

    createLights() {

        const sun = new THREE.DirectionalLight(

            0xffffff,

            2

        );

        sun.position.set(

            30,

            50,

            20

        );

        this.scene.add(sun);

        const ambient = new THREE.AmbientLight(

            0xffffff,

            1

        );

        this.scene.add(ambient);

    }

    createField() {

        const grass = new THREE.Mesh(

            new THREE.CircleGeometry(

                80,

                64

            ),

            new THREE.MeshLambertMaterial({

                color: 0x37b24d

            })

        );

        grass.rotation.x = -Math.PI / 2;

        this.scene.add(grass);

        const dirt = new THREE.Mesh(

            new THREE.CircleGeometry(

                12,

                64

            ),

            new THREE.MeshLambertMaterial({

                color: 0xc49b63

            })

        );

        dirt.rotation.x = -Math.PI / 2;

        dirt.position.y = 0.02;

        this.scene.add(dirt);

        const lineMaterial = new THREE.MeshBasicMaterial({

            color: 0xffffff

        });

        const first = new THREE.Mesh(

            new THREE.BoxGeometry(1,0.2,1),

            lineMaterial

        );

        first.position.set(

            8,

            0.1,

            0

        );

        this.scene.add(first);

        const second = first.clone();

        second.position.set(

            0,

            0.1,

            -8

        );

        this.scene.add(second);

        const third = first.clone();

        third.position.set(

            -8,

            0.1,

            0

        );

        this.scene.add(third);

        const home = first.clone();

        home.position.set(

            0,

            0.1,

            8

        );

        this.scene.add(home);

    }

    keyDown(key){

        this.keys[key]=true;

    }

    keyUp(key){

        this.keys[key]=false;

    }

    swing(){

        if(!this.ball)return;

        this.ball.hit(this.player.mesh.position);

    }
      update() {

        // プレイヤー移動
        if (this.keys["w"]) {

            this.player.mesh.position.z -= 0.2;

        }

        if (this.keys["s"]) {

            this.player.mesh.position.z += 0.2;

        }

        this.player.update(0.2);
          
          if (this.keys["a"]) {

            this.player.mesh.position.x -= 0.2;

        }

        if (this.keys["d"]) {

            this.player.mesh.position.x += 0.2;

        }

        // ボール更新
        this.ball.update();

        // カメラ追従
        this.camera.position.x +=
            (this.player.mesh.position.x - this.camera.position.x) * 0.08;

        this.camera.position.z +=
            (this.player.mesh.position.z + 18 - this.camera.position.z) * 0.08;

        this.camera.lookAt(

            this.player.mesh.position.x,

            2,

            this.player.mesh.position.z

        );

        // ホームラン判定
        if (this.ball.mesh.position.z < -70) {

            this.homeScore++;

            document.getElementById("homeScore").textContent =
                this.homeScore;

            document.getElementById("message").textContent =
                "HOME RUN!!";

            setTimeout(() => {

                document.getElementById("message").textContent = "";

            }, 2000);

            this.ball.reset();

        }

        // ボールが後ろへ行ったら投げ直し
        if (this.ball.mesh.position.z > 20) {

            this.ball.reset();

        }

    }

    render() {

        this.renderer.render(

            this.scene,

            this.camera

        );

    }

    resize() {

        this.camera.aspect =
            window.innerWidth / window.innerHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(

            window.innerWidth,

            window.innerHeight

        );

    }

}
