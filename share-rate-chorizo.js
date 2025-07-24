// Socials

const shareRecipe = document.querySelector(".share");
const rateRecipe = document.querySelector(".rate");

let showSocials = function () {
  // fixing the content didn't show on first click
  // Since your CSS already hides .share and .rate, the issue likely comes from this part of your JavaScript:
  // if (shareRecipe.style.display == "none")
  // This checks inline styles only, not what's set in CSS. Since style.display is empty on first load, it returns "", not "none" — so your logic skips the first toggle.
  const shareDisplay = getComputedStyle(shareRecipe).display;
  const rateDisplay = getComputedStyle(rateRecipe).display;

  if (shareDisplay === "none" && rateDisplay === "none") {
    shareRecipe.style.display = "flex";
  } else if (shareDisplay === "none" && rateDisplay === "flex") {
    rateRecipe.style.display = "none";
    shareRecipe.style.display = "flex";
  } else {
    shareRecipe.style.display = "none";
  }
};

let showRating = function () {
  // fixing the content didn't show on first click
  const shareDisplay = getComputedStyle(shareRecipe).display;
  const rateDisplay = getComputedStyle(rateRecipe).display;

  if (rateDisplay === "none" && shareDisplay === "none") {
    rateRecipe.style.display = "flex";
  } else if (rateDisplay === "none" && shareDisplay === "flex") {
    shareRecipe.style.display = "none";
    rateRecipe.style.display = "flex";
  } else {
    rateRecipe.style.display = "none";
  }
};

// Rating

const stars = document.querySelectorAll(".fa-star");
const ratings = document.querySelectorAll(".rating-number");
let currentRatingChorizo;
document.addEventListener(
  "DOMContentLoaded",
  function () {
    if (currentRatingChorizo != 0) {
      currentRatingChorizo = localStorage.getItem("chorizo");
      ratings.forEach((rating) => {
        rating.textContent = currentRatingChorizo;
      });
      stars.forEach((star) => {
        const starValue = star.getAttribute("value");
        if (starValue <= currentRatingChorizo) {
          star.classList.add("checked");
        } else {
          star.classList.remove("checked");
        }
      });
    } else {
      currentRatingChorizo = 0;
    }
  },
  false
);

// Hover to View

function hover(potentialRating) {
  stars.forEach((star) => {
    const starValue = star.getAttribute("value");

    if (starValue <= potentialRating) {
      star.classList.add("checked");
    } else {
      star.classList.remove("checked");
    }
  });
}

// Click to Rate
function rate(newRatingChorizo) {
  if (currentRatingChorizo == newRatingChorizo) {
    currentRatingChorizo = 0;
  } else {
    currentRatingChorizo = newRatingChorizo;
  }
  stars.forEach((star) => {
    const starValue = star.getAttribute("value");
    if (starValue <= currentRatingChorizo) {
      star.classList.add("checked");
    } else {
      star.classList.remove("checked");
    }
  });

  ratings.forEach((rating) => {
    rating.textContent = currentRatingChorizo;
  });

  localStorage.setItem("chorizo", currentRatingChorizo);
}

let checked = function () {
  addToCartBtns.forEach((Btn) => {
    Btn.style.display = "flex";
  });
  cancelBtn.style.display = "inline";
};

const addToCartBtns = document.querySelectorAll(".add-to-cart");
const cancelBtn = document.querySelector(".cancel-btn");

let showCart = function () {
  addToCartBtns.forEach((Btn) => {
    Btn.style.display = "flex";
  });
  cancelBtn.style.display = "inline";
};

let hideCart = function () {
  addToCartBtns.forEach((Btn) => {
    Btn.style.display = "none";
  });
  cancelBtn.style.display = "none";
};
