let fragment = new DocumentFragment();

// header "Login Form"
let header = document.createElement('H2');
let headerText = document.createTextNode("Login Form");
header.appendChild(headerText);
fragment.appendChild(header);

// Login Form
let loginForm = document.createElement('FORM');
loginForm.className = 'login';
/* loginForm.setAttribute("action", "/mainview.js");
loginForm.setAttribute("method", "post"); */

// Avatar Image
let imgDiv = document.createElement('div');
imgDiv.className = "imgcontainer";
let imgAv = document.createElement('IMG');
imgAv.setAttribute("src","../img/Pic1.jpg");
imgAv.setAttribute("class","avatar");
imgDiv.appendChild(imgAv);
loginForm.appendChild(imgDiv);

let logDiv = document.createElement('div');
logDiv.className = "container";
// Login field
let unameLabel = document.createElement('LABEL');
let unameText = document.createTextNode("Username");
unameLabel.setAttribute("for", "uname");
unameLabel.appendChild(unameText);
logDiv.appendChild(unameLabel);

let uname = document.createElement("INPUT");
uname.setAttribute("type", "text");
uname.setAttribute("placeholder", "Enter Username");
uname.setAttribute("required", "X");
uname.setAttribute("name", "uname");
let unameVal = localStorage.getItem('uname')
if (unameVal) {
    uname.setAttribute("value", unameVal); // read from local storage
}
logDiv.appendChild(uname);

// Login button
let loginButton = document.createElement('BUTTON');
loginButton.setAttribute("type", "button");
loginButton.setAttribute("name","login");

let logBtnText = document.createTextNode("Log in");
loginButton.appendChild(logBtnText);
logDiv.appendChild(loginButton);

// checkbox Remember me
let remChBx = document.createElement('INPUT');
remChBx.setAttribute("type", "checkbox");
remChBx.setAttribute("name","remember");
remChBx.setAttribute("checked","checked");
logDiv.appendChild(remChBx); 

let chBxLabel = document.createElement('LABEL');
let chBxText = document.createTextNode("Remember me");
chBxLabel.setAttribute("for", "remember");
chBxLabel.appendChild(chBxText);
logDiv.appendChild(chBxLabel);

loginForm.appendChild(logDiv);
fragment.appendChild(loginForm);
document.body.append(fragment);

export {loginButton, remChBx, uname};
