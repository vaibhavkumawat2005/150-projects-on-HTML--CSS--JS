const sliderTabs = document.querySelectorAll(".slider-tab");
const sliderIndicator = document.querySelector(".slider-indication");
const sliderControls = document.querySelector(".slider-pagination"); // Ensure this is the correct parent

// Update the indicator position and size
const updateIndicator = (tab, index) => {
  const offsetLeft = tab.offsetLeft;
  sliderIndicator.style.transform = `translateX(${offsetLeft}px)`;
  sliderIndicator.style.width = `${tab.getBoundingClientRect().width}px`;

  // Scroll to center the active tab
  const scrollLeft = tab.offsetLeft - (sliderControls.offsetWidth / 2) + (tab.offsetWidth / 2);
  sliderControls.scrollTo({ left: scrollLeft, behavior: "smooth" });
};

// Initialize Swiper
const swiper = new Swiper(".slider-container", {
  effect: "fade",
  speed: 1300,
  navigation: {
    prevEl: "#slide-prev",
    nextEl: "#slide-next",
  },
  on: {
    slideChange: () => {
      const currentTab = sliderTabs[swiper.activeIndex];
      updateIndicator(currentTab, swiper.activeIndex);
    },
    reachEnd: () => swiper.autoplay.stop()
  },
});

// Tab click event listener
sliderTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => {
    swiper.slideTo(index);
    updateIndicator(tab, index);
  });
});

// Debounce function for resize events
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// Reinitialize the indicator on window resize
const handleResize = debounce(() => {
  updateIndicator(sliderTabs[swiper.activeIndex], swiper.activeIndex);
}, 100);

window.addEventListener("resize", handleResize);

// Initialize the indicator
updateIndicator(sliderTabs[0], 0);
