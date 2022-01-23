import "./app.css";

const form = document.querySelector("#form");
const input = form.querySelector('#input')

form.addEventListener('submit', formHandler)

function formHandler(event){
	event.preventDefault()

	console.log(input.value);
	input.value = ''
}
