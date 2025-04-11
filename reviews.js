document.addEventListener('DOMContentLoaded', function() {
  let currentRating = 0;
  const stars = document.querySelectorAll('.stars span');
  const ratingValue = document.getElementById('ratingValue');
  const reviewForm = document.getElementById('reviewForm');
  const reviewsContainer = document.getElementById('reviewsContainer');
  
  // Load saved reviews from localStorage
  loadReviews();

  // Initialize star rating
  updateStars();

  // Star click event
  stars.forEach(star => {
      star.addEventListener('click', () => {
          currentRating = parseInt(star.dataset.value);
          ratingValue.value = currentRating;
          updateStars();
      });
  });

  // Form submission
  reviewForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Validate form
      if (validateForm()) {
          // Create review object
          const review = {
              name: document.getElementById('reviewerName').value,
              text: document.getElementById('reviewText').value,
              rating: currentRating,
              date: new Date().toLocaleDateString()
          };
          
          // Save review
          saveReview(review);
          
          // Add to display
          addReviewToDisplay(review);
          
          // Reset form
          reviewForm.reset();
          currentRating = 0;
          ratingValue.value = 0;
          updateStars();
          
          // Show success message
          alert('Thank you for your review!');
      }
  });

  // Form validation
  function validateForm() {
      let isValid = true;
      
      // Validate name
      const nameInput = document.getElementById('reviewerName');
      if (!nameInput.value.trim()) {
          nameInput.classList.add('is-invalid');
          isValid = false;
      } else {
          nameInput.classList.remove('is-invalid');
      }
      
      // Validate review text
      const reviewInput = document.getElementById('reviewText');
      if (!reviewInput.value.trim()) {
          reviewInput.classList.add('is-invalid');
          isValid = false;
      } else {
          reviewInput.classList.remove('is-invalid');
      }
      
      // Validate rating
      if (currentRating === 0) {
          document.querySelector('.star-rating').classList.add('is-invalid');
          isValid = false;
      } else {
          document.querySelector('.star-rating').classList.remove('is-invalid');
      }
      
      return isValid;
  }

  // Update star display
  function updateStars() {
      stars.forEach(star => {
          star.classList.toggle('active', star.dataset.value <= currentRating);
      });
  }

  // Increase rating
  window.increaseRating = function() {
      if (currentRating < 5) {
          currentRating++;
          ratingValue.value = currentRating;
          updateStars();
      }
  }

  // Decrease rating
  window.decreaseRating = function() {
      if (currentRating > 0) {
          currentRating--;
          ratingValue.value = currentRating;
          updateStars();
      }
  }

  // Save review to localStorage
  function saveReview(review) {
      let reviews = JSON.parse(localStorage.getItem('smartshop-reviews')) || [];
      reviews.unshift(review); // Add new review at beginning
      localStorage.setItem('smartshop-reviews', JSON.stringify(reviews));
  }

  // Load reviews from localStorage
  function loadReviews() {
      const reviews = JSON.parse(localStorage.getItem('smartshop-reviews')) || [];
      reviews.forEach(review => {
          addReviewToDisplay(review);
      });
  }

  // Add review to display
  function addReviewToDisplay(review) {
      const reviewElement = document.createElement('div');
      reviewElement.className = 'review-item';
      reviewElement.innerHTML = `
          <div class="review-header">
              <span>${review.name}</span>
              <span class="review-rating">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</span>
          </div>
          <div class="review-date">${review.date}</div>
          <div class="review-content">${review.text}</div>
      `;
      reviewsContainer.prepend(reviewElement);
  }
});