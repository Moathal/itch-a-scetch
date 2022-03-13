let x = 0;
let click = false;
const colors = document.querySelectorAll('.color');
let choice = document.getElementById('black');
let chosenColor = { 0: choice.id, 1: null, 2: null, 3: null };
const board = document.getElementById("board");
thickness = document.getElementById('thickness');
choice.classList.add('chosen');
const multi = document.getElementById('tick');
let y = 0;
const boardStatus = document.getElementById('boardActivate');
boardStatus.style.color = "darkred";

function setThick() {
     let pixels = document.querySelectorAll('.pixel');
    if (pixels.length > 0) {
        for (i = 0; i < pixels.length; i++) {
            let pixel = document.getElementById(i);
            board.removeChild(pixel);
        };
    };
    if (thickness.value < 4){
        thickness.value = 4;
    } else if (thickness.value > 14400){
        thickness.value = 14400;
    };

    board.style.display = "grid";
    board.style.gridTemplateColumns = `repeat(${Math.floor(Math.sqrt(thickness.value))},auto)`;
    board.style.gridTemplateRows = `repeat(${Math.floor(Math.sqrt(thickness.value))},auto)`;
    let z= 0;
    for (i = 0; i < thickness.value; i++) {
        let pixel = document.createElement("div");
        board.appendChild(pixel);
        pixel.className = "pixel";
        pixel.style.backgroundColor = "white";
        pixel.id = i;
        pixel.draggable = false;
        z = i;
    };
    let pixel = document.getElementById(z);
    while (pixel.getBoundingClientRect().right !== (board.getBoundingClientRect().right - 2)){
        z++;
        pixel = document.createElement("div");
        board.appendChild(pixel);
        pixel.className = "pixel";
        pixel.style.backgroundColor = "white";
        pixel.id = z;
        pixel.draggable = false;
    };
    thickness.value = `${z+1}`;
};

