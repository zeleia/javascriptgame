window.addEventListener("load", init, false);

function init() {
  document.querySelector('#results').innerHTML = "";

  window.addEventListener("click", insertElement, false);
  document.querySelector("#rotate").addEventListener("click", rotate, false);
  document.querySelector("#mirror").addEventListener("click", mirror, false);

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

  if (window.localStorage.getItem("time") !== null) {
    timeLeft = Number(window.localStorage.getItem("time"));
  } else {
    timeLeft = 28;
    window.localStorage.setItem("time", timeLeft);
  }

  currentSeason();
  daysLeft();
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
  const table = document.querySelector("#map");
  table.innerHTML = null;
  for (let i = 0; i < map.length; i++) {
    const row = document.createElement("tr");
    table.appendChild(row);
    for (let j = 0; j < map[0].length; j++) {
      const cell = document.createElement("td");
      cell.className = "clickable";
      if (isMountain(i, j)) {
        cell.style.backgroundImage = "url('./assets/mountain_tile.png')";
        cell.style.backgroundSize = "30px 30px";
      } else {
        if (map[i][j] == 2) {
          cell.style.backgroundImage = "url('./assets/water_tile.png')";
          cell.style.backgroundSize = "30px 30px";
        } else {
          if (map[i][j] == 3) {
            cell.style.backgroundImage = "url('./assets/forest_tile.png')";
            cell.style.backgroundSize = "30px 30px";
          } else {
            if (map[i][j] == 4) {
              cell.style.backgroundImage = "url('./assets/plains_tile.png')";
              cell.style.backgroundSize = "30px 30px";
            } else {
              if (map[i][j] == 5) {
                cell.style.backgroundImage = "url('./assets/village_tile.png')";
                cell.style.backgroundSize = "30px 30px";
              } else {
                cell.style.backgroundImage = "url('./assets/base_tile.png')";
                cell.style.backgroundSize = "30px 30px";
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
  { row: 2, col: 2 },
  { row: 4, col: 9 },
  { row: 6, col: 4 },
  { row: 9, col: 10 },
  { row: 10, col: 6 },
];

//Hegy e?
function isMountain(row, col) {
  for (let i = 0; i < mountains.length; i++) {
    if (mountains[i].row == row + 1 && mountains[i].col == col + 1) {
      return true;
    }
  }
  return false;
}

//Elem alakzatok
let elements = [
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "town",
    shape: [
      [1, 1, 1],
      [0, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "farm",
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 1],
      [0, 0, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "town",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "farm",
    shape: [
      [1, 1, 1],
      [0, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "town",
    shape: [
      [1, 1, 0],
      [1, 0, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "town",
    shape: [
      [1, 1, 1],
      [1, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "farm",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 1,
    type: "farm",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [0, 1, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 1],
      [1, 0, 0],
      [1, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 0, 0],
      [1, 1, 1],
      [1, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 1],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "forest",
    shape: [
      [1, 1, 0],
      [0, 1, 1],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 2,
    type: "water",
    shape: [
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 3,
    type: "forest",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [1, 0, 1],
    ],
    rotation: 0,
    mirrored: false,
  },
  {
    time: 3,
    type: "farm",
    shape: [
      [0, 1, 0],
      [1, 1, 1],
      [1, 0, 1],
    ],
    rotation: 0,
    mirrored: false,
  },
];

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
    localElement = localElement.concat(",").concat(elements[i].type);
    localElement = localElement.concat(",").concat(elements[i].shape);
    localElement = localElement.concat(",").concat(elements[i].rotation);
    localElement = localElement
      .concat(",")
      .concat(elements[i].mirrored)
      .concat(";");
  }

  window.localStorage.setItem("elements", localElement);
}

function recreateElements() {
  const localElements = window.localStorage.getItem("elements");
  const elems = localElements.split(";");
  elements = new Array(elems.length);
  for (let i = 0; i < elems.length; i++) {
    const temp = elems[i].split(",");
    elements[i] = {
      time: temp[0],
      type: temp[1],
      shape: new Array(3),
      rotation: temp[11],
      mirrored: temp[12],
    };
    let shapeIndex = 2;
    for (let j = 0; j < 3; j++) {
      elements[i].shape[j] = new Array(
        temp[shapeIndex++],
        temp[shapeIndex++],
        temp[shapeIndex++]
      );
    }
  }
}

function drawElement(elem) {
  const table = document.querySelector("#elems");
  document.querySelector('#time').innerHTML = 'Időegység:' + elem.time;
  table.innerHTML = null;
  for (let i = 0; i < elem.shape.length; i++) {
    const row = document.createElement("tr");
    table.appendChild(row);
    for (let j = 0; j < elem.shape[0].length; j++) {
      const cell = document.createElement("td");
      if (elem.shape[i][j] != 0) {
        switch (elem.type) {
          case "farm":
            cell.style.backgroundImage = "url('./assets/plains_tile.png')";
            cell.style.backgroundSize = "50px 50px";
            break;
          case "water":
            cell.style.backgroundImage = "url('./assets/water_tile.png')";
            cell.style.backgroundSize = "50px 50px";
            break;
          case "forest":
            cell.style.backgroundImage = "url('./assets/forest_tile.png')";
            cell.style.backgroundSize = "50px 50px";
            break;
          case "town":
            cell.style.backgroundImage = "url('./assets/village_tile.png')";
            cell.style.backgroundSize = "50px 50px";
            break;
          default:
            console.log("Hibás típus!");
        }
      } else {
        cell.style.backgroundImage = "url('./assets/base_tile.png')";
        cell.style.backgroundSize = "50px 50px";
      }
      row.appendChild(cell);
    }
  }
}

function insertElement(e) {
  if (e.target.className === "clickable" && check(e)) {
    const temp = e.target.id;
    let coord = temp.split(",");
    const elem = elements[0];
    console.log(coord);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const row = Number(coord[0]) + i;
        const col = Number(coord[1]) + j;
        if (elements[0].type === "water" && elem.shape[i][j] != 0) {
          map[row][col] = 2;
        }
        if (elements[0].type === "forest" && elem.shape[i][j] != 0) {
          map[row][col] = 3;
        }
        if (elements[0].type === "farm" && elem.shape[i][j] != 0) {
          map[row][col] = 4;
        }
        if (elements[0].type === "town" && elem.shape[i][j] != 0) {
          map[row][col] = 5;
        }
      }
    }
    timeLeft -= elem.time;
    currentSeason();
    daysLeft();
    window.localStorage.setItem("time", timeLeft);
    window.localStorage.setItem("map", map);
    drawTable();
    elements.shift();
    saveToLocal();
    drawElement(elements[0]);
    gameEnd();
  }
}

function check(e) {
  const temp = e.target.id;
  let coord = temp.split(",");
  let n = map.length;
  const matrix = elements[0].shape;

  if (Number(coord[0]) >= n - 2 && Number(coord[1]) >= n - 2) {
    if (n - Number(coord[0]) == 2) {
      for (let i = 0; i < 3; i++) {
        if (matrix[2][i] != 0) {
          return false;
        }
      }

      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < n - Number(coord[1]); j++) {
          const row = Number(coord[0]) + i;
          const col = Number(coord[1]) + j;
          if (map[row][col] != 0 && matrix[i][j] != 0) {
            return false;
          }
        }
      }
    } else {
      for (let i = 0; i < 3; i++) {
        if (matrix[2][i] != 0 || matrix[1][i] != 0) {
          return false;
        }
      }

      for (let i = 0; i < 1; i++) {
        for (let j = 0; j < n - Number(coord[1]); j++) {
          const row = Number(coord[0]) + i;
          const col = Number(coord[1]) + j;
          if (map[row][col] != 0 && matrix[i][j] != 0) {
            return false;
          }
        }
      }
    }

    if (n - Number(coord[1]) == 2) {
      for (let i = 0; i < 3; i++) {
        if (matrix[i][2] != 0) {
          return false;
        }
      }

      for (let i = 0; i < n - Number(coord[0]); i++) {
        for (let j = 0; j < 2; j++) {
          const row = Number(coord[0]) + i;
          const col = Number(coord[1]) + j;
          if (map[row][col] != 0 && matrix[i][j] != 0) {
            return false;
          }
        }
      }
    } else {
      for (let i = 0; i < 3; i++) {
        if (matrix[2][i] != 0 || matrix[1][i] != 0) {
          return false;
        }
      }

      for (let i = 0; i < n - Number(coord[0]); i++) {
        for (let j = 0; j < 1; j++) {
          const row = Number(coord[0]) + i;
          const col = Number(coord[1]) + j;
          if (map[row][col] != 0 && matrix[i][j] != 0) {
            return false;
          }
        }
      }
    }
  } else {
    if (Number(coord[0]) >= n - 2) {
      if (n - Number(coord[0]) == 2) {
        for (let i = 0; i < 3; i++) {
          if (matrix[2][i] != 0) {
            return false;
          }
        }

        for (let i = 0; i < 2; i++) {
          for (let j = 0; j < 3; j++) {
            const row = Number(coord[0]) + i;
            const col = Number(coord[1]) + j;
            if (map[row][col] != 0 && matrix[i][j] != 0) {
              return false;
            }
          }
        }
      } else {
        for (let i = 0; i < 3; i++) {
          if (matrix[2][i] != 0 || matrix[1][i] != 0) {
            return false;
          }
        }

        for (let i = 0; i < 3; i++) {
          const row = Number(coord[0]);
          const col = Number(coord[1]) + i;
          console.log(row);
          console.log(col);
          if (map[row][col] != 0 && matrix[0][i] != 0) {
            return false;
          }
        }
      }
      return true;
    }

    if (Number(coord[1]) >= n - 2) {
      if (n - Number(coord[1]) == 2) {
        for (let i = 0; i < 3; i++) {
          if (matrix[i][2] != 0) {
            return false;
          }
        }

        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 2; j++) {
            const row = Number(coord[0]) + i;
            const col = Number(coord[1]) + j;
            if (map[row][col] != 0 && matrix[i][j] != 0) {
              return false;
            }
          }
        }
      } else {
        for (let i = 0; i < 3; i++) {
          if (matrix[i][2] != 0 || matrix[i][1] != 0) {
            return false;
          }
        }

        for (let i = 0; i < 3; i++) {
          const row = Number(coord[0]) + i;
          const col = Number(coord[1]) + j;
          if (map[row][col] != 0 && matrix[i][j] != 0) {
            return false;
          }
        }
      }
    }
  }

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const row = Number(coord[0]) + i;
      const col = Number(coord[1]) + j;
      if (map[row][col] != 0 && matrix[i][j] != 0) {
        return false;
      }
    }
  }
  return true;
}

function rotate() {
  const matrix = elements[0].shape;
  let n = matrix.length;

  let rotated = new Array(n);
  for (let i = 0; i < n; i++) {
    rotated[i] = new Array(n);
  }

  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      rotated[i][j] = matrix[n - 1 - j][i];
    }
  }

  elements[0].shape = rotated;
  if (elements[0].rotation + 90 == 360) {
    elements[0].rotation = 0;
  } else {
    elements[0].rotation += 90;
  }
  saveToLocal();
  drawElement(elements[0]);
}

function mirror() {
  let matrix = elements[0].shape;
  let n = matrix.length;

  let mirrored = new Array(n);
  for (let i = 0; i < n; i++) {
    mirrored[i] = new Array(n);
  }

  for (let i = 0; i < n; i++) {
    for (let j = 2; j >= 0; j--) {
      mirrored[i][j] = matrix[i][n - j - 1];
    }
  }

  elements[0].shape = mirrored;
  elements[0].mirrored = !elements[0].mirrored;
  saveToLocal();
  drawElement(elements[0]);
}

let timeLeft;

function currentSeason() {
  const season = document.querySelector("#currentSeason");
  const glass = document.querySelector("#field");
  switch (Math.floor(timeLeft / 7)) {
    case 0:
      season.innerHTML = "Jelenlegi évszak: Tél";
      glass.style.backgroundColor = "rgb(65% 105% 225% / .7)";
      if (window.localStorage.getItem("autumnPoints") === null) {
        calculateAutumnPoints();
      }
      document.querySelector('#missionD').classList.add("outline");
      document.querySelector('#missionA').classList.add("outline");
      document.querySelector('#missionC').classList.remove("outline");
      document.querySelector('#missionB').classList.remove("outline");
      break;
    case 1:
      season.innerHTML = "Jelenlegi évszak: Ősz";
      glass.style.backgroundColor = "rgb(123% 63% 0% / .7)";
      if (window.localStorage.getItem("summerPoints") === null) {
        calculateSummerPoints();
      }
      document.querySelector('#missionD').classList.add("outline");
      document.querySelector('#missionC').classList.add("outline");
      document.querySelector('#missionA').classList.remove("outline");
      document.querySelector('#missionB').classList.remove("outline");
      break;
    case 2:
      season.innerHTML = "Jelenlegi évszak: Nyár";
      glass.style.backgroundColor = "rgb(250% 215% 0% / .7)";
      if (window.localStorage.getItem("springPoints") === null) {
        calculateSpringPoints();
      }
      document.querySelector('#missionC').classList.add("outline");
      document.querySelector('#missionB').classList.add("outline");
      document.querySelector('#missionA').classList.remove("outline");
      document.querySelector('#missionD').classList.remove("outline");
      break;
    default:
      season.innerHTML = "Jelenlegi évszak: Tavasz ";
      glass.style.backgroundColor = "rgb(34% 139% 34% / .7)";
      document.querySelector('#missionA').classList.add("outline");
      document.querySelector('#missionB').classList.add("outline");
      document.querySelector('#missionC').classList.remove("outline");
      document.querySelector('#missionD').classList.remove("outline");
  }
}

function daysLeft() {
  const daysLeftText = document.querySelector("#daysLeft");
  const daysLeft = timeLeft % 7;
  switch (daysLeft) {
    case 6:
      daysLeftText.innerHTML = "Évszakból hátralevő idő: 6/7";
      break;
    case 5:
      daysLeftText.innerHTML = "Évszakból hátralevő idő: 5/7";
      break;
    case 4:
      daysLeftText.innerHTML = "Évszakból hátralevő idő: 4/7";
      break;
    case 3:
      daysLeftText.innerHTML = "Évszakból hátralevő idő: 3/7";
      break;
    case 2:
      daysLeftText.innerHTML = "Évszakból hátralevő idő: 2/7";
      break;
    case 1:
      daysLeftText.innerHTML = "Évszakból hátralevő idő: 1/7";
      break;
    default:
      daysLeftText.innerHTML = "Évszakból hátralevő idő: 7/7";
  }
}

const missions = {
  basic: [
    {
      title: "Az erdő széle",
      description:
        "A térképed szélével szomszédos erdőmezőidért egy-egy pontot kapsz.",
    },
    {
      title: "Álmos-völgy",
      description:
        "Minden olyan sorért, amelyben három erdőmező van, négy-négy pontot kapsz.",
    },
    {
      title: "Krumpliöntözés",
      description:
        "A farmmezőiddel szomszédos vízmezőidért két-két pontot kapsz.",
    },
    {
      title: "Határvidék",
      description: "Minden teli sorért vagy oszlopért 6-6 pontot kapsz.",
    },
  ],
  extra: [
    {
      title: "Fasor",
      description:
        "A leghosszabb, függőlegesen megszakítás nélkül egybefüggő erdőmezők mindegyikéért kettő-kettő pontot kapsz. Két azonos hosszúságú esetén csak az egyikért.",
    },
    {
      title: "Gazdag város",
      description:
        "A legalább három különböző tereptípussal szomszédos falurégióidért három-három pontot kapsz.",
    },
    {
      title: "Öntözőcsatorna",
      description:
        "Minden olyan oszlopodért, amelyben a farm illetve a vízmezők száma megegyezik, négy-négy pontot kapsz. Mindkét tereptípusból legalább egy-egy mezőnek lennie kell az oszlopban ahhoz, hogy pontot kaphass érte.",
    },
    {
      title: "Mágusok völgye",
      description:
        "A hegymezőiddel szomszédos vízmezőidért három-három pontot kapsz.",
    },
    {
      title: "Üres telek",
      description:
        "A városmezőiddel szomszédos üres mezőkért 2-2 pontot kapsz.",
    },
    {
      title: "Sorház",
      description:
        "A leghosszabb, vízszintesen megszakítás nélkül egybefüggő falumezők mindegyikéért kettő-kettő pontot kapsz.",
    },
    {
      title: "Páratlan silók",
      description:
        "Minden páratlan sorszámú teli oszlopodért 10-10 pontot kapsz.",
    },
    {
      title: "Gazdag vidék",
      description:
        "Minden legalább öt különböző tereptípust tartalmazó sorért négy-négy pontot kapsz.",
    },
  ],
};

const activeMissions = missions.basic;

function calculateSpringPoints() {
  let result = calculateMissionPoints([activeMissions[0], activeMissions[1]]);
  result += calculateMountainBordelLine();
  window.localStorage.setItem("springPoints", result);
}

function calculateSummerPoints() {
  let result = calculateMissionPoints([activeMissions[1], activeMissions[2]]);
  result += calculateMountainBordelLine();
  window.localStorage.setItem("summerPoints", result);
  missionBPoints = calculateMissionPoints([activeMissions[1]]);
  window.localStorage.setItem("bMissionPoints", missionBPoints);
}

function calculateAutumnPoints() {
  let result = calculateMissionPoints([activeMissions[2], activeMissions[3]]);
  result += calculateMountainBordelLine();
  window.localStorage.setItem("autumnPoints", result);
  missionCPoints = calculateMissionPoints([activeMissions[2]]);
  window.localStorage.setItem("cMissionPoints", missionCPoints);
}

function calculateWinterPoints() {
  let result = calculateMissionPoints([activeMissions[3], activeMissions[0]]);
  result += calculateMountainBordelLine();
  window.localStorage.setItem("winterPoints", result);
}

function calculateMissionPoints(m) {
  let result = 0;
  for (let i = 0; i < m.length; i++) {
    switch (m[i].title) {
      case "Az erdő széle":
        result += calculateEdgeOfTheForest();
        break;
      case "Álmos-völgy":
        result += calculateSleepyValley();
        break;
      case "Krumpliöntözés":
        result += calculatePotatoWatering();
        break;
      case "Határvidék":
        result += calculateBorderline();
        break;
      default:
        console.log("unknown");
    }
  }
  return result;
}

function calculateEdgeOfTheForest() {
  let result = 0;
  for (let i = 0; i < map.length; i++) {
    if (map[0][i] == 3) {
      result++;
      console.log("széle++");
    }

    if (map[map.length - 1][i] == 3) {
      result++;
      console.log("széle++");
    }
  }

  for (let i = 0; i < map.length; i++) {
    if (map[i][0] == 3) {
      result++;
      console.log("széle++");
    }

    if (map[i][map.length - 1] == 3) {
      result++;
      console.log("széle++");
    }
  }
  return result;
}

function calculateSleepyValley() {
  let result = 0;
  for (let i = 0; i < map.length; i++) {
    let cnt = 0;
    for (let j = 0; j < map.length; j++) {
      if (map[i][j] == 3) {
        cnt++;
      }
    }
    if (cnt == 3) {
      result += 4;
      console.log("sor++");
    }
  }
  return result;
}

function calculatePotatoWatering() {
  let result = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
      if (map[i][j] == 2) {
        if (i - 1 >= 0 && map[i - 1][j] == 4) {
          result += 2;
          console.log("potato++");
          continue;
        }
        if (i + 1 < map.length && map[i + 1][j] == 4) {
          result += 2;
          console.log("potato++");
          continue;
        }
        if (j - 1 >= 0 && map[i][j - 1] == 4) {
          result += 2;
          console.log("potato++");
          continue;
        }
        if (j + 1 < map.length && map[i][j + 1] == 4) {
          result += 2;
          console.log("potato++");
          continue;
        }
      }
    }
  }
  return result;
}

function calculateBorderline() {
  console.log("Határvidék!");
  let result = 0;
  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
      if (map[i][j] == 0) {
        break;
      }

      if (j == map.length - 1) {
        result += 6;
        console.log("border++");
      }
    }
  }

  for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map.length; j++) {
      if (map[j][i] == 0) {
        break;
      }

      if (j == map.length - 1) {
        result += 6;
        console.log("border++");
      }
    }
  }

  return result;
}

