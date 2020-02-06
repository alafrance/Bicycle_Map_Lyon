

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

function display_info_velo() {

    document.getElementById("panelInfo").style.display = "block";

    // On vérifie que la station soit ouverte
    if (sessionStorage.getItem("stationVeloStatus") != "CLOSED") { // Teste maj et min
         // Affichage addresse
        infoVelo.address.innerHTML = `${sessionStorage.getItem("stationAddress")}`
        // Affichage nb de vélos dispo et en station
        infoVelo.velo.innerHTML = ` ${sessionStorage.getItem("stationVelo")} places`;
        infoVelo.dispo.innerHTML = `${sessionStorage.getItem("stationVeloDispo")} vélos disponibles`;
        isSelected = true;
        // Affichage station fermé

    }else {
        infoVelo.address.innerHTML = "En travaux";
        infoVelo.velo.innerHTML = "";
        infoVelo.dispo.innerHTML = "";
        isSelected = false;
    }

}

let nombreDeVelo = 0;

function evenement_reservation() {
    formulaire.send.addEventListener("click", function(){

        if (prenom.value != "" && nom.value != "" && isSelected == true){
            localStorage.setItem("prénom", formulaire.prenom.value);
            localStorage.setItem("Nom", formulaire.nom.value);

            // On affiche les informations de reservation
            formulaire.infoReservation.innerHTML = "Votre réservation à été faite";
            eltFooter.infoFooter.innerHTML = `Vélo réservé à la station ${sessionStorage.getItem("stationAddress")} par ${localStorage.getItem("prénom")} ${localStorage.getItem("Nom")}`;

            // On lance le décompte
            clearInterval(timer);
            decompte();
            let nombreDeVelo = sessionStorage.getItem("stationVeloDispo");
            nombreDeVelo--;
            sessionStorage.setItem("stationVeloDispo", nombreDeVelo);
            display_info_velo();
        }
        else if(isSelected == false) {
            formulaire.infoReservation.innerHTML = "Veuillez séléctionnez un vélo valide";
        }
        else if(prenom.value == "" && nom.value == "" && isSelected == true) {
            formulaire.infoReservation.innerHTML = "Veuillez remplir le formulaire";
        }
    });
}
evenement_reservation();
