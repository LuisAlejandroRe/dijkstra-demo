const canvas = document.getElementById("canvas");
const startBtn = document.getElementById("start");
const endBtn = document.getElementById("end");
const ctx = canvas.getContext("2d");

const NODE_RADIUS = 10;
let isSettingStart = false;
let isSettingEnd = false;

// Configuración de nodos y conexiones
const nodes = [
  { id: 0, x: 67, y: 73 },
  { id: 1, x: 122, y: 42 },
  { id: 2, x: 185, y: 82 },
  { id: 3, x: 262, y: 66 },
  { id: 4, x: 365, y: 79 },
  { id: 5, x: 469, y: 49 },
  { id: 6, x: 522, y: 96 },
  { id: 7, x: 602, y: 65 },
  { id: 8, x: 694, y: 53 },
  { id: 9, x: 103, y: 172 },
  { id: 10, x: 212, y: 135 },
  { id: 11, x: 286, y: 155 },
  { id: 12, x: 361, y: 126 },
  { id: 13, x: 452, y: 137 },
  { id: 14, x: 545, y: 182 },
  { id: 15, x: 621, y: 140 },
  { id: 16, x: 729, y: 195 },
  { id: 17, x: 740, y: 134 },
  { id: 18, x: 65, y: 226 },
  { id: 19, x: 129, y: 262 },
  { id: 20, x: 202, y: 271 },
  { id: 21, x: 321, y: 240 },
  { id: 22, x: 388, y: 284 },
  { id: 23, x: 442, y: 275 },
  { id: 24, x: 553, y: 278 },
  { id: 25, x: 658, y: 285 },
  { id: 26, x: 712, y: 270 },
  { id: 27, x: 76, y: 331 },
  { id: 28, x: 126, y: 325 },
  { id: 29, x: 218, y: 382 },
  { id: 30, x: 294, y: 340 },
  { id: 31, x: 402, y: 369 },
  { id: 32, x: 463, y: 321 },
  { id: 33, x: 580, y: 325 },
  { id: 34, x: 649, y: 384 },
  { id: 35, x: 729, y: 370 },
  { id: 36, x: 60, y: 479 },
  { id: 37, x: 116, y: 424 },
  { id: 38, x: 188, y: 481 },
  { id: 39, x: 297, y: 450 },
  { id: 40, x: 350, y: 425 },
  { id: 41, x: 427, y: 475 },
  { id: 42, x: 492, y: 414 },
  { id: 43, x: 604, y: 433 },
  { id: 44, x: 716, y: 469 },
  { id: 45, x: 70, y: 581 },
  { id: 46, x: 120, y: 536 },
  { id: 47, x: 209, y: 540 },
  { id: 48, x: 282, y: 537 },
  { id: 49, x: 396, y: 540 },
  { id: 50, x: 480, y: 550 },
  { id: 51, x: 544, y: 551 },
  { id: 52, x: 664, y: 522 },
  { id: 53, x: 765, y: 571 },
];
const edges = [
  { from: 0, to: 1, weight: 10 },
  { from: 0, to: 9, weight: 10 },
  { from: 1, to: 2, weight: 9 },
  { from: 1, to: 10, weight: 8 },
  { from: 2, to: 3, weight: 10 },
  { from: 2, to: 11, weight: 9 },
  { from: 3, to: 4, weight: 9 },
  { from: 3, to: 12, weight: 10 },
  { from: 4, to: 5, weight: 10 },
  { from: 4, to: 13, weight: 9 },
  { from: 5, to: 6, weight: 8 },
  { from: 5, to: 14, weight: 9 },
  { from: 6, to: 7, weight: 10 },
  { from: 6, to: 15, weight: 8 },
  { from: 7, to: 8, weight: 9 },
  { from: 7, to: 16, weight: 8 },
  { from: 8, to: 17, weight: 8 },
  { from: 9, to: 10, weight: 8 },
  { from: 9, to: 18, weight: 10 },
  { from: 10, to: 11, weight: 10 },
  { from: 10, to: 19, weight: 8 },
  { from: 11, to: 12, weight: 8 },
  { from: 11, to: 20, weight: 9 },
  { from: 12, to: 13, weight: 9 },
  { from: 12, to: 21, weight: 8 },
  { from: 13, to: 14, weight: 10 },
  { from: 13, to: 22, weight: 8 },
  { from: 14, to: 15, weight: 9 },
  { from: 14, to: 23, weight: 10 },
  { from: 15, to: 16, weight: 9 },
  { from: 15, to: 24, weight: 8 },
  { from: 16, to: 17, weight: 10 },
  { from: 16, to: 25, weight: 10 },
  { from: 17, to: 26, weight: 9 },
  { from: 18, to: 19, weight: 10 },
  { from: 18, to: 27, weight: 10 },
  { from: 19, to: 20, weight: 8 },
  { from: 19, to: 28, weight: 10 },
  { from: 20, to: 21, weight: 10 },
  { from: 20, to: 29, weight: 10 },
  { from: 21, to: 22, weight: 8 },
  { from: 21, to: 30, weight: 10 },
  { from: 22, to: 23, weight: 10 },
  { from: 22, to: 31, weight: 9 },
  { from: 23, to: 24, weight: 10 },
  { from: 23, to: 32, weight: 9 },
  { from: 24, to: 25, weight: 8 },
  { from: 24, to: 33, weight: 10 },
  { from: 25, to: 26, weight: 10 },
  { from: 25, to: 34, weight: 10 },
  { from: 26, to: 35, weight: 8 },
  { from: 27, to: 28, weight: 10 },
  { from: 27, to: 36, weight: 10 },
  { from: 28, to: 29, weight: 8 },
  { from: 28, to: 37, weight: 10 },
  { from: 29, to: 30, weight: 8 },
  { from: 29, to: 38, weight: 8 },
  { from: 30, to: 31, weight: 9 },
  { from: 30, to: 39, weight: 8 },
  { from: 31, to: 32, weight: 8 },
  { from: 31, to: 40, weight: 8 },
  { from: 32, to: 33, weight: 8 },
  { from: 32, to: 41, weight: 8 },
  { from: 33, to: 34, weight: 9 },
  { from: 33, to: 42, weight: 9 },
  { from: 34, to: 35, weight: 9 },
  { from: 34, to: 43, weight: 8 },
  { from: 35, to: 44, weight: 9 },
  { from: 36, to: 37, weight: 8 },
  { from: 36, to: 45, weight: 9 },
  { from: 37, to: 38, weight: 8 },
  { from: 37, to: 46, weight: 9 },
  { from: 38, to: 39, weight: 10 },
  { from: 38, to: 47, weight: 10 },
  { from: 39, to: 40, weight: 9 },
  { from: 39, to: 48, weight: 10 },
  { from: 40, to: 41, weight: 10 },
  { from: 40, to: 49, weight: 10 },
  { from: 41, to: 42, weight: 8 },
  { from: 41, to: 50, weight: 10 },
  { from: 42, to: 43, weight: 9 },
  { from: 42, to: 51, weight: 9 },
  { from: 43, to: 44, weight: 10 },
  { from: 43, to: 52, weight: 10 },
  { from: 44, to: 53, weight: 10 },
  { from: 45, to: 46, weight: 8 },
  { from: 46, to: 47, weight: 8 },
  { from: 47, to: 48, weight: 9 },
  { from: 48, to: 49, weight: 10 },
  { from: 49, to: 50, weight: 8 },
  { from: 50, to: 51, weight: 8 },
  { from: 51, to: 52, weight: 10 },
  { from: 52, to: 53, weight: 9 },
];

