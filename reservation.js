

// Variables globales

let eltFooter = {
        footer: document.getElementById("reservation"),
        infoFooter: document.createElement("p"),
        timerDiv: document.createElement("p")
};
eltFooter.footer.appendChild(eltFooter.infoFooter);
eltFooter.footer.appendChild(eltFooter.timerDiv);
var min;
var sec;

// Affichage du timer avec setInterval
 function decompte() {
        var timer = setInterval(function() {
            // Affichage decompte
            eltFooter.timerDiv.innerHTML = `Decompte : ${min} minute(s) : ${sec} seconde(s)`;
            if (sec == 0) {
                min--;
                sec = 60;
            }else {
                sec--;
            }

            // Fin du decompte
            if(min === -1) {
                setTimeout(function() {
                    eltFooter.timerDiv.innerHTML = "Votre réservation est terminé";
                    clearInterval(timer);
                }, 1000);
            }
        }, 1000);
}

function display_info_reservation(stationInfo) {

    // On recupere les informations de l'api storage
    const prenomLocalStorage = localStorage.getItem("prénom");
    const nomLocalStorage = localStorage.getItem("Nom");
    const nomStationSessionStorage = sessionStorage.getItem("nomStation");

    // On affiche les informations de reservation
    eltFooter.infoFooter.innerHTML = `Vélo réservé à la station ${nomStationSessionStorage} par ${prenomLocalStorage} ${nomLocalStorage}`;

    // On initialise ou reinitialise le décompte, et on le lance ou relance
    min = 20;
    sec = 0;
    decompte();

    // On enleve un vélo disponible
    stationInfo.dispoBike--; // ne pas decrementer deux fois !
    display_info_velo(stationInfo);

}

