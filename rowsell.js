document.addEventListener("DOMContentLoaded", function () {
  const rows = document.querySelectorAll(".row-sell");

  function handleMouseEnter(
    row,
    imgCol,
    textCol,
    productImage,
    productOrigSrc
  ) {
    imgCol.classList.replace("col-md-9", "col-md-7");
    textCol.classList.replace("col-md-3", "col-md-5");
    imgCol.classList.replace("col-sm-9", "col-sm-7");
    textCol.classList.replace("col-sm-3", "col-sm-5");

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
    imgCol.classList.replace("col-md-7", "col-md-9");
    textCol.classList.replace("col-md-5", "col-md-3");
    imgCol.classList.replace("col-sm-7", "col-sm-9");
    textCol.classList.replace("col-sm-5", "col-sm-3");
    productImage.classList.remove("imgReposition");
    productImage.classList.add("origPos");
  }

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

          letter.textContent += word;
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

          letter.textContent = originalText;
          letter.classList.add("scale-up");
          letter.classList.remove("scale-up");
        });
      });
    });
  } else {
    rows.forEach((row) => {
      const imgCol = row.querySelector(".img-col");
      const textCol = row.querySelector(".text-col");
      const productImage = imgCol.querySelector("img");
      const productOrigSrc = productImage.src;

      const letters = row.querySelectorAll(".letter");
      const originalTexts = Array.from(letters).map(
        (letter) => letter.textContent
      );

      let currentlyExpandedLetter = null;

      letters.forEach((letter, index) => {
        letter.addEventListener("click", function () {
          const newImgSrc = letter.getAttribute("data-img");
          const word = letter.getAttribute("data-word");

          if (currentlyExpandedLetter && currentlyExpandedLetter !== letter) {
            currentlyExpandedLetter.textContent =
              originalTexts[
                Array.from(letters).indexOf(currentlyExpandedLetter)
              ];
            currentlyExpandedLetter.classList.remove("scale-up");
          }

          if (letter.textContent === originalTexts[index]) {
            productImage.classList.add("fade");

            setTimeout(() => {
              productImage.src = newImgSrc;

              setTimeout(() => {
                productImage.classList.remove("fade");
              }, 50);
            }, 200);

            letter.textContent = originalTexts[index] + word;
            letter.classList.add("scale-up");

            setTimeout(() => {
              letter.classList.remove("scale-up");
            }, 150);

            currentlyExpandedLetter = letter;
          } else {
            productImage.classList.remove("fade");

            setTimeout(() => {
              productImage.src = productOrigSrc;

              setTimeout(() => {
                productImage.classList.remove("fade");
              }, 50);
            }, 200);

            letter.textContent = originalTexts[index];
            letter.classList.add("scale-up");

            setTimeout(() => {
              letter.classList.remove("scale-up");
            }, 150);

            currentlyExpandedLetter = null;
          }
        });
      });
    });
  }
});
