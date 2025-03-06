const tabs = document.querySelectorAll(".tab");
const items = document.querySelectorAll(".portfolio-item");
let autoScroll = true;
let currentIndex = 0;
let interval;

function switchTab(index) {
    tabs.forEach(tab => tab.classList.remove("active"));
    items.forEach(item => item.classList.remove("active"));
    tabs[index].classList.add("active");
    items[index].classList.add("active");
    pauseAllVideos();
}

function pauseAllVideos() {
    document.querySelectorAll("iframe").forEach(iframe => {
        iframe.src = iframe.src; // Reset iframe to stop video
    });
}

function startAutoScroll() {
    interval = setInterval(() => {
        if (autoScroll) {
            currentIndex = (currentIndex + 1) % tabs.length;
            switchTab(currentIndex);
        }
    }, 5000);
}

tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => {
        autoScroll = false;
        clearInterval(interval);
        switchTab(index);
    });
});

startAutoScroll();