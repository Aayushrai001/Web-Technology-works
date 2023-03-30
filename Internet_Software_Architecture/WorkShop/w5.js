async function getMovieInfo(title) {
    const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=b4cdfba7`);
    const data = await response.json();
  
    const movieInfo = document.getElementById('movieInfo');
    if (data.Response === 'False') {
      movieInfo.innerHTML = `<p>${data.Error}</p>`;
    } else {
      movieInfo.innerHTML = `
        <h2>${data.Title}</h2>
        <h2>(${data.Year})</h2>
        <p>Directed by ${data.Director}</p>
        <p>Starring ${data.Actors}</p>
        <p>${data.imdbRating}</p>
      `;
    }
  }
  
  const form = document.querySelector('form');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    const title = document.getElementById('movieTitle').value;
    getMovieInfo(title);
  });