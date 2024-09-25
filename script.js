// Carousel

const carouselSlide = document.querySelector('.carousel-slide');
const images = document.querySelectorAll('.carousel-slide img');

let counter = 1;
let startX, moveX;

// Clone the first and last images
const firstClone = images[0].cloneNode(true);
const lastClone = images[images.length - 1].cloneNode(true);

// Add the clones to the carousel
carouselSlide.appendChild(firstClone);
carouselSlide.insertBefore(lastClone, images[0]);

const allImages = document.querySelectorAll('.carousel-slide img');
let size = carouselSlide.clientWidth;

// Function to update image sizes based on the container width
function updateImageSize() {
    size = carouselSlide.clientWidth;
    allImages.forEach(image => {
        image.style.width = size + 'px';
    });
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
}

// Initial call to set image sizes
updateImageSize();

// Update image sizes on window resize
window.addEventListener('resize', updateImageSize);

// Event listeners for the navigation buttons
document.querySelector('.next-btn').addEventListener('click', () => {
    if (counter >= allImages.length - 1) return;
    counter++;
    moveCarousel();
});

document.querySelector('.prev-btn').addEventListener('click', () => {
    if (counter <= 0) return;
    counter--;
    moveCarousel();
});

// Function to move the carousel
function moveCarousel() {
    carouselSlide.style.transition = 'transform 0.4s ease-in-out';
    carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';

    carouselSlide.addEventListener('transitionend', () => {
        if (counter >= allImages.length - 1) {
            carouselSlide.style.transition = 'none';
            counter = 1;
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        } else if (counter <= 0) {
            carouselSlide.style.transition = 'none';
            counter = allImages.length - 2;
            carouselSlide.style.transform = 'translateX(' + (-size * counter) + 'px)';
        }
    });
}

// Touch events for swipe functionality
carouselSlide.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
});

carouselSlide.addEventListener('touchmove', (e) => {
    moveX = e.touches[0].clientX;
});

carouselSlide.addEventListener('touchend', () => {
    const swipeDistance = startX - moveX;

    if (swipeDistance > 50) { // Swipe left
        if (counter >= allImages.length - 1) return;
        counter++;
        moveCarousel();
    } else if (swipeDistance < -50) { // Swipe right
        if (counter <= 0) return;
        counter--;
        moveCarousel();
    }
});

//Tilt Effect

/* Store the element in el */
let el = document.getElementById('tilt')

/* Get the height and width of the element */
const height = el.clientHeight
const width = el.clientWidth

/*
  * Add a listener for mousemove event
  * Which will trigger function 'handleMove'
  * On mousemove
  */
el.addEventListener('mousemove', handleMove)

/* Define function a */
function handleMove(e) {
  /*
    * Get position of mouse cursor
    * With respect to the element
    * On mouseover
    */
  /* Store the x position */
  const xVal = e.layerX
  /* Store the y position */
  const yVal = e.layerY
  
  /*
    * Calculate rotation valuee along the Y-axis
    * Here the multiplier 20 is to
    * Control the rotation
    * You can change the value and see the results
    */
  const yRotation = 20 * ((xVal - width / 2) / width)
  
  /* Calculate the rotation along the X-axis */
  const xRotation = -20 * ((yVal - height / 2) / height)
  
  /* Generate string for CSS transform property */
  const string = 'perspective(500px) scale(1.1) rotateX(' + xRotation + 'deg) rotateY(' + yRotation + 'deg)'
  
  /* Apply the calculated transformation */
  el.style.transform = string
}

/* Add listener for mouseout event, remove the rotation */
el.addEventListener('mouseout', function() {
  el.style.transform = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
})

/* Add listener for mousedown event, to simulate click */
el.addEventListener('mousedown', function() {
  el.style.transform = 'perspective(500px) scale(0.9) rotateX(0) rotateY(0)'
})

/* Add listener for mouseup, simulate release of mouse click */
el.addEventListener('mouseup', function() {
  el.style.transform = 'perspective(500px) scale(1.1) rotateX(0) rotateY(0)'
})