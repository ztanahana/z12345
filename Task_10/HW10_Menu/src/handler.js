import dataMenu from './data.json';
let menuArea = document.getElementById('menu-list');
let active = document.querySelector(".hover");

menuArea.addEventListener("keydown", function(event) {
    let ind;
    active.classList.remove("hover");

    switch (event.which){ 
    case 37:
        if ((Number(active.id) - 1) <= 0){
            ind = dataMenu.id.length;
        } else {
            ind = Number(active.id) - 1;
        }
        active = document.getElementById(ind);
        break;
    case 39:
        if (Number(active.id) >= dataMenu.id.length){
            ind = 1;
        } else {
            ind = Number(active.id) + 1;
        }        
        active = document.getElementById(ind);
        break;  
    default:
      //  active = event.target;
    }
    active.classList.add("hover");
})