document.addEventListener('click', (e) => {
    onclick(e.target);
});
board.addEventListener('mouseover', (e) => {
    if(e.target.id >= 0 && e.target.id <= 200000)
    draw(e.target);
});

    function onclick(target) {
        if (target.localName !== 'button' && target.localName !== 'span' && target.localName !== 'input') {
            click = !click;
            if (click){
                boardStatus.style.color = "darkgreen";
                boardStatus.innerText = " Active"
            } else{
                boardStatus.style.color = "darkred";
                boardStatus.innerText = " Inactive"
            };
        } else if (target.localName !== 'button' && target.localName !== 'input') {
            color(target.id);
        };
    };

    function clean() {
        const pixels = document.querySelectorAll('.pixel');
        for (i = 0; i < pixels.length; i++) {
            pixels[i].style.backgroundColor = "white";
        };
    };

    function erasor() {
        const erasorbtn = document.getElementById('erasor');
        if (erasorbtn.className === "dropbtn Active") {
            erasorbtn.classList.remove("Active");
        } else {
            erasorbtn.classList.add("Active");
        };
    };


    function draw(pixel) {
        const random = document.getElementById('tick2');
        const custom = document.getElementById('tick3');
        const erasorbtn = document.getElementById('erasor');
         if (click && erasorbtn.className === 'dropbtn Active') {
            pixel.style.backgroundColor = "white";
        } else if (click && erasorbtn.className !== 'dropbtn Active' && multi.className === 'tick Active') {
            pixel.style.backgroundColor = chosenColor[y];
            y++
            if (y == 4) {
                y = 0;
            };
        } else if(click && erasorbtn.className !== 'dropbtn Active' && custom.className === 'tick Active'){
            pixel.style.backgroundColor = document.getElementById('custom').value;
        } else if (click && erasorbtn.className !== 'dropbtn Active' && random.className === 'tick Active'){
            let r = Math.floor(Math.random() * 255);
            let g = Math.floor(Math.random() * 255);
            let b = Math.floor(Math.random() * 255);
            pixel.style.backgroundColor =`rgb(${r},${g},${b})`
        } else if (click){
            pixel.style.backgroundColor = chosenColor[0];
        };

    };
    setThick();

    function color(tagId) {
        const random = document.getElementById('tick2');
        const custom = document.getElementById('tick3');
        if (random.className === 'tick Active'){
            random.classList.remove('Active')
        };
        if (custom.className === 'tick Active'){
            custom.classList.remove('Active')
        };
        if (multi.className === ("tick")) {
            choice = document.getElementById(tagId);
            for (i = 0; i < colors.length; i++) {
                for (j = 0; j < 4; j++) {
                    if (colors[i].id === chosenColor[j]) {
                        colors[i].classList.remove('chosen');
                        chosenColor[j] = null;
                        break;
                    };
                };
            };
            chosenColor[0] = tagId;
            choice.classList.add('chosen');
        } else if (multi.className === "tick Active") {
            choice = document.getElementById(tagId);
            if (x == 0) {
                for (i = 0; i < colors.length; i++) {
                    for (j = 0; j < 4; j++) {
                        if (colors[i].id === chosenColor[j]) {
                            colors[i].classList.remove('chosen');
                            chosenColor[j] = null;
                            break;
                        };
                    };
                };

            };
        };
        chosenColor[x] = tagId;
        choice.classList.add('chosen');
        x++;
        if (x == 4) {
            x = 0;
        };
    };
    function activateMulti() {

        if (multi.className == "tick") {
            const custom = document.getElementById("tick3");
            const random = document.getElementById("tick2");
            colors.forEach(choice => choice.classList.remove('chosen'));
            if (custom.className !== "tick"){
                custom.classList.remove("Active");
                } else if(random.className !=="tick"){
                random.classList.remove("Active");
                };
            multi.classList.add("Active");
            for (c = 1; c < 4; c++) {
                chosenColor[i] = null;
            };
        } else {
            multi.classList.remove("Active");
            colors.forEach(choice => choice.classList.remove('chosen'));
            choice = document.getElementById('black');
            choice.classList.add('chosen');
            chosenColor[0] = choice.id;
        };
    };
    function activateRandom(){
        const random = document.getElementById('tick2');
        const custom = document.getElementById('tick3');
        for (i = 0; i < colors.length; i++) {
            for (j = 0; j < 4; j++) {
                if (colors[i].id === chosenColor[j]) {
                    colors[i].classList.remove('chosen');
                    chosenColor[j] = null;
                    break;
                };
            };
        };
        if ( random.className == "tick"){
            colors.forEach(choice => choice.classList.remove('chosen'));
            if (multi.className !== "tick"){
            multi.classList.remove("Active");
            } else if(custom.className !=="tick"){
            custom.classList.remove("Active");
            };
            for( i=0; i < 4; i++){
                chosenColor[i] = null;
            };
            random.classList.add("Active");
        } else {
            random.classList.remove("Active");
            colors.forEach(choice => choice.classList.remove('chosen'));
            choice = document.getElementById('black');
            choice.classList.add('chosen');
            chosenColor[0] = choice.id;
        };
    };
    function activateCustom(){
        const random = document.getElementById('tick2');
        const custom = document.getElementById('tick3');
        for (i = 0; i < colors.length; i++) {
            for (j = 0; j < 4; j++) {
                if (colors[i].id === chosenColor[j]) {
                    colors[i].classList.remove('chosen');
                    chosenColor[j] = null;
                    break;
                };
            };
        };
        if ( custom.className == "tick"){
            colors.forEach(choice => choice.classList.remove('chosen'));
            if (multi.className !== "tick"){
            multi.classList.remove("Active");
            } else if(random.className !=="tick"){
            random.classList.remove("Active");
            };
            for( i=0; i < 4; i++){
                chosenColor[i] = null;
            };
            custom.classList.add("Active");
        };
    };
