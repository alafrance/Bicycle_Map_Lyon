// On crée une classe pour gérer le dom 
class CanevasClasse {
    constructor(canvas, boutonClear, signatureDiv){
        this.canvas = canvas,
        this.boutonClear = boutonClear,
        this.signatureDiv = signatureDiv
    }
    isDisplay(display){
        if (display){
            signatureDiv.style.display = "block";
        }else {
            signatureDiv.style.display = "none";
        }
    }
}
// On Appelle la classe pour gérer le dom
const Canevas = new CanevasClasse(document.getElementById("canevas"),document.getElementById("clear"), document.getElementById("signatureDiv"))
Canevas.isDisplay(false);

// On crée les variables globales, pour gérer la position de la souris et création du canevas
let x = 0;
let y = 0;

let isDrawing = false;
const context = Canevas.canvas.getContext("2d");


// Evenement pour gérer clique souris, relache souris et mouvement souris

Canevas.canvas.addEventListener("mousedown", function(e){
    isDrawing = true;
    x = e.offsetX;
    y = e.offsetY;
});

Canevas.canvas.addEventListener("mouseup", function(e){
    isDrawing = false;
});

Canevas.canvas.addEventListener("mousemove", function(e) {
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
Canevas.boutonClear.addEventListener("click", function() {
    context.clearRect(0, 0, 300, 200);
});

/*  ---------------- */
/*  Signature mobile */
/*  ---------------- */

let xT = 0;
let yT = 0;
let isDrawingT = false;
// Touchpad
Canevas.canvas.addEventListener("touchstart", function(e){
    e.preventDefault;
    isDrawingT = true;
    var oRect = canevas.getBoundingClientRect();
    xT = e.touches[0].clientX - oRect.left;
    yT = e.touches[0].clientY - oRect.top;
});

Canevas.canvas.addEventListener("touchmove", function(e){
    e.preventDefault;
    if (isDrawingT == true){
        var oRect = canevas.getBoundingClientRect();
        dessiner(xT, yT, e.touches[0].clientX - oRect.left, e.touches[0].clientY - oRect.top);
        xT = e.touches[0].clientX - oRect.left;
        yT = e.touches[0].clientY - oRect.top;
        }
});

Canevas.canvas.addEventListener("touchend", function(e){
    e.preventDefault;
    isDrawingT = false;
});