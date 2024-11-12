const nodes = [];
const edges = [];
const numRows = 6;
const numCols = 9;
const nodeRadius = 10;

// Crear nodos en una malla 10x10

for (let i = 0; i < numRows; i++) {
  let x = 0;
  let maxY = nodes.reduce((max, node) => Math.max(max, node.y), 0);
  for (let j = 0; j < numCols; j++) {
    x += Math.floor(Math.random() * (120 - 50 + 1)) + 50;
    y = maxY + Math.floor(Math.random() * (100 - 30 + 1)) + 30;
    nodes.push({
      id: i * numCols + j,
      x,
      y,
    });
  }
}

// Crear aristas entre nodos adyacentes
for (let i = 0; i < numRows; i++) {
  for (let j = 0; j < numCols; j++) {
    const currentNode = i * numCols + j;

    // Conectar horizontalmente (nodo actual con el nodo a la derecha)
    if (j < numCols - 1) {
      const rightNode = currentNode + 1;
      edges.push({
        from: currentNode,
        to: rightNode,
        weight: Math.floor(Math.random() * (10 - 8 + 1)) + 8, // Peso aleatorio entre 8 y 10
      });
    }

    // Conectar verticalmente (nodo actual con el nodo de abajo)
    if (i < numRows - 1) {
      const downNode = currentNode + numCols;
      edges.push({
        from: currentNode,
        to: downNode,
        weight: Math.floor(Math.random() * (10 - 8 + 1)) + 8, // Peso aleatorio entre 8 y 10
      });
    }
  }
}

console.log(nodes);
console.log(edges);
