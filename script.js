window.addEventListener('load', init, false);

function init() {
    window.addEventListener('click',insertElement,false);

    if (window.localStorage.getItem("map") !== null) {
        recreateMap();
        drawTable();
    } else {
        generateMap();
        drawTable();
    }

    if (window.localStorage.getItem("elements") !== null) {
        recreateElements();
        drawElement(elements[0]);
    } else {
        shuffle();
        drawElement(elements[0]);
    }
}

//Mátrix létrehozása
let map = new Array(11);

for (let i = 0; i < map.length; i++) {
    map[i] = new Array(11);
}

//Kezdeti állapot generálása (csak hegyek) mátrix szintjén
function generateMap() {
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            if (isMountain(i, j)) {
                map[i][j] = 1;
            } else {
                map[i][j] = 0;
            }
        }
    }
    window.localStorage.setItem("map", map);
}

//Mátrix vizuális megjelenítése (kirajzolás)
function drawTable() {
    const table = document.querySelector('#map');
    table.innerHTML = null;
    for (let i = 0; i < map.length; i++) {
        const row = document.createElement('tr');
        table.appendChild(row);
        for (let j = 0; j < map[0].length; j++) {
            const cell = document.createElement('td');
            if (isMountain(i, j)) {
                cell.style.backgroundColor = 'brown';
            } else {
                if(map[i][j] == 2){
                    cell.style.backgroundColor = 'blue';
                } else {
                    if(map[i][j] == 3){
                        cell.style.backgroundColor = 'green';
                    } else {
                        if(map[i][j] == 4){
                            cell.style.backgroundColor = 'yellow';
                        } else {
                            if(map[i][j] == 5){
                                cell.style.backgroundColor = 'red';
                            } else {
                                cell.className = "clickable";
                            }
                        }
                    }
                }
            }
            cell.id = i + "," + j;
            row.appendChild(cell);
        }
    }
}

//Local Storageben található adat helyreállítása
function recreateMap() {
    const local = window.localStorage.getItem("map");
    let localIndex = 0;
    for (let i = 0; i < map.length; i++) {
        for (let j = 0; j < map[0].length; j++) {
            map[i][j] = local[localIndex];
            localIndex += 2;
        }
    }
}


//Hegyek pozíciói
const mountains = [
    { "row": 2, "col": 2 },
    { "row": 4, "col": 9 },
    { "row": 6, "col": 4 },
    { "row": 9, "col": 10 },
    { "row": 10, "col": 6 }
]

//Hegy e?
function isMountain(row, col) {
    for (let i = 0; i < mountains.length; i++) {
        if (mountains[i].row == (row + 1) && mountains[i].col == (col + 1)) {
            return true
        }
    }
    return false;
}

//Elem alakzatok
let elements = [
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1, 1, 1],
        [0, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 1],
        [0, 0, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'town',
        shape: [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'farm',
        shape: [[1, 1, 1],
        [0, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1, 1, 0],
        [1, 0, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'town',
        shape: [[1, 1, 1],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 1,
        type: 'farm',
        shape: [[0, 1, 0],
        [1, 1, 1],
        [0, 1, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 1],
        [1, 0, 0],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 0, 0],
        [1, 1, 1],
        [1, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 1]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'forest',
        shape: [[1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
    {
        time: 2,
        type: 'water',
        shape: [[1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]],
        rotation: 0,
        mirrored: false
    },
]

function shuffle() {
    let currentIndex = elements.length;
    let randomIndex;

    while (currentIndex > 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        const temp = elements[currentIndex];
        elements[currentIndex] = elements[randomIndex];
        elements[randomIndex] = temp;
    }

    saveToLocal();
}

function saveToLocal() {
    let localElement = "";
    for (let i = 0; i < elements.length; i++) {
        localElement = localElement.concat(elements[i].time);
        localElement = localElement.concat(',').concat(elements[i].type);
        localElement = localElement.concat(',').concat(elements[i].shape);
        localElement = localElement.concat(',').concat(elements[i].rotation);
        localElement = localElement.concat(',').concat(elements[i].mirrored).concat(';');
    }

    window.localStorage.setItem("elements", localElement);
}

function recreateElements() {
    const localElements = window.localStorage.getItem("elements");
    const elems = localElements.split(";");
    elements = new Array(elems.length);
    for (let i = 0; i < elems.length; i++) {
        const temp = elems[i].split(",");
        elements[i] = {time: temp[0], type: temp[1], shape: new Array(3), rotation: temp[11], mirrored: temp[12]};
        let shapeIndex = 2;
        for (let j = 0; j < 3; j++) {
            elements[i].shape[j] = new Array(temp[shapeIndex++], temp[shapeIndex++], temp[shapeIndex++]);
        }
    }
}

function drawElement(elem) {
    const table = document.querySelector('#elems');
    table.innerHTML = null;
    for (let i = 0; i < elem.shape.length; i++) {
        const row = document.createElement('tr');
        table.appendChild(row);
        for (let j = 0; j < elem.shape[0].length; j++) {
            const cell = document.createElement('td');
            if (elem.shape[i][j] != 0) {
                switch (elem.type) {
                    case "farm":
                        cell.style.backgroundColor = 'yellow';
                        break;
                    case "water":
                        cell.style.backgroundColor = 'blue';
                        break;
                    case "forest":
                        cell.style.backgroundColor = 'green';
                        break;
                    case "town":
                        cell.style.backgroundColor = 'red';
                        break;
                    default:
                        console.log("Hibás típus!");
                }
            }
            row.appendChild(cell);
        }
    }
}



function insertElement(e){
    if(e.target.className === 'clickable'){
        const temp = e.target.id;
        let coord = temp.split(',');
        console.log(coord);
        for(let i = 0; i < 3; i++){
            for(let j = 0; j < 3; j++){
                const row = Number(coord[0]) + i;
                console.log(row);
                const col = Number(coord[1]) + j;
                console.log(col);
                if(elements[0].type === "water" && elements[0].shape[i][j] != 0){
                    map[row][col] = 2;
                }
                if(elements[0].type === "forest" && elements[0].shape[i][j] != 0){
                    map[row][col] = 3;
                }
                if(elements[0].type === "farm" && elements[0].shape[i][j] != 0){
                    map[row][col] = 4;
                }
                if(elements[0].type === "town" && elements[0].shape[i][j] != 0){
                    map[row][col] = 5;
                }
            }
        }
        console.log(map);
        window.localStorage.setItem("map", map);
        drawTable();
        elements.shift();
        saveToLocal();
        drawElement(elements[0]);
    }
}