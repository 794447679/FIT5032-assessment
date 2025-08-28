<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <!-- Bootstrap Responsiveness -->
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 col-xxl-4">
        
        <h1 class="h4 text-center mb-4">Login</h1>

        <form @submit.prevent="onSubmit">
          <!-- Username -->
          <div class="mb-3">
            <label for="username" class="form-label">Username</label>
            <input
              id="username"
              type="text"
              class="form-control"
              v-model="userData.username"
              placeholder="Enter your username"
            />
          </div>

          <!-- Password -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              v-model="userData.password"
              placeholder="Enter your password"
            />
          </div>

          <!-- login button -->
          <button type="submit" class="btn btn-primary w-100">
            Login
          </button>

          <!-- Sign up link -->
          <p class="text-center mt-3 small">
            Don't have an account? 
            <a href="/register" class="text-primary fw-bold">Sign up</a>
          </p>

          <!-- Error message -->
          <div v-if="errorMessage" class="text-danger mt-3 text-center">
            {{ errorMessage }}
          </div>

          <!-- test account show -->
          <div class="mt-4">    
            <p>Test Accounts:</p>
            <p>Username: taixiangLin  Password: 123456</p>
            <p>Username: admin        Password: 123456</p>
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const userData = ref({
  username: '',
  password: ''
})

const errorMessage = ref(null)

// tesat account 
const accounts = [
  { username: 'taixiangLin', password: '123456' },
  { username: 'admin', password: '123456' }
]

const onSubmit = () => {
  const findAccount = accounts.find(
    account =>
       account.username === userData.username &&
       account.password === userData.password
  )
  if (findAccount) {
    errorMessage.value = null
    alert('Login success!')
  } else {
    errorMessage.value = 'Invalid username or password,please try again '
  }
}
</script>