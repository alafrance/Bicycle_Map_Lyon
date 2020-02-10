
const slideshow = document.getElementById("diaporama");
const legende = document.getElementById("legende");
const legendeh2 = document.getElementById("legendeTitle");
const imageFigcaption = document.getElementById("imageFigcaption")
document.getElementById("alertDiapo").style.display = "none";

const images = ["./images/vélo_1.jpg", "./images/vélo_2.jpg","./images/vélo_3.jpg","./images/vélo_4.jpg"]
const imagesFigcaption = ["./images/rentBicycle.jpg", "./images/velove.jpg","./images/fast_bike.jpg", "./images/velo_rapide.png"];

const legendeTitle = [];
legendeTitle[0] = "bienvenue !";
legendeTitle[1] = "Reservation facile";
legendeTitle[2] = "Reservation rapide et simple";
legendeTitle[3] = "Reservation sans encombrement";

const legendeText = [];
legendeText[0] = "Sur notre site, vous retrouverez tous les vélos en libre service à Lyon.<br>Vous pourrez même en réserver !";
legendeText[1] = "Vous aimez le vélo ?<br>Notre application est faite pour que vous appréciez au maximum votre trajet en vélo.";
legendeText[2] = "Pendant 20 minutes vous pourrez profitez pleinement de votre vélo commandé.";
legendeText[3] = "Nous mettons tout à disposition dans nos stands !<br> Vous n'avez besoin de vous encombrer d'aucun matériel";

let i = 0;
var lancer;
let stop = false;
function play(){
	lancer = setInterval(function() {
		if (i < images.length - 1) {
			i++;
		}
		else {
			i = 0;
		}
		slideshow.src = images[i];
		legende.innerHTML = legendeText[i];
		legendeh2.innerHTML = legendeTitle[i];
		imageFigcaption.src = imagesFigcaption[i];

	}, 5000);
}

function bouton() {
	const  boutonDiapo = document.getElementById("stop");
	boutonDiapo.addEventListener("click", function(){
		if (boutonDiapo.classList.value == "far fa-pause-circle"){
			clearInterval(lancer);
			play();
			boutonDiapo.className = "far fa-play-circle";
			document.getElementById("alertDiapo").style.display = "none";
			stop = false;
		}
		else if (boutonDiapo.classList.value == "far fa-play-circle"){
			clearInterval(lancer);
			boutonDiapo.className = "far fa-pause-circle";
			document.getElementById("alertDiapo").style.display = "block";
			document.getElementById("alertDiapo").innerHTML = "Votre diaporama est en pause";
			stop = true;
		}

	});
}

function apres() {
	clearInterval(lancer);
	if (i == images.length - 1)
	{
		i = 0;
	}else {
		i++;
	}
	slideshow.src = images[i];
	legende.innerHTML = legendeText[i];
	legendeh2.innerHTML = legendeTitle[i];
	imageFigcaption.src = imagesFigcaption[i];

	if (!(stop)){
		play();
	}
}

function avant() {
	clearInterval(lancer);
	if (i == 0) {
		i = images.length - 1;
	}else {
		i--;
	}
	slideshow.src = images[i];
	legende.innerHTML = legendeText[i];
	legendeh2.innerHTML = legendeTitle[i];
	imageFigcaption.src = imagesFigcaption[i];

	if (stop == false){
		play();
	}
}

function onClickAvant() {
	const  boutonAvant = document.getElementById("avant");
	boutonAvant.addEventListener("click", function() {
		avant();
	})

}

function onClickApres() {
	const  boutonApres = document.getElementById("apres");
	boutonApres.addEventListener("click", function(){
		apres();
	})

}
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
