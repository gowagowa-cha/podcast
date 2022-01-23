import "./app.css";
import { isValid } from "./utils";

const form = document.querySelector("#form");
const input = form.querySelector("#input");
const submitBtn = form.querySelector("#submit");

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
    console.log(question);

    input.value = "";
    input.className = "";
    submitBtn.disabled = false;
  }
}
