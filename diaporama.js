
const slideshow = document.getElementById("diaporama");
const legende = document.getElementById("legende");
let images = ["./images/vélo_1.jpg", "./images/vélo_2.jpg", "./images/vélo_3.jpg", "./images/vélo_4.jpg"];
let legendeText = [4];
legendeText[0] = "Bienvenue!<br>Vous trouverez sur ce site tous les vélos en libre service de Lyon<br>Vous pourrez même en reserver sur notre site!"
legendeText[1] = "Vous aimez le vélo ? Vous pourrez en faire très facilement grâce à notre site de réservation de vélo";
legendeText[2] = "Vous avez 20 minutes pour utiliser nos vélos mis à disposition dans tout Lyon";
legendeText[3] = "Et dernièrement, vous n'aurez même pas besoin de vous encombrer de matériels de vélo ! Tout se trouve dans nos stands en libre service";
let i = 0;
var lancer;
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
	}, 5000);
}

function demarrer() {
	const  boutonLancer = document.getElementById("lancer");
	boutonLancer.addEventListener("click", function(){
		clearInterval(lancer);
		play();
	});
}

function stop() {
	const  boutonStop = document.getElementById("stop");
	boutonStop.addEventListener("click", function(){
		clearInterval(lancer);
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
	play();
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
	play();
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
stop();
demarrer();
onClickAvant();
onClickApres();

document.addEventListener("keydown", function(e){
	if (e.keyCode == 39) {
		apres();
	}
	if (e.keyCode == 37) {
		avant();
	}
	
})