import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '../components/MainPage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import UserProfilePage from '../components/UserProfile.vue'
import AdminProfilePage from '@/components/AdminProfilePage.vue'
import { currentUser, isAuthenticated, userRole } from "@/authState"

const routes = [
  { path: '/', redirect: '/main' },  
  { path: '/main', name: 'Main', component: MainPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/userprofile', name: 'Userprofile', component: UserProfilePage},
  { path: '/adminprofile', name: 'Adminprofile', component: AdminProfilePage}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


// role-based guards
router.beforeEach((to, from, next) => {
  // user profile must be logged in
  if (to.path === "/userprofile" && !isAuthenticated.value) {
    alert("Please log in first.")
    return next("/login")
  }

  next()
})


export default router