<template>
  <div class="mb-2">
    <RouterLink to="/" class="btn btn-outline-secondary btn-sm">&larr; Back to Main Page</RouterLink>
  </div>

  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 col-xxl-4">
        
        <h1 class="h4 text-center mb-4">Login</h1>

        <form @submit.prevent="onSubmit">
          <!-- email input -->
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              v-model="form.email"
              placeholder="Enter your email"
            />
          </div>

          <!-- password input -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              v-model="form.password"
              placeholder="Enter your password"
            />
          </div>

          <!-- login button -->
          <button type="submit" class="btn btn-primary w-100">
            Login
          </button>

          <!-- link to register -->
          <p class="text-center mt-3 small">
            Don't have an account? 
            <RouterLink to="/register" class="text-primary fw-bold">Sign up</RouterLink>
          </p>

          <!-- error message -->
          <div v-if="errorMsg" class="text-danger mt-3 text-center">
            {{ errorMsg }}
          </div>
        </form>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"
import { useRouter } from "vue-router"

// simple form state
const form = ref({
  email: "",
  password: ""
})

// track error messages
const errorMsg = ref(null)

const auth = getAuth()
const router = useRouter()

// try to log in with Firebase
const onSubmit = () => {
  signInWithEmailAndPassword(auth, form.value.email, form.value.password)
    .then((userCredential) => {
      console.log("Login success:", userCredential.user)
      errorMsg.value = null
      alert("Login success!")
      router.push("/") // redirect to home
    })
    .catch((error) => {
      console.error("Login failed:", error.code, error.message)
      errorMsg.value = "Invalid email or password. Please try again."
    })
}
</script>