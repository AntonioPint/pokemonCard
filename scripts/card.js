let constrain = {x: 150, y: 100};
let mouseOverContainer = document.getElementById("card1");
let card1Layer = document.getElementById("card1-layer");
let card1Layer2 = document.getElementById("card1-layer2");
let layer = card1Layer; 
let cardFlipped = false

function transforms(x, y, el) {
    if(constrain.x == 0){ constrain.x = 200}
    if(constrain.y == 0){ constrain.y = 200}

    let box = el.getBoundingClientRect();
    let calcX = -(y - box.y - (box.height * 0.5)) / constrain.x;
    let calcY = (x - box.x - (box.width * 0.5)) / constrain.y;

    if(cardFlipped) calcY = 180 - calcY;

    return "perspective(100px) "
        + "   rotateX(" + calcX + "deg) "
        + "   rotateY(" + calcY + "deg) ";
};

function transformElement(el, xyEl) {
    el.style.transform = transforms.apply(null, xyEl);
}

mouseOverContainer.onmousemove = function (e) {
    let xy = [e.clientX, e.clientY];
    let position = xy.concat([layer]);

    window.requestAnimationFrame(function () {
        transformElement(layer, position);
    });
};

mouseOverContainer.onclick = (e) => {
    let frontCard = document.getElementsByClassName("flip-card-inner")[0]
    cardFlipped ? frontCard.style.transform = "" : frontCard.style.transform = "rotateY(180deg)";
    cardFlipped = !cardFlipped
    layer = !cardFlipped ? card1Layer : card1Layer2;
}

mouseOverContainer.onmouseleave = (e) =>{
    const box = layer.getBoundingClientRect()
    const xCenter = (box.left + box.right) / 2
    const yCenter = (box.top + box.bottom) / 2
    let xy = [xCenter, yCenter];
    let position = xy.concat([layer]);

    window.requestAnimationFrame(function () {
        transformElement(layer, position);
    });
}

mouseOverContainer.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      mouseOverContainer.click();
    }
});
