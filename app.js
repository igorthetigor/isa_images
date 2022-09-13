const debugElement = document.getElementsByTagName("nav");
debugElement[0].onclick = () => resetDisplayedImages();

const imagesGrid = document.getElementsByClassName('Images')[0];
const displayedImageIds = [];
let currentImages = [];

function createImageComponent(randomNumber) {
  const singleImage = document.createElement("img");
  singleImage.src=`https://picsum.photos/1200/1600?random=${randomNumber}`;

  const imageShadow = document.createElement("div");
  imageShadow.appendChild(singleImage);
  imageShadow.className = 'img-shadow';

  const imageContainer = document.createElement("div");
  imageContainer.appendChild(imageShadow);
  imageContainer.className = "Image-container";

  currentImages.push(imageContainer);
}

// #region create 8 unique ids to select images in next steps
function makeSureVisibleIdsUnique(id) {
  if (displayedImageIds.some((imageId) => imageId === id)) {
    makeSureVisibleIdsUnique(id+1);
  }
  displayedImageIds.push(id);
}

function makeRandomIds() {
  for(let i = 0; i < 8; i++) {
    const randomNumber = Math.round(Math.random() * 100);
    makeSureVisibleIdsUnique(randomNumber);
  }
}
// #endregion

function removeOldImages() {
  while (imagesGrid.lastChild) {
    imagesGrid.removeChild(imagesGrid.lastChild);
  }
};

function resetDisplayedImages() {
  makeRandomIds();
  if(displayedImageIds.length > 8) displayedImageIds.splice(0, displayedImageIds.length - 8);
  currentImages = [];
  displayedImageIds.forEach((imageId) => createImageComponent(imageId));
  removeOldImages();
  currentImages.forEach((currentImage) => imagesGrid.appendChild(currentImage));
}

document.onload = resetDisplayedImages();

// main[0].addEventListener("wheel", (event) =>{
//   console.log({ event });
//   if(event.wheelDeltaY > 0) {
//     console.log('scrolling up')
//   } else {
//     console.log('scrolling down')
//   }
//   if(event.shiftKey) {
//     console.log('scrolling horizontally')
//   }
//   console.log({ mouseeventButtons: event.shiftKey });
// })
