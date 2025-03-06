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