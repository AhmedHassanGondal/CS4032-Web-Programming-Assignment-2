$(document).ready(function() {
  // Toggle between login and signup forms
  $('#show-signup').click(function() {
      $('#login-form').addClass('d-none');
      $('#signup-form').removeClass('d-none');
  });

  $('#show-login').click(function() {
      $('#signup-form').addClass('d-none');
      $('#login-form').removeClass('d-none');
  });

  // Form validation function
  function validateForm($form) {
      let isValid = true;

      $form.find('input[required]').each(function() {
          const $input = $(this);
          const value = $input.val().trim();
          const $error = $input.siblings('small');

          if (!value) {
              $input.addClass('is-invalid');
              $error.removeClass('d-none');
              isValid = false;
          } 
          else if ($input.attr('type') === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
              $input.addClass('is-invalid');
              $error.text('Please enter a valid email.').removeClass('d-none');
              isValid = false;
          } 
          else if ($input.attr('type') === 'password' && value.length < 6) {
              $input.addClass('is-invalid');
              $error.text('Password must be at least 6 characters.').removeClass('d-none');
              isValid = false;
          } 
          else {
              $input.removeClass('is-invalid');
              $error.addClass('d-none');
          }
      });

      return isValid;
  }

  // Login form submission
  $('#loginForm').on('submit', function(e) {
      e.preventDefault();
      if (validateForm($(this))) {
          // Simulate login process
          $('.btn-primary', this).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Logging in...').prop('disabled', true);
          
          setTimeout(() => {
              alert('Login successful! Redirecting to dashboard...');
              // window.location.href = 'dashboard.html'; // Uncomment for actual redirect
              $('.btn-primary', this).html('Login').prop('disabled', false);
          }, 1500);
      }
  });

  // Signup form submission
  $('#signupForm').on('submit', function(e) {
      e.preventDefault();
      if (validateForm($(this))) {
          // Simulate signup process
          $('.btn-primary', this).html('<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Creating account...').prop('disabled', true);
          
          setTimeout(() => {
              alert('Account created successfully! Please login.');
              $('#signup-form').addClass('d-none');
              $('#login-form').removeClass('d-none');
              $('.btn-primary', this).html('Sign Up').prop('disabled', false);
              this.reset();
          }, 1500);
      }
  });

  // Real-time validation
  $('input').on('input', function() {
      const $input = $(this);
      const value = $input.val().trim();
      const $error = $input.siblings('small');

      if (value) {
          if ($input.attr('type') === 'email' && !/^\S+@\S+\.\S+$/.test(value)) {
              $input.addClass('is-invalid');
              $error.text('Please enter a valid email.').removeClass('d-none');
          } 
          else if ($input.attr('type') === 'password' && value.length < 6) {
              $input.addClass('is-invalid');
              $error.text('Password must be at least 6 characters.').removeClass('d-none');
          } 
          else {
              $input.removeClass('is-invalid');
              $error.addClass('d-none');
          }
      }
  });
});