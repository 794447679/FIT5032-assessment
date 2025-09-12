<template>
  <header class="top-bar">
    <nav class="bar-container d-flex justify-content-between align-items-center">
      <div class="site-name">Men's health</div>
      <ul class="nav-links d-flex align-items-center list-unstyled mb-0">
        <li class="me-3">Start</li>
        <li class="me-3">About us</li>

        <!-- no login -->
        <li v-if="!isAuthenticated" class="me-3">
          <RouterLink to="/login" class="text-primary">Login</RouterLink>
        </li>

        <!-- login -->
        <li v-else class="d-flex align-items-center">
          <RouterLink to="/userprofile" class="text-primary me-3">User profile</RouterLink>
          <span class="me-3 text-muted">👤 {{ currentUser?.email }}</span>
          <button class="btn btn-outline-danger btn-sm" @click="logout">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { getAuth, signOut } from "firebase/auth"
import { currentUser, isAuthenticated } from "@/authState"
import { useRouter } from "vue-router"

const router = useRouter()

const logout = () => {
  const auth = getAuth()
  signOut(auth)
    .then(() => {
      router.push("/")   
    })
    .catch((error) => {
      console.error("Logout failed:", error)
    })
}
</script>

<style scoped>
.top-bar {
  background-color: #f8f9fa;
  padding: 0.5rem 1rem;
}
.site-name {
  font-weight: bold;
}
</style>