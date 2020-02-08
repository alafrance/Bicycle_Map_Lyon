

// Variables globales

let eltFooter = {
    footer: document.getElementById("reservation"),
    infoFooter: document.createElement("p"),
    timerDiv: document.createElement("p")
};
eltFooter.footer.appendChild(eltFooter.infoFooter);
eltFooter.footer.appendChild(eltFooter.timerDiv);
var timer;

let nombreDeVelo = 0;
let reservationEnCours;
// Affichage du timer avec setInterval
function decompte() {
    var sec = 0;
    var min = 20;
    timer = setInterval(function() {
        eltFooter.timerDiv.innerHTML = `Decompte : ${min} minute(s) : ${sec} seconde(s)`;
        if (sec == 0){
            min--;
            sec = 59;
        }else {
            sec--;
        }
        if(min === 0 && sec == 0) {
            setTimeout(function() {
                isReserved = false;
                eltFooter.timerDiv.innerHTML = "Votre réservation est terminé";
                nombreDeVelo = sessionStorage.getItem("stationVeloDispo");
                nombreDeVelo++;
                sessionStorage.setItem("stationVeloDispo", nombreDeVelo);
                display_info_velo();
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

let isAvailable = false;
let isReserved = false;

let reservationEnCoursAddress = "";
let reservationEnCoursVelo = "";
let reservationEnCoursDispo = "";

function display_info_velo(stationAddress, stationVelo, stationVeloDispo) {

    document.getElementById("panelInfo").style.display = "block";

    // On vérifie que la station soit ouverte
    if (sessionStorage.getItem("stationVeloStatus") != "CLOSED") { // Teste maj et min
         // Affichage addresse
        infoVelo.address.innerHTML = `${stationAddress}`
        // Affichage nb de vélos dispo et en station
        infoVelo.velo.innerHTML = ` ${stationVelo} places`;
        infoVelo.dispo.innerHTML = `${stationVeloDispo} vélos disponibles`;
        isAvailable = true;
        // Affichage station fermé

    }else {
        infoVelo.address.innerHTML = "En travaux";
        infoVelo.velo.innerHTML = "";
        infoVelo.dispo.innerHTML = "";
        isAvailable = false;
    }

}


function evenement_reservation() {
    formulaire.send.addEventListener("click", function(){

        // Si il n'y a plus de vélo
        if (sessionStorage.getItem("stationVeloDispo")  == 0) {
            formulaire.infoReservation.innerHTML = "Il n'y a plus de vélos disponibles";
        }
        // Si il y a une réservation en cours et que le marqueur séléctionné est la reservation
        else if (isReserved && reservationEnCoursAddress == sessionStorage.getItem("stationAddress")) {
            formulaire.infoReservation.innerHTML = "Vous avez déja réservé un vélo ici";  
        }
        // Si il y a des travaux
        else if(isAvailable == false) {
            formulaire.infoReservation.innerHTML = "Veuillez séléctionnez un vélo valide";
        }
        // Si le formulaire n'est pas rempli
        else if(prenom.value == "" && nom.value == "") {
            formulaire.infoReservation.innerHTML = "Veuillez remplir le formulaire";
        }
        // Si tout est bon pour la réservation
        else{
            localStorage.setItem("prénom", formulaire.prenom.value);
            localStorage.setItem("Nom", formulaire.nom.value);

            // On affiche les informations de reservation
            formulaire.infoReservation.innerHTML = "Votre réservation à été faite";
            eltFooter.infoFooter.innerHTML = `Vélo réservé à la station ${sessionStorage.getItem("stationAddress")} par ${localStorage.getItem("prénom")} ${localStorage.getItem("Nom")}`;

            // On lance le décompte
            panel_info();

            // On indique que la reservation est en cours
            isReserved = true;
            reservationEnCoursAddress = sessionStorage.getItem("stationAddress");
            reservationEnCoursVelo = sessionStorage.getItem("stationVelo");
            reservationEnCoursDispo = sessionStorage.getItem("stationVeloDispo");
            
        }
        
    });
}

function panel_info() {
    // On arrete le timer s'il a déja été en route
    clearInterval(timer);

    // On recupere le nombre de velo et on on enleve un velo
    nombreDeVelo = sessionStorage.getItem("stationVeloDispo");
    nombreDeVelo--;
    sessionStorage.setItem("stationVeloDispo", nombreDeVelo);
    // On actualise les infos des vélos
    display_info_velo(sessionStorage.getItem("stationAddress"), sessionStorage.getItem("stationVelo"), sessionStorage.getItem("stationVeloDispo"));

    // On lance le decompte
    decompte();

    
}
evenement_reservation();
