/* ------------------------------------------ */
/* -- Affichage si la reservation a marché -- */
/* ------------------------------------------ */


// Variables globales

// Objet formulaire dom
let formulaire = {
    prenom: document.getElementById("prenom"),
    nom: document.getElementById("nom"),
    send: document.getElementById("demandeSignature"),
    reserve: document.getElementById("reserver"),
    infoReservation: document.createElement("div"),
    panel: document.getElementById("panel")
};
document.getElementById("formulaire").appendChild(formulaire.infoReservation);

// Objet Informations Reservation Dom
let eltFooter = {
    footer: document.getElementById("reservation"),
    infoFooter: document.createElement("p"),
    timerDiv: document.createElement("p")
};
eltFooter.footer.appendChild(eltFooter.infoFooter);
eltFooter.footer.appendChild(eltFooter.timerDiv);
eltFooter.footer.style.display = "none";

// Variables globales
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
        if(min === 0 && sec === 0) {
            setTimeout(function() {
                isReserved = false;
                eltFooter.timerDiv.innerHTML = "Votre réservation est terminée";
                nombreDeVelo = sessionStorage.getItem("stationVeloDispo");
                nombreDeVelo++;
                sessionStorage.setItem("stationVeloDispo", nombreDeVelo);
                display_info_velo();
                clearInterval(timer);
            }, 1000);
        }
    }, 1000);
}

function panel_info() {
    // On arrete le timer s'il a déja été en route
    clearInterval(timer);

    // On recupere le nombre de velo et on on enleve un velo
    nombreDeVelo = sessionStorage.getItem("stationVeloDispo");
    nombreDeVelo--;
    sessionStorage.setItem("stationVeloDispo", nombreDeVelo);
    // On actualise les infos des vélos
    display_info_velo();

    // On lance le decompte
    decompte();

}


/* --------------------------------- */
/* -- Affichage Information Velo -- */
/* --------------------------------- */

// Variables globales

// Objets informations quand on clique sur un marqueur
let infoVelo = {
    div: document.getElementById("info_velo"),
    address: document.createElement("p"),
    velo: document.createElement("p"),
    dispo: document.createElement("p")
};
infoVelo.div.appendChild(infoVelo.address);
infoVelo.div.appendChild(infoVelo.velo);
infoVelo.div.appendChild(infoVelo.dispo);

// Variables globales

let isAvailable = false;
let isReserved = false;

let reservationEnCoursAddress = "";
let reservationEnCoursVelo = "";
let reservationEnCoursDispo = "";

let regex = /^[^@&"()!_$*€£`+=\/;?#0-9]+$/;

// Affiche dans le panneau les informations

function display_info_velo() {

    document.getElementById("panelInfo").style.display = "block";

    // On vérifie que la station soit ouverte
    if (sessionStorage.getItem("stationVeloStatus") != "CLOSED") { // Teste maj et min
         // Affichage addresse
        infoVelo.address.innerHTML = `Ce stand se situe : ${sessionStorage.getItem("stationAddress")}`
        // Affichage nb de vélos dispo et en station
        infoVelo.velo.innerHTML = ` Nombre de place de vélos : ${sessionStorage.getItem("stationVelo")} places`;
        infoVelo.dispo.innerHTML = `Nombre de vélos disponibles : ${sessionStorage.getItem("stationVeloDispo")} `;
        isAvailable = true;
        // Affichage station fermé

    }else {
        infoVelo.address.innerHTML = "En travaux";
        infoVelo.velo.innerHTML = "";
        infoVelo.dispo.innerHTML = "";
        isAvailable = false;
    }

}
// Quand on clique sur Reserver du formulaire
formulaire.send.addEventListener("click", function(){
    document.getElementById("formulaire").appendChild(formulaire.infoReservation);
    // Si il n'y a plus de vélo
    if (sessionStorage.getItem("stationVeloDispo")  == 0) {
        formulaire.infoReservation.className = "alert alert-danger";
        formulaire.infoReservation.innerHTML = "Il n'y a plus de vélos disponibles";
    }
    // Si il y a des travaux
    else if(isAvailable == false) {
        formulaire.infoReservation.className = "alert alert-danger";
        formulaire.infoReservation.innerHTML = "Veuillez séléctionnez un vélo valide";
    }
    // Si le formulaire n'est pas rempli
    else if(prenom.value == "" || nom.value == "") {
        formulaire.infoReservation.className = "alert alert-danger";
        formulaire.infoReservation.innerHTML = "Veuillez remplir le formulaire";
    }
    else if(!(regex.test(prenom.value) && regex.test(nom.value) )) {
        formulaire.infoReservation.className = "alert alert-danger";
        formulaire.infoReservation.innerHTML = "Veuillez utiliser des caractères valides";
    }
    // Si tout est bon pour la réservation
    else{
        localStorage.setItem("prénom", formulaire.prenom.value);
        localStorage.setItem("Nom", formulaire.nom.value);
        formulaire.infoReservation.innerHTML = "";
        formulaire.infoReservation.className = "";
        // On affiche le panneau de signature
        Canevas.isDisplay(true);
    }

});

// Quand on clique sur Reserver la signature
formulaire.reserve.addEventListener("click", function(){

    // Si il y a une réservation en cours et que le marqueur séléctionné est la reservation
    if (isReserved && reservationEnCoursAddress == sessionStorage.getItem("stationAddress")) {
        document.getElementById("signatureDiv").appendChild(formulaire.infoReservation);
        formulaire.infoReservation.className = "alert alert-danger";
        formulaire.infoReservation.innerHTML = "Vous avez déja réservé un vélo ici";
    }
    else {
    // On affiche les informations de reservation
    eltFooter.footer.style.display = "flex";
    document.getElementById("signatureDiv").appendChild(formulaire.infoReservation);
    formulaire.infoReservation.className = "alert alert-success";
    formulaire.infoReservation.innerHTML = "Votre réservation à été faite";
    eltFooter.infoFooter.innerHTML = `Vélo réservé à la station ${sessionStorage.getItem("stationAddress")} par ${localStorage.getItem("prénom")} ${localStorage.getItem("Nom")}`;

    // On lance le décompte
    panel_info();

    // On indique que la reservation est en cours
    isReserved = true;
    reservationEnCoursAddress = sessionStorage.getItem("stationAddress");
    reservationEnCoursVelo = sessionStorage.getItem("stationVelo");
    reservationEnCoursDispo = sessionStorage.getItem("stationVeloDispo");
    document.location.href = "#reservation";
    }
});
