// Search
let head1 = document.createElement("H1");
let text1 = document.createTextNode("Search");
head1.appendChild(text1);
document.body.appendChild(head1);

// Input field
let inputSearch = document.createElement("input");
inputSearch.className = "input-search";
inputSearch.placeholder = "name";
inputSearch.id = "inputS";
document.body.appendChild(inputSearch);

// Result
let head2 = document.createElement("H4");
let text2 = document.createTextNode("Result");
head2.appendChild(text2);
document.body.appendChild(head2); 

// Result table
let resultString = document.createElement("div");
resultString.id = "result-string";
resultString.innerHTML = "";
document.body.appendChild(resultString);