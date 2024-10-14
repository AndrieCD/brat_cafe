const slider = document.querySelector(".gallery");
const galleryImages = document.querySelectorAll("#imgSlide");

let isDown = false;
let startX;
let scrollLeft;
let autoScrollInterval;

galleryImages.forEach((img) => {
  img.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });
});

slider.addEventListener("mousedown", (e) => {
  isDown = true;
  slider.classList.add("active");
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;

  stopAutoScroll(); // Stop auto-scroll when user interacts
});

slider.addEventListener("mouseleave", (_) => {
  isDown = false;
  slider.classList.remove("active");
  startAutoScroll(); // Resume auto-scroll after interaction
});

slider.addEventListener("mouseup", (_) => {
  isDown = false;
  slider.classList.remove("active");
  startAutoScroll(); // Resume auto-scroll after interaction
});

slider.addEventListener("mousemove", (e) => {
  if (!isDown) return;

  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const SCROLL_SPEED = 2;
  const walk = (x - startX) * SCROLL_SPEED;
  slider.scrollLeft = scrollLeft - walk;

  updateCenteredImage();
});

galleryImages[0].classList.add("centered");

function updateCenteredImage() {
  const images = [...galleryImages];
  const sliderCenter = slider.scrollLeft + slider.offsetWidth / 2;

  let closestImage = null;
  let closestDistance = Infinity;

  // console.log(sliderCenter);

  images.forEach((img) => {
    const imageCenter = img.offsetLeft + img.offsetWidth / 2; // Get the center of each image
    const distance = Math.abs(imageCenter - sliderCenter); // Calculate distance from slider center

    //   console.log(distance);
    //   console.log(closestDistance);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestImage = img;
      //     console.log("closest image found: " + images.indexOf(img));
    }
  });

  images.forEach((img) => {
    if (img == closestImage) img.classList.add("centered");
    else img.classList.remove("centered");
  });
}
function autoScroll() {
  const maxScrollLeft = slider.clientWidth;
  const scrollAmount = slider.clientWidth / 1.5; // Adjust for scroll amount

  if (slider.scrollLeft + scrollAmount >= maxScrollLeft + slider.offsetWidth) {
    slider.scrollLeft = 0; // Go back to start
  } else {
    slider.scrollLeft += scrollAmount;
  }
  updateCenteredImage(); // Update the centered image after scroll
}

// Start auto-scrolling
function startAutoScroll() {
  if (autoScrollInterval) return;
  autoScrollInterval = setInterval(autoScroll, 5000); // Auto-scroll every 3 seconds
}

// Stop auto-scrolling
function stopAutoScroll() {
  clearInterval(autoScrollInterval);
}

// Start auto-scroll when the page loads
startAutoScroll();

function next() {
  stopAutoScroll();
  const maxScrollLeft = slider.clientWidth;
  const scrollAmount = slider.clientWidth / 1.5; // Adjust for scroll amount

  if (slider.scrollLeft + scrollAmount >= maxScrollLeft + slider.offsetWidth) {
    slider.scrollLeft = 0; // Go back to start
  } else {
    slider.scrollLeft += scrollAmount;
  }

  updateCenteredImage(); // Update the centered image after scroll
  startAutoScroll();
}
function prev() {
  stopAutoScroll();

  const scrollAmount = slider.clientWidth / 1.5; // Adjust for scroll amount
  const maxScrollLeft = slider.scrollWidth - slider.clientWidth; // Maximum scroll position

  if (slider.scrollLeft - scrollAmount <= 0) {
    // If we're at the beginning, scroll to the end
    slider.scrollLeft = maxScrollLeft; // Set to max scroll position
  } else {
    slider.scrollLeft -= scrollAmount; // Scroll back
  }

  updateCenteredImage(); // Update the centered image after scroll
  startAutoScroll();
}
