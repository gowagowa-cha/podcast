import "./app.scss";
import { authWithEmailAndPassword, getAuthForm } from "./auth";
import { Question } from "./question";
import { createModal, isValid } from "./utils";

const form = document.querySelector("#form");
const input = form.querySelector("#input");
const submitBtn = form.querySelector("#submit");
const modal = document.querySelector("#modal");

window.addEventListener("load", Question.renderList);
modal.addEventListener("click", openModal);
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
    Question.getFetch(question).then(() => {
      input.value = "";
      input.className = "";
      submitBtn.disabled = false;
    });
  }
}

function openModal() {
  createModal("Авторизация", getAuthForm());
  document
    .querySelector("#auth-form")
    .addEventListener("submit", authFormHandler, { once: true });

  function authFormHandler(e) {
    e.preventDefault();

    const inputEmail = e.target.querySelector("#email").value;
    const inputPassword = e.target.querySelector("#password").value;

    authWithEmailAndPassword(inputEmail, inputPassword).then(Question.fetch)
  }
}

function renderModalAfterAuth(content) {}
