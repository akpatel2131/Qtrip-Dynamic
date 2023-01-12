
import config from "../conf/index.js";

//Implementation to extract city from query params
async function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  // let city = await fetch("http://3.7.243.254:8082/cities");
  let params = new URLSearchParams(search);
  let city = params.get('city');
  return city;
}

// const city = getCityFromURL(Window.location.Search)
//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  // let search = "?city="+city;
  // let cityname = getCityFromURL(search);
  // let fetchApi = await fetch (`http://3.7.243.254:8082/adventures/?city=${city}`).then (response => response.json()).catch(err=>null)
  // return fetchApi;
  // console.log(city)
  try {
    const response = await fetch(`${config.backendEndpoint}/adventures?city=${city}`);
    const data = await response.json()
    return data;    
  } catch (error) {
    return null
  }

}

// const adventures = await fetchAdventures(city)
//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  
  // for (let i = 0 ; i<adventures.length ; i++){
  //   let row = document.getElementById("data")
  //   let div = document.createElement("div")
  //   div.setAttribute("class","col-12 col-sm-6 col-lg-3")
  //   div.innerHTML =
  //   `
  //     <a  href="detail/?adventure=${adventures.id}" >
  //       <div class="card" style="height:20rem; width:100%; border-radius: 20px;">
  //         <img class="card-image-top " id="img-adv-1" src=${adventures.image} />
  //         <div class="card-body text-center d-md-flex  justify-content-between" style="padding: 10px 10px 10px 10px ;">
  //         <h3 class="fs-6">${adventures.name}</h3> 
  //         <h3 class="fs-6">${adventures.costPerHead}${adventures.currency}</h3>
  //         </div>
  //         <div class="card-body text-center d-md-flex  justify-content-between" style="padding: 10px 10px 10px 10px ;">
  //         <h3 class="fs-6">${adventures.category}</h3> 
  //         <h3 class="fs-6">${adventures.duration}Hrs</h3>
  //         </div>
  //       </div>
  //     </a>
  //   `
  //   row.appendChild(div)
  adventures.forEach((key) => {
    let ele = document.createElement("div");
    ele.className = "col-6 col-lg-3 mb-4";
    ele.innerHTML = `
            <a href="detail/?adventure=${key.id}" id=${key.id}>
              <div class="activity-card">
                <div class="category-banner">${key.category}</div>
                <img
                  class="img-responsive"
                  src=${key.image}
                />

                <div class="activity-card-text text-md-center w-100 mt-3">
                  <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                    <h5 class="text-left">${key.name}</h5>
                    <p>₹${key.costPerHead}</p>
                  </div>
                    <div class="d-block d-md-flex justify-content-between flex-wrap pl-3 pr-3">
                    <h5 class="text-left">Duration</h5>
                    <p>${key.duration} Hours</p>
                  </div>
                </div>
              </div>

            </a>
          `;

    document.getElementById("data").appendChild(ele);
  });
  }


// addAdventureToDOM(adventures)
{/* <div class="row" style="margin-bottom:30px">
<div class="col-12 col-sm-6 col-lg-3" style="margin-bottom:20px">
  <a target="_blank" href="./resort/index.html" style="text-decoration:none; color:black">
    <div class="card" style="height:20rem; width:100%; border-radius: 20px;">
      <img class="card-image-top img-adv" id="img-adv-1" src="../../assets/adventures/resort.jpg" />
      <div class="card-body text-center d-md-flex  justify-content-between" style="padding: 10px 10px 10px 10px ;">
      <h3 class="fs-6">Resort</h3> 
      <h3 class="fs-6">₹1200</h3>
      </div>
    </div>
  </a>
</div> */}
//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
// const list =  fetch(`${config.backendEndpoint}/adventures?city=${getCityFromURL(city)}`);
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList = list.filter((key)=> key.duration>low && key.duration<=high)
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const array = []
  categoryList.forEach((ele) => {
    for (let i=0 ; i<list.length ; i++){
      if(list[i].category === ele){
        array.push(list[i])
      }
    }
  })
  return array;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  let array = filters.duration.split("-")
  if(filters.duration.length > 0 && filters.category.length>0){
    list = filterByDuration(list,array[0], array[1]); + filterByCategory(list, filters.category);
  }else if (filters.duration.length >0 && filters.category.length === 0){
    list = filterByDuration(list,array[0], array[1]);
  }else if (filters.duration.length === 0 && filters.category.length > 0){
    list = filterByCategory(list, filters.category);
  }

  // Place holder for functionality to work in the Stubs
    return list;

}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
    return window.localStorage.setItem("filters",JSON.stringify(filters))
 
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  // Place holder for functionality to work in the Stubs
  return JSON.parse(window.localStorage.getItem('filters'));


}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  let filterDom = document.getElementById("category-list");
  
      if(filters.category){
        if(filters.category.length >= 0){
          for(let i=0 ;i<filters.category.length;i++){
            let div02 = document.createElement("div")
            div02.className = "category-filter"
            div02.innerText = `${filters.category[i]}`
            filterDom.appendChild(div02)
          }   
      }
      }

  
  
  //------------------------------------------------------

  // for (let i=0; i<filters.length; i++){
  //   if(filters[i]==="duration"){
  //     if(filters.duration.length>= 0){
  //       div.innerHTML +=
  //       `<div class="category-filter">${filters[i]}</div>;`
  //     }
  //   }else if (filters[i]==='category'){
  //     if(filters.category.length >= 0){
  //       for(let j=0; j<filters[i].length;j++)
  //       div.innerHTML +=
  //       `<div class="category-filter">${filters[j]}</div>;`
  //     }
  //   }
  // }

  // const result = filters.map((element)=> {
  //   if(element.length > 0){
  //     element.forEach((key) => {
  //       filterDom.innerHTML +=
  //     `<div class="category-filter">${key}</div>;`
  //     }
  //     )
  //   }
  // })
  // return result
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
