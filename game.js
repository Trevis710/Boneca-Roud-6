// Config a cena
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderizador
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Instanciando o loader
const loader = new THREE.GLTFLoader();

// Carregando a Árvore
loader.load("../tree/scene.gltf", function(gltf) {
    scene.add(gltf.scene);
    gltf.scene.scale.set(16, 16, 16);
    gltf.scene.position.set(0, -6, -12);
});

// Classe player
class Player {
    constructor() {
        const geometry = new THREE.BoxGeometry(0.3, 0.3, 0.3);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const player = new THREE.Mesh(geometry, material)
        scene.add(player)
        this.player = player;

        player.position.x = 3;
        player.position.y = 0;
        player.position.z = 0;

        this.playerInfo = {
            positionX: 6,
            velocity: 0
        }
    }
    anda() {
        this.playerInfo.velocity = 0.1;
    }
    update() {
        this.checa();
        // Limite de movimento entre -6 e 6
        this.playerInfo.positionX -= this.playerInfo.velocity;
        if (this.playerInfo.positionX < -6) this.playerInfo.positionX = -6;
        if (this.playerInfo.positionX > 6) this.playerInfo.positionX = 6;
        this.player.position.x = this.playerInfo.positionX;
    }
    para() {
        this.playerInfo.velocity = 0;
    }
    checa() {
        if (gamestatus === "fim") return; // Impede múltiplas execuções

        if (this.playerInfo.velocity > 0 && !tadecostas) {
            text.innerText = "Você perdeu!";
            this.player.material.color.set(0xff0000); // Vermelho ao perder
            gamestatus = "fim";
            mostrarRestart();
            return; // Impede que o código abaixo execute após perder
        }
        if (this.playerInfo.positionX <= -6) {
            text.innerText = "Você venceu!";
            mensagem.innerText = "Parabéns! Você ganhou!";
            mensagem.style.color = "lime";
            this.player.material.color.set(0x00ff00); // Verde ao vencer
            gamestatus = "fim";
            mostrarRestart();
            return; // Impede que o código acima execute após vencer
        }
    }
}

const mensagem = document.querySelector('.mensagem');

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Classe boneca
class boneca {
    constructor() {
        loader.load("../model/scene.gltf", (gltf) => {
            scene.add(gltf.scene);
            gltf.scene.scale.set(0.4, 0.4, 0.4);
            gltf.scene.position.set(0, -1, -1);
            this.Boneca1 = gltf.scene;
            this.start();
        })
    }

    // Função para girar a boneca
    praTras() {
        gsap.to(this.Boneca1.rotation, { y: -3.15, duration: 1 });
        setTimeout(() => tadecostas = true, 450);
    }
    praFrente() {
        gsap.to(this.Boneca1.rotation, { y: 0, duration: 1 });
        setTimeout(() => tadecostas = false, 150);
    }

    async start() {
        this.praTras();
        await delay((Math.random() * 1000) + 1000);

        this.praFrente();
        await delay((Math.random() * 1000) + 1000);
        this.start();
    }
}
// Declarando o player
let Player1 = new Player();
// Declarando a boneca
let Boneca1 = new boneca();

const text = document.querySelector(".text")
const tmaximo = 10;
let gamestatus = "esperando"
let tadecostas = true;

async function init() {
    await delay(500);
    text.innerText = "Começando em 3";
    await delay(500);
    text.innerText = "Começando em 2";
    await delay(500);
    text.innerText = "Começando em 1";
    await delay(500);
    text.innerText = "VAI!";
    startGame()
}

function startGame() {
    gamestatus = "jogando"
    Boneca1.start();
}

init()


setTimeout(() => {
    Boneca1.praTras()
}, 1000);

// Adicionando luz
const light = new THREE.AmbientLight(0xffffff); // Luz ambiente
scene.add(light);

//Cor de fundo
renderer.setClearColor(0x8601af, 1)

// Posicionando a camera
camera.position.z = 5;

// Função de animação
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    if (gamestatus === "jogando") {
        Player1.update();
    }
}

animate();

// Capturando a alteração da resolução da tela
window.addEventListener('resize', onWindowResize, false);

// Função para deixar responsivo
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Pressionar a tecla
window.addEventListener('keydown', function(e) {
    if (gamestatus !== "jogando") return;
    if (e.code === "ArrowLeft") {
        console.log("Anda para a esquerda");
        Player1.playerInfo.velocity = 0.1; // Move para a esquerda
    }
    if (e.code === "ArrowRight") {
        console.log("Anda para a direita");
        Player1.playerInfo.velocity = -0.1; // Move para a direita
    }
});

// Soltar a tecla
window.addEventListener('keyup', function(e) {
    if (e.code === "ArrowLeft" || e.code === "ArrowRight") {
        console.log("Para chamado");
        Player1.para(); // Para o movimento
    }
});

const restartBtn = document.getElementById('restartButton');

function mostrarRestart() {
    restartBtn.style.display = 'block';
}

// Evento para reiniciar o jogo
restartBtn.addEventListener('click', () => {
    window.location.reload();
});

