import { Game } from "./game.js";

let game = null;

function startGame() {

    game = new Game();

    game.init();

    animate();

}

function animate() {

    requestAnimationFrame(animate);

    if (game) {

        game.update();

        game.render();

    }

}

window.addEventListener("load", () => {

    startGame();

    const loading = document.getElementById("loading");

    setTimeout(() => {

        loading.style.opacity = "0";

        setTimeout(() => {

            loading.style.display = "none";

        }, 500);

    }, 800);

});

window.addEventListener("resize", () => {

    if (game) {

        game.resize();

    }

});

window.addEventListener("keydown", (event) => {

    if (game) {

        game.keyDown(event.key.toLowerCase());

    }

});

window.addEventListener("keyup", (event) => {

    if (game) {

        game.keyUp(event.key.toLowerCase());

    }

});

const mobileButtons = {

    left: "a",

    right: "d",

    up: "w",

    down: "s"

};

Object.keys(mobileButtons).forEach(id => {

    const button = document.getElementById(id);

    if (!button) return;

    button.addEventListener("touchstart", e => {

        e.preventDefault();

        if (game) {

            game.keyDown(mobileButtons[id]);

        }

    });

    button.addEventListener("touchend", e => {

        e.preventDefault();

        if (game) {

            game.keyUp(mobileButtons[id]);

        }

    });

});

const swing = document.getElementById("swing");

if (swing) {

    swing.addEventListener("click", () => {

        if (game) {

            game.swing();

        }

    });

}
