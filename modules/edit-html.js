let currentImages = [];
const imagesGrid = document.getElementsByClassName('Images')[0];

function createImageComponent(randomNumber) {
  const singleImage = document.createElement("img");
  singleImage.src=`https://picsum.photos/300/400?random=${randomNumber}`;

  const imageShadow = document.createElement("div");
  imageShadow.appendChild(singleImage);
  imageShadow.className = 'img-shadow';

  const imageContainer = document.createElement("div");
  imageContainer.appendChild(imageShadow);
  imageContainer.className = "Image-container";

  currentImages.push(imageContainer);
}

function resetCurrentImage() {
  currentImages = [];
}

export { currentImages, createImageComponent, resetCurrentImage, imagesGrid };
