export const runDijkstra = (startNode, endNode, graph) => {
  let distances = {};
  let prev = {};
  let pq = new Set(Object.keys(graph));

  Object.keys(graph).forEach((node) => {
    distances[node] = Infinity;
    prev[node] = null;
  });
  distances[startNode] = 0;

  while (pq.size > 0) {
    let currNode = [...pq].reduce((minNode, node) =>
      distances[node] < distances[minNode] ? node : minNode,
    );

    if (currNode === endNode || distances[currNode] === Infinity) break;
    pq.delete(currNode);

    for (let neighbor in graph[currNode]) {
      let alt = distances[currNode] + graph[currNode][neighbor];
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        prev[neighbor] = currNode;
      }
    }
  }

  let path = [];
  for (let at = endNode; at !== null; at = prev[at]) path.push(at);
  return path.reverse();
};
