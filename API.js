// const BASE_URL = "https://the-one-api.dev/v2";
// const END_POINT = "/character";
// const KEY = "22ykK7YCQ2YlFzE2keCs";

// function getCharacter() {
// 	const param = new URLSearchParams({
// 		limit: 30,
// 		page: 1,
// 	});

// 	const option = {
//     //запит на авторизацыю
//     method: "GET",
//     // на headers робимо авторизацію.. оскільки тільки ми фізично на компі маємо доступ до headers
// 		headers: {
//       Authorization: `Bearer ${KEY}`,
//       // якщо потрыбно щось створити method: POST, body:...
// 		},
// 	};

// 	return fetch(`${BASE_URL}${END_POINT}?${param}`, option).then((response) =>
// 		console.log(response)
// 	);
// }
// getCharacter();

// let options = {
// 	// ми слідкуємо за всім екраном, а не його частиною
// 	root: null,
// 	rootMargin: "200px",
// 	threshold: 1.0,
// };

// let observer = new IntersectionObserver(callback, options);
// function callback(evt) {
// 	console.log(evt);
// }

// const BASE_URL = "https://api.themoviedb.org/3/";
// const END_POINT = "trending/movie/day";
// const list = document.querySelector(".js-list");
// const API_KEY = "345007f9ab440e5b86cef51be6397df1";
// const loadMore = document.querySelector(".js-load");
// let currentPage = 1;

// // створюємо div за яким ми будемо слідкувати
// const target = document.querySelector(".js-guard");

// loadMore.addEventListener("click", onLoad);

// function onLoad() {
// 	currentPage += 1;
// 	getTrending(currentPage)
// 		.then((data) => {
// 			list.insertAdjacentHTML("beforeend", createMarkup(data.results));
// 			//якщо ми на останній сторінці кнопки нема
// 			if (data.page === data.total_pages) {
// 				loadMore.hidden = true;
// 			}
// 		})
// 		.catch((err) => console.log(err));
// }

// function getTrending(page = 1) {
// 	return fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}&page=${page}`).then(
// 		(response) => {
// 			if (!response.ok) {
// 				throw new Error(rersp.statusText);
// 			}
// 			return response.json();
// 		}
// 	);
// }

// getTrending()
// 	.then((data) => {
// 		list.insertAdjacentHTML("beforeend", createMarkup(data.results));
// 		//викликаємо метод, спостерігач спостерігай
// 		observer.observe(target);
// 		// loadMore працює після того як відмальована вже перша сторінка
// 		if (data.page !== data.total_pages) {
// 			loadMore.hidden = false;
// 		}
// 	})

// 	.catch((err) => console.log(err));

// function createMarkup(arr) {
// 	return arr
// 		.map(
// 			({ poster_path, title }) => `   <li>
//         <img src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title}">
//         <h2>${title}</h2>
//       </li>`
// 		)
// 		.join("");
// }

const target = document.querySelector(".js-guard");

const BASE_URL = "https://api.themoviedb.org/3/";
const END_POINT = "trending/movie/day";
const API_KEY = "345007f9ab440e5b86cef51be6397df1";
const list = document.querySelector(".js-list");

let currentPage = 1;
let options = {
	root: null,
	rootMargin: "300px",
	threshold: 1.0,
};

let observer = new IntersectionObserver(onLoad, options);
function onLoad(entries, observer) {
	console.log(entries);
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			currentPage += 1;
			getTrending(currentPage)
				.then((data) => {
					list.insertAdjacentHTML("beforeend", createMarkup(data.results));
					// лише після того,як ми намалювали розмітку ми додаємо прослуховувача подій
					//викликаємо метод, спостерігач спостерігай
					if (data.page === data.total_pages) {
						observer.unobserve(target);
					}
				})
				.catch((err) => console.log(err));
		}
	});
}

function createMarkup(arr) {
	return arr
		.map(
			({ poster_path, title }) => `   <li>
        <img src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title}">
        <h2>${title}</h2>
      </li>`
		)
		.join("");
}

function getTrending(page = 1) {
	return fetch(`${BASE_URL}${END_POINT}?api_key=${API_KEY}&page=${page}`).then(
		(response) => {
			if (!response.ok) {
				throw new Error(response.statusText);
			}
			return response.json();
		}
	);
}

getTrending()
	.then((data) => {
		list.insertAdjacentHTML("beforeend", createMarkup(data.results));
		observer.observe(target);
	})
	.catch((err) => console.log(err));
