
class Diapo {
    constructor(slideshow, legende, legende2, imageFigcaption) {
        this.slideshow = slideshow,
        this.legende = legende,
        this.legende2 = legende2,
        this.imageFigcaption = imageFigcaption
	}
}
let Diaporama = new Diapo(document.getElementById("diaporama"), document.getElementById("legende"), document.getElementById("legendeTitle"), document.getElementById("imageFigcaption"));
document.getElementById("alertDiapo").style.display = "none";

// Source images diapo et légende  du diaporama
const images = ["./images/vélo_1.jpg", "./images/vélo_2.jpg","./images/vélo_3.jpg","./images/vélo_4.jpg"]
const imagesFigcaption = ["./images/rentBicycle.jpg", "./images/velove.jpg","./images/fast_bike.jpg", "./images/velo_rapide.png"];


// Titre du diaporama
const legendeTitle = [];
legendeTitle[0] = "bienvenue !";
legendeTitle[1] = "Reservation facile";
legendeTitle[2] = "Reservation rapide et simple";
legendeTitle[3] = "Reservation sans encombrement";

// Légende du diaporama
const legendeText = [];
legendeText[0] = "Sur notre site, vous retrouverez tous les vélos en libre service à Lyon.<br>Vous pourrez même en réserver!";
legendeText[1] = "Vous aimez le vélo ?<br>Notre application est faite pour que vous appréciez au maximum votre trajet en vélo.";
legendeText[2] = "Pendant 20 minutes vous pourrez profitez pleinement de votre vélo commandé.";
legendeText[3] = "Nous mettons tout à disposition dans nos stands !<br> Vous n'avez besoin de vous encombrer d'aucun matériel";


// Variables globales
let i = 0;
var lancer;
let stop = false;

// Affiche la diaporama i
function display(i) {
	Diaporama.slideshow.src = images[i];
	Diaporama.legende.innerHTML = legendeText[i];
	Diaporama.legende2.innerHTML = legendeTitle[i];
	Diaporama.imageFigcaption.src = imagesFigcaption[i];
}

// Lance le diaporama
function play(){
	lancer = setInterval(function() {
		if (i < images.length - 1) {
			i++;
		}
		else {
			i = 0;
		}
		display(i);

	}, 5000);
}

// Bouton pour arrêter ou remettre en route le diaporama
function bouton() {
	const  boutonDiapo = document.getElementById("stop");
	boutonDiapo.addEventListener("click", function(){
		if (boutonDiapo.classList.value == "far fa-pause-circle margeLittleTop"){
			clearInterval(lancer);
			play();
			boutonDiapo.className = "far fa-play-circle margeLittleTop";
			document.getElementById("alertDiapo").style.display = "none";
			stop = false;
		}
		else if (boutonDiapo.classList.value == "far fa-play-circle margeLittleTop"){
			clearInterval(lancer);
			boutonDiapo.className = "far fa-pause-circle margeLittleTop";
			document.getElementById("alertDiapo").style.display = "block";
			document.getElementById("alertDiapo").innerHTML = "Votre diaporama est en pause";
			stop = true;

		}

	});
}
// Fonction passage d'une autre diapo
function apres() {
	clearInterval(lancer);
	if (i == images.length - 1)
	{
		i = 0;
	}else {
		i++;
	}
	display(i);

	if (!(stop)){
		play();
	}
}
// Fonction passage d'une autre diapo

function avant() {
	clearInterval(lancer);
	if (i == 0) {
		i = images.length - 1;
	}else {
		i--;
	}
	display(i);

	if (stop == false){
		play();
	}
}
// Quand on clique sur la fleche avant

function onClickAvant() {
	const  boutonAvant = document.getElementById("avant");
	boutonAvant.addEventListener("click", function() {
		avant();
	})

}

// Quand on clique sur la fleche après

function onClickApres() {
	const  boutonApres = document.getElementById("apres");
	boutonApres.addEventListener("click", function(){
		apres();
	})

}

// On appelle les fonctions
play();
bouton();
onClickAvant();
onClickApres();

// Gerer les touches du clavier : fleche gauche et fleche droite
document.addEventListener("keydown", function(e){
	if (e.keyCode == 39) {
		apres();
	}
	if (e.keyCode == 37) {
		avant();
	}

});
