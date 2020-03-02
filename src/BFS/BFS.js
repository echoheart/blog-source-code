function BFS(tree) {
    const queue = [];
    const nodeList = [];
    if (tree) {
        queue.push(tree);
        while(queue.length > 0) {
            const item = queue.shift();
            nodeList.push(item);
            const children = item.children;
            for(let i = 0;i < children.length; i++) {
                queue.push(children[i]);
            }
        }
    }
    return nodeList;
}