// Variables para manejo de ruta y memoización
let startNode = null;
let prevStartNode = null;
let endNode = null;
let distances = [];
let previousNodes = [];
let visitedEdges = new Set();
let isAnimating = false;
let delay = 50;

function drawGraph() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  edges.forEach((edge) => {
    const from = nodes[edge.from];
    const to = nodes[edge.to];
    ctx.strokeStyle = visitedEdges.has(`${edge.from}-${edge.to}`)
      ? "rgba(255,0,0,0.9)"
      : "rgba(255,0,0,0.3)";
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
    ctx.fill();
    ctx.fillStyle = "rgba(255,255,255,0.7)";
    ctx.fillText(
      edge.weight,
      from.x + (to.x - from.x) / 2,
      from.y + (to.y - from.y) / 2
    );
  });

  nodes.forEach((node) => {
    ctx.fillStyle =
      node.id === startNode ? "green" : node.id === endNode ? "red" : "black";
    ctx.beginPath();
    ctx.arc(node.x, node.y, NODE_RADIUS, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "white";
    ctx.fillText(node.id, node.x - 3, node.y + 3);
  });
}

// Algoritmo de Dijkstra con animación paso a paso usando setTimeout
function dijkstra(start, end, callback) {
  // Si el inicio es igual al enterior calculado devuelve directamente la respuesta
  if (
    start === prevStartNode &&
    previousNodes.length > 0 &&
    previousNodes[end] !== null
  ) {
    callback();
    return;
  }

  visitedEdges.clear();
  distances = Array(nodes.length).fill(Infinity);
  previousNodes = Array(nodes.length).fill(null);
  distances[start] = 0;
  const priorityQueue = new Set(Array.from(nodes.keys()));

  function step() {
    if (priorityQueue.size === 0) {
      callback(); // Finalizar cuando se haya procesado todo
      return;
    }

    let current = [...priorityQueue].reduce((minNode, node) => {
      return distances[node] < distances[minNode] ? node : minNode;
    });

    priorityQueue.delete(current);

    if (current === end) {
      callback(); // Finaliza la animación
      return;
    }

    edges.forEach((edge) => {
      if (edge.from === current && priorityQueue.has(edge.to)) {
        const alt = distances[current] + edge.weight;
        if (alt < distances[edge.to]) {
          distances[edge.to] = alt;
          previousNodes[edge.to] = current;
        }
        visitedEdges.add(`${edge.from}-${edge.to}`);
      }
      if (edge.to === current && priorityQueue.has(edge.from)) {
        // Permitir cálculo en ambas direcciones
        const alt = distances[current] + edge.weight;
        if (alt < distances[edge.from]) {
          distances[edge.from] = alt;
          previousNodes[edge.from] = current;
        }
        visitedEdges.add(`${edge.from}-${edge.to}`);
      }
    });

    drawGraph();

    // Llamada recursiva con un retraso controlado
    setTimeout(step, delay);
  }

  step();
  prevStartNode = start;
}

