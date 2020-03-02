/**
 * 递归
 */

function DFS(Btree, nodeList = []) {
    if (Btree !== null) {
        nodeList.push(Btree);
        const children = Btree.children;
        for (let i = 0; i < children.length; i++) {
            DFS(children[i], nodeList)
        }
    }
    return nodeList;
}


/**
 * 非递归
 */

 function _DFS(Btree) {
    const stack = [];
    const nodeList = [];
    if (Btree) {
        stack.push(Btree);
        while(stack.length > 0) {
            const item = stack.pop();
            nodeList.push(item);
            const children = item.children;
            for (let i =0; i < children.length; i++) {
                stack.push(children[i]);
            }
        }
    }
 }