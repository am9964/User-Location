const button = document.querySelector("button");

button.addEventListener("click", ()=>{
  if(navigator.geolocation){
      button.innerText = "Allow to detect location";
      navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }else{
    button.innerText = "Your browser does not support";
  }
});

function onSuccess(position){
  button.innerText = "Detecting your location...";
  let {latitude, longitude} = position.coords;
  // sending get request to the api with passing latitude and longitude coordinates of the user location
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=df7256f9c0ee41d9b49c07774f07342c`)
  // parsing json data into javascript object and returning it and in another then function receiving the object that is sent by the api
  .then(response => response.json()).then(result => {
    let allDetails = result.results[0].components; // passing components obj to allDetails variable
    let {city, state, postcode, country} = allDetails; // getting county, postcode, country properties value from allDetails obj
    button.innerText = `${city}, ${postcode}, ${state}, ${country}`;
    console.table(allDetails)
  }).catch(()=>{ // if any other error occured fetching the data
    button.innerText = "Something went wrong";
  })
}

function onError(error){
  if(error.code == 1){ //if user denied the request
    button.innerText = "You denied the request";
  }
  else if(error.code == 2){ // if location is not available
    button.innerText = "Location not available";
  }else{ // if any other error occured
    button.innerText = "Something went wrong";
  }
  button.setAttribute("disabled", "true"); // if user denied the request then button will be disabled
}
