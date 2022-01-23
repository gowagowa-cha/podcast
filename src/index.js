import "./app.css";
import axios from "axios";

import { getFetch, renderList } from "./question";
import { isValid } from "./utils";

const form = document.querySelector("#form");
const input = form.querySelector("#input");
const submitBtn = form.querySelector("#submit");
const modal = document.querySelector('#modal')

window.addEventListener("load", renderList);
modal.addEventListener('click', openModal)
form.addEventListener("submit", formHandler);
input.addEventListener("input", () => {
  submitBtn.disabled = !isValid(input.value);
});

function formHandler(event) {
  event.preventDefault();

  if (isValid(input.value)) {
    const question = {
      text: input.value.trim(),
      date: new Date().toJSON(),
    };

    submitBtn.disabled = true;
    //Async to server
    getFetch(question).then(() => {
      input.value = "";
      input.className = "";
      submitBtn.disabled = false;
    });
  }
}


function openModal(params) {
	
}
