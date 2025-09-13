<template>
  <div class="mb-2">
    <RouterLink to="/login" class="btn btn-outline-secondary btn-sm">&larr; Back to Login</RouterLink>
  </div>

  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 col-xxl-4">

        <h1 class="h4 text-center mb-4">Sign Up</h1>

        <form @submit.prevent="onRegister">
          <!-- email input -->
          <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              v-model="form.email"
              placeholder="Enter email"
            />
            <div v-if="errors.email" class="text-danger">{{ errors.email }}</div>
          </div>

          <!-- password input -->
          <div class="mb-3">
            <label for="password" class="form-label">Password</label>
            <input
              id="password"
              type="password"
              class="form-control"
              v-model="form.password"
              placeholder="Enter password"
            />
            <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
          </div>

          <!-- confirm password -->
          <div class="mb-3">
            <label for="confirmPassword" class="form-label">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              class="form-control"
              v-model="form.confirmPassword"
              placeholder="Confirm password"
            />
            <div v-if="errors.confirmPassword" class="text-danger">{{ errors.confirmPassword }}</div>
          </div>

          <!-- sign up button -->
          <button type="submit" class="btn btn-success w-100">Sign Up</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"
import { db } from "@/firebase"
import { doc, setDoc } from "firebase/firestore"
import { useRouter } from "vue-router"
import eyeOpen from "@/assets/view.png"
import eyeClosed from "@/assets/hide.png"

// form state
const form = ref({
  email: "",
  password: "",
  confirmPassword: ""
})

// error state
const errors = ref({
  email: null,
  password: null,
  confirmPassword: null
})

const auth = getAuth()
const router = useRouter()

// quick validation
function validate() {
  errors.value.email = !form.value.email.includes("@") ? "Enter a valid email" : null
  errors.value.password = form.value.password.length < 6 ? "Password must be at least 6 chars" : null
  errors.value.confirmPassword =
    form.value.password !== form.value.confirmPassword ? "Passwords do not match" : null
  return !errors.value.email && !errors.value.password && !errors.value.confirmPassword
}

// register new account
const onRegister = () => {
  if (!validate()) return

  createUserWithEmailAndPassword(auth, form.value.email, form.value.password)
    .then(async (userCredential) => {
      console.log("Register success:", userCredential.user)

      // create a Firestore doc for this user
      await setDoc(doc(db, "users", userCredential.user.uid), {
      email: form.value.email,
      username: "",
      state: "",
      role: "user"   
    })

      alert("Account created!")
      router.push("/login")
    })
    .catch((err) => {
      console.error("Register failed:", err.code, err.message)
      errors.value.email = err.message
    })
}
</script>