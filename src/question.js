export function getFetch(question) {
  return fetch(
    "https://podcast-4d8ad-default-rtdb.firebaseio.com/question.json",
    {
      method: "POST", // или 'PUT'
      body: JSON.stringify(question), // данные могут быть 'строкой' или {объектом}!
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      question.id = res.name;
      return question;
    })
    .then(addToLoacalStorage)
    .then(renderList)
}

export function renderList() {
  const questions = getQuestionFromLocalStorage();

  const html = questions.length
    ? questions.map(toCard).join("")
    : `<div class="mui--text-headline">Вы пока ничего не спрашивали</div>`;

  const list = document.getElementById("list");
  list.innerHTML = html;
}

function toCard(question) {
  return `
	<div class="mui--text-black-54">
		${new Date(question.date).toLocaleDateString()}
		${new Date(question.date).toLocaleTimeString()}
	</div>
	<div>${question.text}</div>
	</br>
	`;
}

function addToLoacalStorage(question) {
  const all = getQuestionFromLocalStorage();
  all.push(question);
  localStorage.setItem("questions", JSON.stringify(all));
}

function getQuestionFromLocalStorage() {
  return JSON.parse(localStorage.getItem("questions") || "[]");
}
