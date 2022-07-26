const key = "1103c406a49acaeeb3e9ee5f23308052";

async function cityfound(lat, lon) {
  var intake = document.querySelector("#temp");
  intake.innerHTML = null;
  var city = document.getElementById("input").value;
  // sevenday(city)
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
  // var url=`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`
  // for auto detect
  try {
    let res = await fetch(url);
    var data = await res.json();
    //  console.log(data)
  } catch (error) {
    // console.log("error")
  }
  // coord:
  // lat: 20.465
  // lon: 85.8793
  var lats = data.coord.lat;
  var lons = data.coord.lon;
  sevenday(lats, lons);
  // console.log(lats,lons)

  var name = document.createElement("h1");
  name.innerText = `City Name :- ${data.name}`;

  var cur_temp = document.createElement("p");
  cur_temp.innerText = `Current Temp. :- ${data.main.temp}°C`;

  var min_temp = document.createElement("p");
  min_temp.innerText = `Min Temp. :- ${data.main.temp_min}°C`;

  var max_temp = document.createElement("p");
  max_temp.innerText = `Max Temp. :- ${data.main.temp_max}°C`;

  var wind = document.createElement("p");
  wind.innerText = `Wind Speed :- ${data.wind.speed}meter/sec `;

  var sunr = document.createElement("p");
  var ss = data.sys.sunrise;
  const milliseconds = ss * 1000;
  const dateObject = new Date(milliseconds);
  var timed = dateObject.toLocaleString("en-US", { hour: "numeric" });
  sunr.innerText = `sunrise :-${timed}`;

  var suns = document.createElement("p");
  suns.innerText = `sunset :-${data.sys.sunset}`;

  intake.append(name, cur_temp, min_temp, max_temp, wind, sunr, suns);

  // map part==============================================

  var map = document.getElementById("gmap_canvas");
  map.setAttribute(
    "src",
    `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
  );
}

//------------------------------------ for auto location-------------------------------------------------------------------//

function autolocate() {
  navigator.geolocation.getCurrentPosition(success);
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    //   console.log(latitude);
    //   console.log(longitude);
    cityf(latitude, longitude);
    sevenday(latitude, longitude);
  }
}

// api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
async function cityf(lat, lon) {
  var intake = document.querySelector("#temp");
  intake.innerHTML = null;
  var city = document.getElementById("input").value;

  // var url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`
  var url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${key}`;
  // for auto detect
  try {
    let res = await fetch(url);
    var data = await res.json();
    // console.log(data)
  } catch (error) {
    // console.log("error")
  }

  var name = document.createElement("h1");
  name.innerText = `City Name :- ${data.name}`;

  var cur_temp = document.createElement("p");
  cur_temp.innerText = `Current Temp. :- ${data.main.temp}°C`;

  var min_temp = document.createElement("p");
  min_temp.innerText = `Min Temp. :- ${data.main.temp_min}°C`;

  var max_temp = document.createElement("p");
  max_temp.innerText = `Max Temp. :- ${data.main.temp_max}°C`;

  var wind = document.createElement("p");
  wind.innerText = `Wind Speed :- ${data.wind.speed}meter/sec`;

  var sunr = document.createElement("p");
  sunr.innerText = `sunrise :-${data.sys.sunrise}`;

  var suns = document.createElement("p");
  suns.innerText = `sunset :-${data.sys.sunset}`;

  intake.append(name, cur_temp, min_temp, max_temp, wind, sunr, suns);

  // map part==============================================

  var map = document.getElementById("gmap_canvas");
  map.setAttribute(
    "src",
    `https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
  );
}

//===================================================================================================================

async function sevenday(lat, lon) {
  document.querySelector("#seven").innerHTML = null;
  var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,current,minutely,alert&units=metric&appid=${key}`;
  try {
    let res = await fetch(url);
    var data = await res.json();
    var seven = data.daily;
    console.log(seven);
  } catch (error) {
    console.log("error");
  }
  seven.forEach((el) => {
    var div = document.createElement("div");

    var days = document.createElement("h3");

    // from unix time to day identify====================================start
    const milliseconds = el.dt * 1000;

    const dateObject = new Date(milliseconds);

    var day = dateObject.toLocaleString("en-US", { weekday: "long" });

    // console.log(day)
    // from unix time to day identify====================================end
    days.innerText = day;

    var logos = document.createElement("img");
    var logo = el.weather[0].icon;
    logos.setAttribute("src", `http://openweathermap.org/img/wn/${logo}.png`);

    var maxt = document.createElement("h4");
    maxt.innerText = el.temp.max + "°C";

    var mint = document.createElement("h4");
    mint.innerText = el.temp.min + "°C";

    div.append(days, logos, maxt, mint);
    document.querySelector("#seven").append(div);

    // console.log(logo)
  });
}
