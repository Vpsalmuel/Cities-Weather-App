document.title = "City Weather Checker";
const searchEl = document.querySelector(".search");
const tempEl = document.querySelector(".unit");
const cityEl = document.getElementById("city");
const searchBtn = document.querySelector("button");
const result = document.querySelector(".content-result");
const apiKey = "b22024532f8e9db74e95950cb4419da9";

function getCity(value) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${value}&appid=${apiKey}&units=metric`
  )
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.cod !== "404") {
        let temp = data.main.temp;
        let city = data.name;

        tempEl.textContent = temp.toFixed(0) + "°C";
        cityEl.textContent = city;
        document.getElementById("error").innerText = "";
        result.style.display = "block";
      } else {
        document.getElementById("error").innerText = "Sorry " + data.message;
        result.style.display = "none";
      }
    })
    .catch((err) => console.log(err));
}

searchBtn.addEventListener("click", () => {
  let search = searchEl.value;
  getCity(search);
  searchEl.value = "";
});
