
// Config a cena
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderizador
const renderer = new THREE.WebGLRenderer(); // Corrigido aqui
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Instanciando o loader
const loader = new THREE.GLTFLoader(); // Certifique-se de que o GLTFLoader está importado corretamente

// Classe boneca
class boneca{
	constructor(){
		loader.load("../model/scene.gltf", (gltf)=>{
		scene.add(gltf.scene);
		gltf.scene.scale.set(0.4, 0.4, 0.4);
		gltf.scene.position.set(0, -1, -1);
		this.Boneca1 = gltf.scene;
})
    }
    praTras(){
        gsap.to(this.Boneca1.rotation, {y:-3.15, duration: 1});
    }
}

let Boneca1 = new boneca();

// Adicionando luz
const light = new THREE.AmbientLight(0xffffff); // Luz ambiente
scene.add(light);

//Cor de fundo
renderer.setClearColor(0x8601af,1) 

// Posicionando a camera
camera.position.z = 5;

// Função de animação
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();

// Capturando a alteração da resolução da tela
window.addEventListener('resize', onwindowResize, false);

// Função para deixar responsivo
function onWindowResize(){
    camera.aspect = window.innerWidth/ window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}