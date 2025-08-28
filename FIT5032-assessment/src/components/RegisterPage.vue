<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 col-xxl-4">

        <h1 class="h4 text-center mb-4">Sign Up</h1>

        <form @submit.prevent="onRegister">
          <!-- Username -->
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              id="username"
              type="text"
              class="form-control"
              v-model="registerData.username"
              placeholder="Enter a username"
              @blur="() => validateUsername(true)"
              @input="() => validateUsername(false)"
            />
            <div v-if = "errors.username" class ="text-danger">{{errors.username}}</div>
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              v-model="registerData.password"
              placeholder="Enter a password"
              @blur="()=>validatePassword(true)"
              @input="()=>validatePassword(false)"
            />
            <div v-if = "errors.password" class ="text-danger">{{errors.password}}</div>
          </div>

          <!-- Confirm Password -->
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              class="form-control"
              v-model="registerData.confirmPassword"
              placeholder="Confirm your password"
              @blur="()=>validateConfirmPassword(true)"
              @input="()=>validateConfirmPassword(false)"
            />
            <div v-if = "errors.confirmPassword" class ="text-danger">{{errors.confirmPassword}}</div>
          </div>

          <!-- Sign up button -->
          <button type="submit" class="btn btn-success w-100">
            Sign Up
          </button>

          <!-- Back to login -->
          <p class="text-center mt-3 small">
            Already have an account? 
            <RouterLink to="/login" class="text-primary fw-bold">Login</RouterLink>
          </p>

          
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const registerData = ref({
  username: '',
  password: '',
  confirmPassword: ''
})

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
})


const validateUsername = (blur) => {
  if (registerData.value.username.length < 8) {
    if (blur) errors.value.username = 'Username must be at least 8 characters'
  } else {
    errors.value.username = null
  }

}

const validatePassword = (blur) => {
  const password = registerData.value.password  
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`;
  } else if (!hasUppercase) {
    if (blur) errors.value.password = "Password must contain at least one uppercase letter.";
  } else if (!hasLowercase) {
    if (blur) errors.value.password = "Password must contain at least one lowercase letter.";
  } else if (!hasNumber) {
    if (blur) errors.value.password = "Password must contain at least one number.";
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = "Password must contain at least one special character.";
  } else {
    errors.value.password = null;
  }
};


const validateConfirmPassword = (blur) => {
  const confirmPassword = registerData.value.confirmPassword

  if (!confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Please confirm your password'
  } else if (confirmPassword !== registerData.value.password) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match'
  } else {
    errors.value.confirmPassword = null
  }
};



const onRegister = () => {

  validateUsername(true)
  validatePassword(true)
  validateConfirmPassword(true)  

  if(!errors.value.username && !errors.value.password && !errors.value.confirmPassword )
  {
    alert(`Account created for ${registerData.value.username}`)
  }
 
}
</script>