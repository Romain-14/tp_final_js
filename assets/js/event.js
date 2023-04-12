function toggleElement(el){    
    if (el.style.display === "none")
        el.style.display = "flex"
    else el.style.display = "none";
}

export { toggleElement };