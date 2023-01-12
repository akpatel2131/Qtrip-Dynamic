import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  cities.forEach((key) => {
    // debugger;
    addCityToDOM(key.id, key.city, key.description, key.image);
    // expect(document.getElementById(key.id)).toBeTruthy();
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  let city = await fetch(`${config.backendEndpoint}/cities`).then(res => res.json()).catch(err => null)
  return city;
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  let content = document.getElementById("data");
  let div = document.createElement("div");
  div.setAttribute("class","col-12 col-sm-6 col-lg-3")
  div.setAttribute("id",id)
  div.setAttribute("style","padding-bottom:20px")
  div.innerHTML= 
  `
    <div class="card card-layout" style="width: 300px ; height:400px; border-radius:10px">
          <div class="card-body " style="position:relative;padding:0px;height: 100%; width:100%">
            <a target="_blank" href="pages/adventures/?city=${id}" style="height: 100%;width:100%">
              <img class="activity-card-image" src="${image}" style="height: 100%;width:100%;border-radius:10px"/>
            </a>
            <div class="image-text">
              <div class="text-size">${city}</div>
              <div class="text-size">${description}</div>
            </div>
          </div>
        </div>
  `
  content.append(div)
}

export { init, fetchCities, addCityToDOM };


