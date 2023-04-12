// le second paramètre est un "rest parameter", ce paramètre prends tout le "reste" des paramètres lors de l'invocation de cette fonction et les mets dans un tableau
function domHandler(elNode, ...nodeToCreate){ // --> ex: ("section", ["h3", "img", "p"])
    const domEL = document.querySelector(elNode);
    if(nodeToCreate.length){
        for (const node of nodeToCreate) {
            domEL.append(document.createElement(node));
        }
    }
    return domEL;
}

export { domHandler };