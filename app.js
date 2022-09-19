import {
  latestImagesAmount,
  logAndReturn,
  WIDTH,
} from './modules/helper-functions.js';

import {
  createImageComponent,
  currentImages,
  resetCurrentImage,
  imagesGrid,
} from './modules/edit-html.js';

const BREAKPOINTS = {
  largest_4: 1475,
  medium_3: 1132,
  mobile: 768,
}

const debugElement = document.getElementsByTagName("nav");
debugElement[0].onclick = () => resetDisplayedImages();

const displayedImageIds = [];

function decideAmountOfImagesBasedOnScreenSize() {
  if(WIDTH >= BREAKPOINTS.largest_4) return logAndReturn(8);
  if(WIDTH >= BREAKPOINTS.medium_3) return logAndReturn(6);
  if(WIDTH >= BREAKPOINTS.mobile) return logAndReturn(4);
  if(WIDTH <= BREAKPOINTS.mobile) return logAndReturn(1);
}

function makeSureVisibleIdsUnique(id) {
  if (displayedImageIds.some((imageId) => imageId === id)) {
    return makeSureVisibleIdsUnique(id+1);
  }
  displayedImageIds.push(id);
}

function makeRandomIds() {
  const displayedImages = decideAmountOfImagesBasedOnScreenSize();
  for(let i = 0; i < displayedImages; i++) {
    const randomNumber = Math.round(Math.random() * 100);
    makeSureVisibleIdsUnique(randomNumber);
  }
}

function removeOldImages() {
  while (imagesGrid.lastChild) {
    imagesGrid.removeChild(imagesGrid.lastChild);
  }
};

function resetDisplayedImages() {
  makeRandomIds();
  if(displayedImageIds.length > 8) displayedImageIds.splice(0, displayedImageIds.length - 8);
  resetCurrentImage();
  displayedImageIds.forEach((imageId) => createImageComponent(imageId));
  removeOldImages();
  currentImages.forEach((currentImage) => imagesGrid.appendChild(currentImage));
}

document.onload = resetDisplayedImages();

window.addEventListener('resize', () => {
});

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