// Trazar la ruta óptima encontrada
function tracePath(end) {
  console.log(previousNodes);
  let path = [];
  let current = end;
  while (current !== null) {
    path.push(current);
    current = previousNodes[current];
  }
  path.reverse();

  for (let i = 0; i < path.length - 1; i++) {
    let from = nodes[path[i]];
    let to = nodes[path[i + 1]];
    ctx.strokeStyle = "rgba(0, 212, 255, 1)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }
}

// Iniciar cálculo de la ruta
function findPath() {
  isAnimating = true;
  dijkstra(startNode, endNode, () => {
    tracePath(endNode);
    isAnimating = false;
  });
}

start.addEventListener("click", () => {
  if (isAnimating || isSettingEnd) return;
  start.style.backgroundColor = "white";
  isSettingStart = true;
});

end.addEventListener("click", () => {
  if (isAnimating || isSettingStart) return;
  end.style.backgroundColor = "white";
  isSettingEnd = true;
});

// Detectar clic en nodos y cambiar puntos de inicio/fin
canvas.addEventListener("click", (event) => {
  const rect = canvas.getBoundingClientRect();
  const clickX = event.clientX - rect.left;
  const clickY = event.clientY - rect.top;

  // Verifica si el clic está dentro del radio de algún nodo
  nodes.forEach((node) => {
    const distance = Math.sqrt((clickX - node.x) ** 2 + (clickY - node.y) ** 2);
    if (distance <= NODE_RADIUS) {
      if (isSettingStart) {
        startNode = node.id;
        drawGraph();
        start.style.backgroundColor = "";
        isSettingStart = false;
      }

      if (isSettingEnd) {
        endNode = node.id;
        drawGraph();
        end.style.backgroundColor = "";
        isSettingEnd = false;
      }

      if (startNode !== null && endNode !== null) findPath();
    }
  });
});

drawGraph();
