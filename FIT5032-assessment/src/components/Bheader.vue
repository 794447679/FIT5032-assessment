<template>
  <header class="top-bar">
    <nav class="bar-container">
      <div class="nav-group">
        <div class="site-name">Men's Health</div>
        <div
          class="dropdown"
          @mouseenter="showExercise = true"
          @mouseleave="hideExercise"
        >
          <a href="#" class="nav-link-left dropdown-toggle">
            Exercise
          </a>
          <transition name="fade">
            <ul
              v-if="showExercise"
              class="dropdown-menu show-custom"
              @mouseenter="cancelHideExercise"
              @mouseleave="hideExercise"
            >
              <li><RouterLink to="/workout" class="dropdown-item">Workout Calories Difference</RouterLink></li>
              <li><RouterLink to="/mobility" class="dropdown-item">Mobility & Balance</RouterLink></li>
              <li><RouterLink to="/challenges" class="dropdown-item">Challenges</RouterLink></li>
            </ul>
          </transition>
        </div>

        <!-- Health -->
        <div
          class="dropdown"
          @mouseenter="showHealth = true"
          @mouseleave="hideHealth"
        >
          <a href="#" class="nav-link-left dropdown-toggle">
            Health Records
          </a>
          <transition name="fade">
            <ul
              v-if="showHealth"
              class="dropdown-menu show-custom"
              @mouseenter="cancelHideHealth"
              @mouseleave="hideHealth"
            >
              <li><RouterLink to="/exerciseplan" class="dropdown-item">My Exercise Plan</RouterLink></li>
              <li><RouterLink to="/nutritionplan" class="dropdown-item">Nutrition Plan</RouterLink></li>
              <li><RouterLink to="/bmi" class="dropdown-item">BMI Tracker</RouterLink></li>
            </ul>
          </transition>
        </div>

        <RouterLink to="/map" class="nav-item">Map</RouterLink>
        
        <span class="nav-item">About Us</span>
        <RouterLink to="/userprofile" class="nav-item">User Profile</RouterLink>

        <RouterLink
          v-if="userRole === 'admin'"
          to="/adminprofile"
          class="nav-item text-danger"
        >Manage User</RouterLink>

        <RouterLink v-if="!isAuthenticated" to="/login" class="nav-item">Login</RouterLink>
        <div v-else class="user-info">
          <span>👤 {{ currentUser?.email }}</span>
          <button @click="logout">Logout</button>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { ref } from "vue"
import { getAuth, signOut } from "firebase/auth"
import { currentUser, isAuthenticated, userRole } from "@/authState"
import { useRouter } from "vue-router"

const router = useRouter()

// Exercise nemu status
const showExercise = ref(false)
let hideTimerExercise = null

const hideExercise = () => {
  hideTimerExercise = setTimeout(() => (showExercise.value = false), 200)
}
const cancelHideExercise = () => {
  if (hideTimerExercise) clearTimeout(hideTimerExercise)
  showExercise.value = true
}

// Health menu status
const showHealth = ref(false)
let hideTimerHealth = null

const hideHealth = () => {
  hideTimerHealth = setTimeout(() => (showHealth.value = false), 200)
}
const cancelHideHealth = () => {
  if (hideTimerHealth) clearTimeout(hideTimerHealth)
  showHealth.value = true
}

// logout
const logout = () => {
  const auth = getAuth()
  signOut(auth)
    .then(() => router.push("/"))
    .catch((error) => console.error("Logout failed:", error))
}
</script>

<style scoped>
.top-bar {
  width: 100%;
  background-color: #f8f9fa;
  border-bottom: 1px solid #ddd;
  padding: 12px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
}

.bar-container {
  display: flex;
  justify-content: center;
}

.nav-group {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1.2rem;
}

.site-name {
  font-weight: bold;
  font-size: 1.2rem;
}

.nav-link-left {
  text-decoration: none;
  color: #198754;
  font-weight: 500;
}
.nav-link-left:hover {
  text-decoration: underline;
}

.dropdown-menu.show-custom {
  display: block;
  position: absolute;
  background: white;
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-top: 0.5rem;
  min-width: 180px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 999;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.nav-item {
  color: #0d6efd;
  text-decoration: none;
  cursor: pointer;
}
.nav-item:hover {
  text-decoration: underline;
}


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