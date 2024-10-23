document.addEventListener("DOMContentLoaded", function () {
  const rows = document.querySelectorAll(".row-sell");

  // Function to handle mouseenter and mouseleave events
  function handleMouseEnter(
    row,
    imgCol,
    textCol,
    productImage,
    productOrigSrc
  ) {
    imgCol.classList.replace("col-md-8", "col-md-6");
    textCol.classList.replace("col-md-4", "col-md-6");
    imgCol.classList.replace("col-sm-8", "col-sm-6");
    textCol.classList.replace("col-sm-4", "col-sm-6");

    productImage.classList.add("imgReposition");
    productImage.classList.remove("origPos");
  }

  function handleMouseLeave(
    row,
    imgCol,
    textCol,
    productImage,
    productOrigSrc
  ) {
    imgCol.classList.replace("col-md-6", "col-md-8");
    textCol.classList.replace("col-md-6", "col-md-4");
    imgCol.classList.replace("col-sm-6", "col-sm-8");
    textCol.classList.replace("col-sm-6", "col-sm-4");
    productImage.classList.remove("imgReposition");
    productImage.classList.add("origPos");
  }

  // Handle desktop hover events
  if (window.matchMedia("(min-width: 768px)").matches) {
    rows.forEach((row) => {
      const imgCol = row.querySelector(".img-col");
      const textCol = row.querySelector(".text-col");
      const productImage = imgCol.querySelector("img");
      const productOrigSrc = productImage.src;

      if (!textCol || !productImage) return;

      textCol.addEventListener("mouseenter", () =>
        handleMouseEnter(row, imgCol, textCol, productImage, productOrigSrc)
      );
      textCol.addEventListener("mouseleave", () =>
        handleMouseLeave(row, imgCol, textCol, productImage, productOrigSrc)
      );

      const letters = row.querySelectorAll(".letter");

      letters.forEach((letter) => {
        const originalText = letter.textContent;

        letter.addEventListener("mouseenter", function () {
          const newImgSrc = letter.getAttribute("data-img");
          const word = letter.getAttribute("data-word");

          productImage.classList.add("fade");

          setTimeout(() => {
            productImage.src = newImgSrc;

            setTimeout(() => {
              productImage.classList.remove("fade");
            }, 50);
          }, 200);

          letter.textContent += word; // Update text
          letter.classList.add("scale-up");

          setTimeout(() => {
            letter.classList.remove("scale-up");
          }, 150);
        });

        letter.addEventListener("mouseleave", function () {
          productImage.classList.remove("fade");

          setTimeout(() => {
            productImage.src = productOrigSrc;

            setTimeout(() => {
              productImage.classList.remove("fade");
            }, 50);
          }, 200);

          letter.textContent = originalText; // Restore original text
          letter.classList.add("scale-up");
          letter.classList.remove("scale-up");
        });
      });
    });
  } else {
    // Handle mobile click events
    rows.forEach((row) => {
      const imgCol = row.querySelector(".img-col");
      const textCol = row.querySelector(".text-col");
      const productImage = imgCol.querySelector("img");
      const productOrigSrc = productImage.src;

      const letters = row.querySelectorAll(".letter");
      const originalTexts = Array.from(letters).map(
        (letter) => letter.textContent
      ); // Store original texts

      let currentlyExpandedLetter = null; // Track the currently expanded letter

      letters.forEach((letter, index) => {
        letter.addEventListener("click", function () {
          const newImgSrc = letter.getAttribute("data-img");
          const word = letter.getAttribute("data-word");

          if (currentlyExpandedLetter && currentlyExpandedLetter !== letter) {
            // Collapse the previously expanded letter
            currentlyExpandedLetter.textContent =
              originalTexts[
                Array.from(letters).indexOf(currentlyExpandedLetter)
              ]; // Restore original text
            currentlyExpandedLetter.classList.remove("scale-up");
          }

          // Check if the current letter is already expanded
          if (letter.textContent === originalTexts[index]) {
            // Expand this letter
            productImage.classList.add("fade");

            setTimeout(() => {
              productImage.src = newImgSrc;

              setTimeout(() => {
                productImage.classList.remove("fade");
              }, 50);
            }, 200);

            letter.textContent = originalTexts[index] + word; // Update text correctly
            letter.classList.add("scale-up");

            setTimeout(() => {
              letter.classList.remove("scale-up");
            }, 150);

            currentlyExpandedLetter = letter; // Set this letter as currently expanded
          } else {
            // Collapse this letter
            productImage.classList.remove("fade");

            setTimeout(() => {
              productImage.src = productOrigSrc;

              setTimeout(() => {
                productImage.classList.remove("fade");
              }, 50);
            }, 200);

            letter.textContent = originalTexts[index]; // Restore original text correctly
            letter.classList.add("scale-up");

            setTimeout(() => {
              letter.classList.remove("scale-up");
            }, 150);

            currentlyExpandedLetter = null; // Reset the currently expanded letter
          }
        });
      });
    });
  }
});
