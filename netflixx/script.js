const api = "e4b44dbd00bbb9caf83e34d991abbf70";
const base_url = "https://api.themoviedb.org/3";
const banner_url = "https://image.tmdb.org/t/p/original";
const img_url = "https://image.tmdb.org/t/p/w500";

const requests = {
    fetchTrending: `${base_url}/trending/all/week?api_key=${api}&language=en-US`,
    fetchNetflixOriginals: `${base_url}/discover/tv?api_key=${api}&with_network=213`,
    fetchActionMovies: `${base_url}/discover/movie?api_key=${api}&with_genres=28`,
    fetchComedyMovies: `${base_url}/discover/movie?api_key=${api}&with_genres=35`,
    fetchHorrorMovies: `${base_url}/discover/movie?api_key=${api}&with_genres=27`,
    fetchRomanceMovies: `${base_url}/discover/movie?api_key=${api}&with_genres=10749`,
    fetchDocumentaries: `${base_url}/discover/movie?api_key=${api}&with_genres=99`,
};

// Function to truncate text
function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
}

// Function to create movie rows dynamically
function createMovieRow(titleText, movies, isNetflixOriginals = false) {
    const headrow = document.getElementById("headrow");
    const row = document.createElement("div");
    row.className = "row netflixrow";

    // Create and append the title
    const title = document.createElement("h2");
    title.className = "row_title";
    title.innerText = titleText;
    row.appendChild(title);

    // Create and append the posters
    const row_posters = document.createElement("div");
    row_posters.className = "row_posters";
    row.appendChild(row_posters);

    movies.forEach((movie) => {
        const poster = document.createElement("img");
        poster.className = isNetflixOriginals ? "row__posterLarge" : "row_poster";
        poster.src = img_url + movie.poster_path;
        row_posters.appendChild(poster);
    });

    headrow.appendChild(row);
}

// Fetch Netflix Originals and populate banner
fetch(requests.fetchNetflixOriginals)
    .then(res => res.json())
    .then(data => {
        const setMovie = data.results[Math.floor(Math.random() * data.results.length)];
        document.getElementById("banner").style.backgroundImage = `url(${banner_url}${setMovie.backdrop_path})`;
        document.getElementById("banner_title").innerText = setMovie.name || setMovie.title;
        document.getElementById("banner_description").innerText = truncate(setMovie.overview, 150);

        createMovieRow("NETFLIX ORIGINALS", data.results, true);
    });

// Fetch and display various movie categories
fetch(requests.fetchTrending)
    .then(res => res.json())
    .then(data => createMovieRow("Top-Rated", data.results));

fetch(requests.fetchActionMovies)
    .then(res => res.json())
    .then(data => createMovieRow("Action Movies", data.results));

fetch(requests.fetchComedyMovies)
    .then(res => res.json())
    .then(data => createMovieRow("Comedy Movies", data.results));

fetch(requests.fetchHorrorMovies)
    .then(res => res.json())
    .then(data => createMovieRow("Horror Movies", data.results));

fetch(requests.fetchRomanceMovies)
    .then(res => res.json())
    .then(data => createMovieRow("Romance Movies", data.results));

fetch(requests.fetchDocumentaries)
    .then(res => res.json())
    .then(data => createMovieRow("Documentaries", data.results));
