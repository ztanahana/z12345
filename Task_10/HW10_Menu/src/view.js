import dataMenu from './data.json';

let ul = document.createElement('ul');
ul.id = "menu-list";
document.body.append(ul);

for (let i = 0; i < dataMenu.id.length; i++){
    let li = document.createElement('li');

    let a = document.createElement('a');
    a.href = "#" + i;   
    a.id = i + 1;
    if ( i == 0 ) {
        a.classList = "hover";
    } 
    a.appendChild(document.createTextNode(dataMenu.id[i]));
    li.appendChild(a);
    ul.appendChild(li);
}


