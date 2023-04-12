import { datas } from "../../data/index.js";
import { section, URL_IMG} from "./const.js";
import { toggleElement } from "./event.js";
import { domHandler } from "./utils.js";

function injectToDOM(){    
    addTitleToSection();
    addMenuToSection();
}

function addTitleToSection(){
    // création d'un h2 à la section
    domHandler(`${section}`, "h2");
    // création d'un span au h2 + contenu hors span
    domHandler(`${section} h2`, "span").append(datas.section.title[1]);
    // contenu dans le span qui va bénéficier de la class CSS qq lignes plus bas !
    domHandler(`${section} h2 span`).append(datas.section.title[0]);
    // ajout de la classe CSS au span
    domHandler(`${section} h2 span`).classList.add("secondary-color");
}

function addMenuToSection(){
    // convertis la propriété section en objet itérable sur les "values" et retourne (méthode filter) uniquement les propriétés la "value" n'est pas un tableau, dans notre cas ici ce sont les "menus"    
    const menus = Object.values(datas.section).filter(v => !Array.isArray(v));

    menus.forEach((m, i) => {
        console.log(i)
        // création d'un article pour ce menu
        domHandler(`${section}`, "article");
        // récupération de cet article
        const article = `${section} article:nth-child(${i + 2})`;
        
        // création élément titre et image du menu
        domHandler(article, "h3", "img");

        // contenu titre
        domHandler(`${article} h3`).append(document.createElement("i"), m.title, document.createElement("i"));        
        domHandler(`${article} h3 i:nth-child(1)`).classList.add("fa-solid", "fa-droplet");
        domHandler(`${article} h3 i:nth-child(2)`).classList.add("fa-solid", "fa-droplet");

        //contenu image
        domHandler(`${article} img`).src = URL_IMG + m.img.src;
        domHandler(`${article} img`).alt = m.img.alt;    

        // création paragraphes + leur contenu
        m.para.forEach((p, i) => {            
            domHandler(article, "p");
            domHandler(`${article} p:nth-child(${i + 3})`)
                .textContent = `${ p["p"+(i + 1)]}`;
        });

        // création élément + contenu du "bouton"(<a>) read more
        domHandler(article, "a");
        domHandler(`${article} a`).href = "#";
        domHandler(`${article} a`).append(m.a, document.createElement("i"));
        domHandler(`${article} a i`).classList.add("fa-solid", "fa-circle-plus");
        domHandler(`${article} a i`).setAttribute("aria-hidden", "true");
    });    
}

document.addEventListener("DOMContentLoaded", function (){
    injectToDOM();
    
    domHandler("#btn-section") // document.querySelector(#btn-section)
        .addEventListener("click", () => toggleElement(domHandler(section)));    
    domHandler("#btn-aside")
        .addEventListener("click", () => toggleElement(domHandler("aside")));
});