function calculateMountainBordelLine(){
  let result = 0;
  for(let i = 0; i < map.length; i++){
    for(let j = 0; j < map.length; j++){
      if (map[i][j] == 1) {
        if (i - 1 < 0 || map[i - 1][j] == 0) {
          continue;
        }
        if (i + 1 >= map.length || map[i + 1][j] == 0) {
          continue;
        }
        if (j - 1 < 0 || map[i][j - 1] == 0) {
          continue;
        }
        if (j + 1 >= map.length || map[i][j + 1] == 0) {
          continue;
        }
        result += 1;
        console.log("mountain!")
      }
    }
  }
  return result;
}

let missionAPoints;
let missionBPoints;
let missionCPoints;
let missionDPoints;

function gameEnd() {
  if (window.localStorage.getItem("time") <= 0) {
    missionDPoints = calculateMissionPoints([activeMissions[3]]);
    window.localStorage.setItem("dMissionPoints", missionDPoints);
    missionAPoints = calculateMissionPoints([activeMissions[0]]);
    window.localStorage.setItem("aMissionPoints", missionAPoints);
    const result = document.querySelector('#results');
    result.innerHTML =
      `<h1>Vége a játéknak!</h1>
     ${activeMissions[0].title}: ${missionAPoints} pont<br>
     ${activeMissions[1].title}: ${missionBPoints} pont<br>
     ${activeMissions[2].title}: ${missionCPoints} pont<br>
     ${activeMissions[3].title}: ${missionDPoints} pont<br>`;
    window.removeEventListener('click', insertElement, false);
    document.querySelector("#rotate").removeEventListener('click', rotate, false);
    document.querySelector("#mirror").removeEventListener('click', mirror, false);
    result.innerHTML += '<button type="button" onclick="window.location.reload()">Új játék!</button>';
    const spring = Number(window.localStorage.getItem('springPoints'));
    const summer = Number(window.localStorage.getItem('summerPoints'));
    const autumn = Number(window.localStorage.getItem('autumnPoints'));
    const winter = Number(window.localStorage.getItem('winterPoints'));
    const mountain = calculateMountainBordelLine();
    const all = spring + summer + autumn + winter + mountain;
    document.querySelector('#result').innerHTML = `Összesen: ${all} pont`
    window.localStorage.clear();
  }
}
