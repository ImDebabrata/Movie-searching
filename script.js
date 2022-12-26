document.getElementById("search").addEventListener("input", function () {
  setTimeout(function () {
    inputFunction();
  }, 1000);
});
document.getElementById("year").addEventListener("input", function () {
  setTimeout(function () {
    inputFunction();
  }, 1000);
});

let input;

function inputFunction() {
  input = document.getElementById("search").value;
  let year = document.getElementById("year").value;
  getData(input, year);
}

async function getData(input, year) {
  try {
    let result = await fetch(
      `https://www.omdbapi.com/?t=${input}&apikey=18c1c663&y=${year}`
    );
    let data = await result.json();
    appendData(data);
  } catch (err) {
    console.log(err);
  }
}

//appending the data;
function appendData(data) {
  let container = document.getElementById("cont");
  container.innerHTML = null;
  let div = document.createElement("div");
  let image = document.createElement("img");
  image.src = data.Poster;
  let name = document.createElement("p");
  name.setAttribute("class", "title");
  name.innerText = data.Title;
  let cast = document.createElement("p");
  cast.innerText = "Actors " + data.Actors;
  let duration = document.createElement("p");
  duration.innerText = "Duration : " + data.Runtime;
  let date = document.createElement("p");
  date.setAttribute("class", "year");
  date.innerText = data.Released;
  let rating = document.createElement("p");
  rating.setAttribute("class", "rating");
  rating.innerText = data.imdbRating;
  let button = document.createElement("button");

  if (rating.innerText > 8.5) {
    button.innerText = "Recomended";
  }
  div.append(image, name, cast, duration, date, rating, button);
  container.append(div);

  //display not found if data not found;
  let p = document.createElement("p");
  if (data.Response === "False") {
    container.innerHTML = null;
    image.src =
      "https://cdn.iconscout.com/icon/premium/png-256-thumb/no-data-found-1965030-1662565.png";
    p.setAttribute("class", "not_movie");
    p.innerText = "Opps...Data not found!";

    container.append(image, p);
  }

  //display input name if there is not input;
  if (input.length === 0) {
    p.innerText = "Enter Movie name to show data";
  }
}
