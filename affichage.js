

// Variables globales

let eltFooter = {
    footer: document.getElementById("reservation"),
    infoFooter: document.createElement("p"),
    timerDiv: document.createElement("p")
};
eltFooter.footer.appendChild(eltFooter.infoFooter);
eltFooter.footer.appendChild(eltFooter.timerDiv);
var timer;
// Affichage du timer avec setInterval
function decompte() {
    var sec = 59;
    var min = 19;
    timer = setInterval(function() {
        eltFooter.timerDiv.innerHTML = `Decompte : ${min} minute(s) : ${sec} seconde(s)`;
        if (sec == 0){
            min--;
            sec = 60;
        }else {
            sec--;
        }
        if(min === 0) {
            setTimeout(function() {
                eltFooter.timerDiv.innerHTML = "C'est terminé";
                clearInterval(timer);
            }, 1000);
        }
    }, 1000);
}

/* ------------------------------------------ */
/* -- Affichage si la reservation a marché -- */
/* ------------------------------------------ */


// Variables globales

let formulaire = {
    prenom: document.getElementById("prenom"),
    nom: document.getElementById("nom"),
    send: document.getElementById("reserver"),
    infoReservation: document.createElement("p")
};
document.getElementById("formulaire").appendChild(formulaire.infoReservation);




/* --------------------------------- */
/* -- Affichage Information Velo -- */
/* --------------------------------- */

// Variables globales

let infoVelo = {
    div: document.getElementById("info_velo"),
    address: document.createElement("p"),
    velo: document.createElement("p"),
    dispo: document.createElement("p")
};
infoVelo.div.appendChild(infoVelo.address);
infoVelo.div.appendChild(infoVelo.velo);
infoVelo.div.appendChild(infoVelo.dispo);

let isSelected = false;

function display_info_velo(stationInfo) {
    // On vérifie que la station soit ouverte
    if (stationInfo.open != "CLOSED") { // Teste maj et min
        // Si l'adresse est invalide on affiche son nom
        if (stationInfo.address == "") {
            infoVelo.address.innerHTML = `addresse : ${stationInfo.name}`;
            sessionStorage.setItem("nomStation", stationInfo.name);
        }else {
            infoVelo.address.innerHTML = `addresse : ${stationInfo.address}`;
            sessionStorage.setItem("nomStation", stationInfo.address);

        };
        // Affichage nb de vélos dispo et en station
        infoVelo.velo.innerHTML = ` ${stationInfo.numberBike} places`;
        infoVelo.dispo.innerHTML = `${stationInfo.dispoBike} vélos disponibles`;
        isSelected = true;
        // Affichage station fermé
    }else {
        infoVelo.address.innerHTML = "En travaux";
        infoVelo.velo.innerHTML = "";
        infoVelo.dispo.innerHTML = "";
        isSelected = false;
    }

}



function evenement_reservation(stationInfo) {
    formulaire.send.addEventListener("click", function(){

        if (prenom.value != "" && nom.value != "" && isSelected == true){
            localStorage.setItem("prénom", formulaire.prenom.value);
            localStorage.setItem("Nom", formulaire.nom.value);

            // On recupere les informations de l'api storage
            const nomStationSessionStorage = sessionStorage.getItem("nomStation");
            const prenomLocalStorage = localStorage.getItem("prénom");
            const nomLocalStorage = localStorage.getItem("Nom");

            // On affiche les informations de reservation
            formulaire.infoReservation.innerHTML = "Votre réservation à été faite";
            eltFooter.infoFooter.innerHTML = `Vélo réservé à la station ${nomStationSessionStorage} par ${prenomLocalStorage} ${nomLocalStorage}`;

            // On lance le décompte
            clearInterval(timer);
            decompte();
        }
        else if(isSelected == false) {
            formulaire.infoReservation.innerHTML = "Veuillez séléctionnez un vélo valide";
        }
        else if(prenom.value == "" && nom.value == "" && isSelected == true) {
            formulaire.infoReservation.innerHTML = "Veuillez remplir le formulaire";
        }
    });
}




function display_all(stationInfo) {
    display_info_velo(stationInfo);
    evenement_reservation(stationInfo);
    stationInfo.removeBike();
    display_info_velo(stationInfo);
}