let fragment = new DocumentFragment();

// header "Login Form"
let header = document.createElement('H2');
let headerText = document.createTextNode("Chat Messages");
header.appendChild(headerText);
fragment.appendChild(header);

// Chat Form
let chatForm = document.createElement('FORM');

let logDiv = document.createElement('DIV');
logDiv.className = "container";
// Message field
let inputLabel = document.createElement('LABEL');
let inputText = document.createTextNode("Message");
inputLabel.setAttribute("for", "inputMess");
inputLabel.appendChild(inputText);
logDiv.appendChild(inputLabel);

let inputMess = document.createElement("INPUT");
inputMess.setAttribute("type", "text");
inputMess.setAttribute("placeholder", "Enter Message");
inputMess.setAttribute("name", "inputMess");
inputMess.setAttribute("required", "X");
inputMess.id = "inputMess";
inputMess.className = "inputMess";
logDiv.appendChild(inputMess);

// Send button
let sendButton = document.createElement('BUTTON');
sendButton.setAttribute("type", "button");
sendButton.setAttribute("name","send");
// sendButton.setAttribute("onclick","onClick()");
sendButton.id = "sendMsg";
//sendButton.className = "sendMsg";

let sendBtnText = document.createTextNode("Send");
sendButton.appendChild(sendBtnText);
logDiv.appendChild(sendButton);

chatForm.appendChild(logDiv);
fragment.appendChild(chatForm);

// Messages
let messageDiv = document.createElement('DIV');
messageDiv.className = "messages";
messageDiv.id = "messageID";
fragment.appendChild(messageDiv);

document.body.append(fragment);



