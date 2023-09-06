const target = document.querySelector(".js-guard");
const BASE_URL = "https://api.themoviedb.org/3/";
const ENDPOINT = "trending/movie/day";
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
			({ poster_path, title }) => `<li>
    <img src="https://image.tmdb.org/t/p/w400${poster_path}" alt="${title}">
    <h2>${title}</h2>
</li>`
		)
		.join("");
}

function getTrending(page = 1) {
	return fetch(`${BASE_URL}${ENDPOINT}?api_key=${API_KEY}&page=${page}`).then(
		(resp) => {
			if (!resp.ok) {
				throw new Error(resp.statusText);
			}

			return resp.json();
		}
	);
}
getTrending()
	.then((data) => {
		list.insertAdjacentHTML("beforeend", createMarkup(data.results));
		observer.observe(target);
	})
	.catch((err) => console.log(err));
