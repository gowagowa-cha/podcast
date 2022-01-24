export class Question {
  static getFetch(question) {
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
      .then(renderList);
  }

  static renderList() {
    const questions = getQuestionFromLocalStorage();

    const html = questions.length
      ? questions.map(toCard).join("")
      : `<div class="mui--text-headline">Вы пока ничего не спрашивали</div>`;

    const list = document.getElementById("list");
    list.innerHTML = html;
  }

  static fetch(token) {
		return fetch('https://podcast-4d8ad-default-rtdb.firebaseio.com/question.json')
		.then(res => res.json())
		.then(question => {
			console.log('question', question);
		})
    // if (!token) {
    //   return Promise.resolve('<p class="error">У вас нет токена</p>');
    // }
    // return fetch(
      // `https://podcast-4d8ad-default-rtdb.firebaseio.com/question.json?auth/${token}`
    // )
      // .then((res) => res.json())
      // .then((question) => {
      //   if (question.error) {
      //     return `<p class="error">${question.error}</p>`;
      //   }
      //   return res
      //     ? Object.keys(res).map((key) => ({
      //         ...res[key],
      //         id: key,
      //       }))
      //     : [];
      // });
  }
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
