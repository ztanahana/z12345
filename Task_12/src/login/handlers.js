import {loginButton, remChBx, uname} from "./loginview.js";

loginButton.addEventListener('click', {
    handleEvent() {
      
      if (remChBx.checked === true)
      {
        localStorage.setItem('uname', uname.value);
        localStorage.setItem('unameTemp', "");
      } else{
        localStorage.setItem('unameTemp', uname.value);
      }
      
      window.location.href = '../main/main.html'; 
    }
  });
  

  