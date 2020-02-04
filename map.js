
/* ----------------------- */
/* - Initialisation velo - */
/* ----------------------- */


function initMap() {
    // Initialisation carte
    let macarte = L.map("map").setView([45.75, 4.85], 14)

    // Création de la carte openstreetmap
    L.tileLayer("https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png'", {
        attribution:"OpenStreetMap Lyon",
        minZoom: 11,
        maxZoom: 20
    }).addTo(macarte);

    // On crée des marqueurs
    request(macarte);
}

// On appelle la fonction principale
initMap();

/* ---------------------- */
/* -- Création requete -- */
/* ---------------------- */

function request(macarte) {

    // Création de la requete HTTP et de la data
    let request = new XMLHttpRequest();
    let data = [];

    // Ouvre la requete
    request.open("GET", "https://api.jcdecaux.com/vls/v1/stations?contract=lyon&apiKey=009ffa04b633e434afb11fa1389d69943da12d0f");

    // On la charge et l'utilise
    request.onload = function() {
        // Verification requete juste
        if (request.status >= 200 && request.status < 400) {
            data = JSON.parse(this.response);
            marker(macarte, data)
        }else {
            console.log("Erreur");
        }
    };
    request.send();

}


/* ------------------------ */
/* -- Création marqueurs -- */
/* ------------------------ */


// Variables globales

// Classe ou l'on stockera les informations d'une station d'un vélo
class classe {
    constructor(name, address, numberBike, dispoBike, open) {
        this.name = name,
        this.address = address,
        this.numberBike = numberBike,
        this.dispoBike = dispoBike,
        this.open = open;
    }
}

function marker(macarte, data) {
    // Initialisation
    let i = 0;
    let groupe_marqueur = L.markerClusterGroup();
    let x = 0;

    // Affiche les marqueurs, groupe et icone
    while (i != data.length){

        // Icone
        let icone = L.icon({
            iconUrl: "marker_icon.svg",
            iconSize:  [40, 40],
            iconAnchor: [25, 50],
            popupAnchor: [-5, -50],
        });

        // Création marqueur
        let marqueur = L.marker([data[i].position.lat, data[i].position.lng], {icon: icone});
        let stationInfo = new classe(data[i].name, data[i].address, data[i].bike_stands, data[i].available_bike_stands, data[i].status);
        marqueur.addEventListener("click", function() {
            display_info_velo(stationInfo);
            evenement_reservation(stationInfo);
        })
        // Création groupe marqueurs
        groupe_marqueur.addLayer(marqueur);
        macarte.addLayer(groupe_marqueur);
        i++;
    }
}


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

function evenement_reservation(stationInfo) {
    formulaire.send.addEventListener("click", function(){

        if (prenom.value != "" && nom.value != "" && isSelected == true){
            localStorage.setItem("prénom", formulaire.prenom.value);
            localStorage.setItem("Nom", formulaire.nom.value);
            formulaire.infoReservation.innerHTML = "Votre réservation à été faite";
            display_info_reservation(stationInfo);
        }
        else if(isSelected == false) {
            formulaire.infoReservation.innerHTML = "Veuillez séléctionnez un vélo valide";
        }
        else if(prenom.value == "" && nom.value == "" && isSelected == true) {
            formulaire.infoReservation.innerHTML = "Veuillez remplir le formulaire";
        }
    });
}