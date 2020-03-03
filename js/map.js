

document.getElementById("panelInfo").style.display = "none";
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

    // Affiche les marqueurs, groupe et icone
    while (i != data.length){

        // Icone
        let icone = L.icon({
            iconUrl: "images/marker_icon.svg",
            iconSize:  [40, 40],
            iconAnchor: [25, 50],
            popupAnchor: [-5, -50],
        });

        // Création marqueur
        let marqueur = L.marker([data[i].position.lat, data[i].position.lng], {icon: icone});
        let stationInfo = new classe(data[i].name, data[i].address, data[i].bike_stands, data[i].available_bike_stands, data[i].status);
        marqueur.addEventListener("click", function() {

            if (stationInfo.address == "") {
                sessionStorage.setItem("stationAddress", stationInfo.name);
            }else {
                sessionStorage.setItem("stationAddress", stationInfo.address);
            };
            sessionStorage.setItem("stationVelo", stationInfo.numberBike);
            sessionStorage.setItem("stationVeloDispo", stationInfo.dispoBike);
            sessionStorage.setItem("stationVeloStatus", stationInfo.open);
            if (isReserved) {
                nombreDeVeloAffichage = sessionStorage.getItem("stationVeloDispo") - 1;
                sessionStorage.setItem("stationVeloDispo", nombreDeVeloAffichage)
            }
            formulaire.panel.style.padding = "10px 0 30px 0px";
            Canevas.isDisplay(false);
            display_info_velo();
            document.location.href = "#panel";

        });
        // Création groupe marqueurs
        groupe_marqueur.addLayer(marqueur);
        macarte.addLayer(groupe_marqueur);
        i++;
    }
}


