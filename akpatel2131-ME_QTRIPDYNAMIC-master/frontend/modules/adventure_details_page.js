import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
    // console.log(search)
    const params = new URLSearchParams(search);
    const Id = params.get("adventure")
    // console.log(Id)
  // Place holder for functionality to work in the Stubs
  return Id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call.
  try {
    let fetchUrl = await fetch (`${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`)
    // console.log(await fetchUrl.json())
    return await fetchUrl.json();
  }catch (error){
    return null;
  }
}
//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  // console.log(adventure)
  let Adname = document.getElementById("adventure-name")
  // Adname.innerHTML = `${adventure.name}`
  let text = document.createTextNode(`${adventure.name}`)
  Adname.appendChild(text)
  
  let subTitle = document.getElementById('adventure-subtitle')
  let subText = document.createTextNode(`${adventure.subtitle}`)
  subTitle.appendChild(subText)

  let image = document.getElementById("photo-gallery")
  image.innerhtml = ``
  for (let i=0; i<adventure.images.length; i++){
    image.innerHTML = image.innerHTML + `<div class ="activity-card-image">${adventure.images[i]}</div>`
  }
  // let detailImage = addBootstrapPhotoGallery(images);
  // image.append(detailImage)

  // console.log(adventure.name)
  let content = document.getElementById("adventure-content")
  let contentText = document.createTextNode(`${adventure.content}`)
  content.appendChild(contentText)
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let image = document.getElementById("photo-gallery")
  image.innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="carousel-inner">
    <div class="carousel-item active" style = "height: 400px">
      <img src="${images[0]}" class="d-block w-100" alt="..." style = "height: 100%">
    </div>
    
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `
 for (let i =1 ; i<images.length;i++){
  let doc = document.getElementById("carousel-inner")
  doc.innerHTML = doc.innerHTML+ `
  <div class = "carousel-item" style = "height: 400px"><img src="${images[i]}" class="d-block w-100" alt="..." style = "height: 100%"></div>
  `
 }
  
}


//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  // console.log(adventure.available)
  if (adventure.available === true){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead
  }else {
    document.getElementById("reservation-panel-sold-out").style.display = "block";
    document.getElementById("reservation-panel-available").style.display = "none";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML = persons*adventure.costPerHead
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  
  // let reservation = document.getElementsByClassName("reserve-button")
  // reservation.addEventListener("submit", function ( )  {
  //   let PersonName = document.getElementsByClassName("form-control").name.value;
  // let PersonDate = document.getElementsByClassName("form-control").date.value;
  // let PersonNum = document.getElementsByClassName("form-control").person.value;
  //   if (PersonName != "" && PersonDate != "" && PersonNum != 0){
  //     let update = {
  //       name: PersonName,
  //       date: PersonDate,
  //       person: PersonNum,
  //       adventure:adventure.Id
  //     }
  //     console.log(update)
  //     let Options = {
  //       method : "POST",
  //       headers: {'Content-Type': 'application/json'},
  //       body: JSON.stringify (update)
  //     }
  //   fetch(`${config.backendEndpoint}/reservations/new`,Options).then(res => res.JSON()).then(data => console.log(data))
  // }
  // })
  document.getElementById("myForm").addEventListener("submit",async function(e){
    e.preventDefault();
    let formData = {
      adventure : adventure.id,
      name: document.getElementsByClassName("form-control").name.value,
      date: document.getElementsByClassName("form-control").date.value,
      person: document.getElementsByClassName("form-control").person.value
    }
    // console.log("formData", formData)
    let response = await fetch (`${config.backendEndpoint}/reservations/new`,{
      method:"POST",
      headers: { "content-type":"application/json"},
      body: JSON.stringify(formData),
    })
    // console.log(await response.json())
    let result = await response.json();
    if (result.success){
      alert("success1!")
    }else {
      alert("Failed!1")
    }
  })
}
  


//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  // console.log(adventure)
  if(adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  }else{
    document.getElementById("reserved-banner").style.display = "none";

  }


}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
