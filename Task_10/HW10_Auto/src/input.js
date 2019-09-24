import { createAutoComplete } from './autocomplete';
import cities from './cities.json';

const autocomplete = createAutoComplete(cities);
let inputArea = document.getElementById('inputS');
let resultString = document.getElementById('result-string');

inputArea.oninput = function() {
    resultString.innerHTML = autocomplete(inputArea.value);
  };
