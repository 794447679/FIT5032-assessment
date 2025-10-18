<template>
  <header class="top-bar">
    <nav class="bar-container">
      <div class="nav-group">
        <!-- Website title: click to go to /main -->
        <RouterLink to="/main" class="site-name">Men's Health</RouterLink>

        <!-- Main navigation links -->
        <RouterLink to="/workout" class="nav-item">Workout Calories</RouterLink>
        <RouterLink to="/bmi" class="nav-item">BMI Tracker</RouterLink>
        <RouterLink to="/doctor" class="nav-item">Doctors</RouterLink>
        <RouterLink to="/map" class="nav-item">Map</RouterLink>
        <RouterLink to="/userprofile" class="nav-item">User Profile</RouterLink>

        <!-- Admin-only link -->
        <RouterLink
          v-if="userRole === 'admin'"
          to="/adminprofile"
          class="nav-item text-danger"
        >
          Manage User
        </RouterLink>

        <!-- Login / Logout section -->
        <RouterLink v-if="!isAuthenticated" to="/login" class="nav-item">
          Login
        </RouterLink>

        <!-- If logged in, show user info -->
        <div v-else class="user-info">
          <span>👤 {{ currentUser?.email }}</span>
          <button @click="logout">Logout</button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
// import dependencies
import { getAuth, signOut } from "firebase/auth"
import { useRouter } from "vue-router"
import { currentUser, isAuthenticated, userRole } from "@/authState"

const router = useRouter()

// logout function
const logout = () => {
  const auth = getAuth()
  signOut(auth)
    .then(() => router.push("/")) // redirect to homepage
    .catch((error) => console.error("Logout failed:", error))
}
</script>

<style scoped>
/* ====== Top navigation bar ====== */
.top-bar {
  width: 100%;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

/* Center the content inside navbar */
.bar-container {
  display: flex;
  justify-content: center;
}

/* Group of nav items */
.nav-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem;
}

/* Site title (linked to /main) */
.site-name {
  font-weight: bold;
  font-size: 1.2rem;
  color: #198754;
  text-decoration: none;
}
.site-name:hover {
  text-decoration: underline;
}

/* General nav links */
.nav-item {
  color: #0d6efd;
  text-decoration: none;
  cursor: pointer;
  font-weight: 500;
}
.nav-item:hover {
  text-decoration: underline;
}

/* User info and logout button */
.user-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.user-info button {
  border: 1px solid #dc3545;
  background: transparent;
  color: #dc3545;
  border-radius: 4px;
  padding: 2px 6px;
  cursor: pointer;
}

.user-info button:hover {
  background: #dc3545;
  color: white;
}
</style>