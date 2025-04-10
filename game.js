
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

// Carregando a Árvore
loader.load("../tree/scene.gltf", function(gltf){
    scene.add(gltf.scene);
    gltf.scene.scale.set(16, 16, 16);
    gltf.scene.position.set(0, -6, -12);
});
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

    // Função para girar a boneca
    praTras(){
        gsap.to(this.Boneca1.rotation, {y:-3.15, duration: 1});
    }
    praFrente(){
        gsap.to(this.Boneca1.rotation, {y:0, duration: 1});
    }

}
// Declarando a boneca
let Boneca1 = new boneca();
setTimeout(() => {
    Boneca1.praTras}, 1000);

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