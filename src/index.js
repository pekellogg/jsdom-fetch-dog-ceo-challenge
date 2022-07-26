// init container
let breeds = [];

// attach event listener with subsequent actions
document.addEventListener("DOMContentLoaded", function () {
  loadDogImages();
  loadBreedOptions();
});

// fetch dog image URIs
// call function to create img element forEach dog image URI
function loadDogImages() {
  const dogImageUri = "https://dog.ceo/api/breeds/image/random/4"
  fetch(dogImageUri)
    .then(response => response.json())
    .then(results => { results.message.forEach(image => addDogImage(image)) });
}

// create img element forEach dog image URI
function addDogImage(dogImageUri) {
  let dogImageContainer = document.querySelector("#dog-image-container");
  let imageElement = document.createElement("img");
  imageElement.src = dogImageUri;
  dogImageContainer.appendChild(imageElement);
}

// fetch dog breed URI
function loadBreedOptions() {
  const dogBreedUri = "https://dog.ceo/api/breeds/list/all"
  fetch(dogBreedUri)
    .then(response => response.json())
    .then(results => {

      // breeds = hash of K/Vs with Ks of top-level breed name & Vs of sub-level breed types in arr
      breeds = Object.keys(results.message);

      // call function to rip & replace current breeds
      updateBreedList(breeds);
      
      // add listener to select new breeds
      addBreedSelectListener();
    });
}

// rip & replace current breeds
function updateBreedList(breeds) {
  let ul = document.querySelector("#dog-breeds");

  // call function to rip current breeds
  removeChildren(ul);

  // replace removed breeds with results from loadBreedOptions();
  // call function to replace breed forEach breed
  breeds.forEach(breed => addBreed(breed));
}

// rip current breeds
function removeChildren(element) {
  let child = element.lastElementChild;
  while (child) {
    element.removeChild(child);
    child = element.lastElementChild;
  }
}

// select filter for updateBreedList();
function selectBreedsStartingWith(letter) {
  updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

// add listener to breeds drop down selection
function addBreedSelectListener() {
  let breedDropdown = document.querySelector("#breed-dropdown");
  breedDropdown.addEventListener("change", function (event) {
    selectBreedsStartingWith(event.target.value);
  });
}

// replace breed forEach breed from updateBreedList();
function addBreed(breed) {
  let ul = document.querySelector("#dog-breeds");
  let li = document.createElement("li");
  li.innerText = breed;
  li.style.cursor = "pointer";
  ul.appendChild(li);
  li.addEventListener("click", updateColor);
}

// update color from click event from addBreed();
function updateColor(event) {
  event.target.style.color = "palevioletred";
}