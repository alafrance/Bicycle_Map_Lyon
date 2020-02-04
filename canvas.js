
// On crée les variables globales, pour gérer la position de la souris et création du canevas
let x = 0;
let y = 0;
let isDrawing = false;

const canevas = document.getElementById("canevas");
const boutonClear = document.getElementById("clear");
const context = canevas.getContext("2d");


// Evenement pour gérer clique souris, relache souris et mouvement souris

canevas.addEventListener("mousedown", function(e){
    isDrawing = true;
    x = e.offsetX;
    y = e.offsetY;
});

canevas.addEventListener("mouseup", function(e){
    isDrawing = false;
});

canevas.addEventListener("mousemove", function(e) {
    if (isDrawing == true) {
        dessiner(x, y, e.offsetX, e.offsetY);
        x = e.offsetX;
        y = e.offsetY;
    }
});


// Fonction pour dessiner de pixel en pixel
function dessiner(x1, y1, x2, y2 ) {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

// Supprimer le canevas à partir d'un bouton
boutonClear.addEventListener("click", function() {
    context.clearRect(0, 0, 300, 200);
});

