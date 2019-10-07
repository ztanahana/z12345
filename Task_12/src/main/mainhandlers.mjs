let sendButton = document.getElementById("sendMsg");
let uname;

if (localStorage.getItem('unameTemp')){
  uname = localStorage.getItem('unameTemp');
} else{
  uname = localStorage.getItem('uname');
}

connect();

function connect(){
  let socket = new WebSocket('ws://st-chat.shas.tel');
  socket.onopen = function(e) {
  /* document.body.innerHTML = "";
  let js = document.createElement("script");
  js.type = "text/javascript";
  js.src = '../main/mainview.js';
  document.body.appendChild(js); */
  // content.innerHTML = page.render();  
  };
  
  socket.onmessage = function(event) {
    let messageDiv = document.getElementById("messageID");
    let msg = JSON.parse(event.data);
    
    for (let i = 0; i < msg.length; i++) {
      let time = new Date(msg[i].time);
      let timeStr = time.toLocaleTimeString();
      let msgStr = msg[i].from + '[' + timeStr + ']:' + msg[i].message + '<br>';
      messageDiv.innerHTML += msgStr;
    }
  
    notifyMe();
    // console.log(`[message] Данные получены с сервера: ${event.data}`);
  };
  
  socket.onclose = function(event) {
    if (event.wasClean) {
      window.alert(`[close] Соединение закрыто чисто, код=${event.code} причина=${event.reason}`);
    } else {
      // например, сервер убил процесс или сеть недоступна
      // обычно в этом случае event.code 1006
      window.alert("[close]  Socket is closed. Reconnect will be attempted in 1 second");
    }
  
    setTimeout(function() {
      connect();
    }, 1000);
  };
  
  socket.onerror = event => window.alert(`[error] ${error.message}`);

// Send text to all users through the server
  sendButton.addEventListener('click', {
    handleEvent() {
      
      if (document.getElementById("inputMess").value === ""){
        window.alert("Please enter the message");
      } else{
        // Construct a msg object containing the data the server needs to process the message from the chat client.        
        let msg = {
          from: uname,
          message: document.getElementById("inputMess").value
        };

        // Send the msg object as a JSON-formatted string.
        socket.send(JSON.stringify(msg));

        // Blank the text input element, ready to receive the next line of text from the user.
        document.getElementById("inputMess").value = "";
      }

    }
  });  
}
     
  /* export const initws = () => {    
    return socket;
  } */

  function notifyMe() {
    // Проверка поддержки браузером уведомлений
    if (!("Notification" in window)) {
      alert("This browser does not support desktop notification");
    }
  
    // Проверка разрешения на отправку уведомлений
    else if (Notification.permission === "granted") {
      // Если разрешено, то создаем уведомление
      let notification = new Notification("You have unread messages!");
    }
  
    // В противном случае, запрашиваем разрешение
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        // Если пользователь разрешил, то создаем уведомление 
        if (permission === "granted") {
          let notification = new Notification("You have unread messages!");
        }
      });
    }
  }
