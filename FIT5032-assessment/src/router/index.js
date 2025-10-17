import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '../components/MainPage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import UserProfilePage from '../components/UserProfile.vue'
import AdminProfilePage from '@/components/AdminProfilePage.vue'
import { currentUser, isAuthenticated, userRole } from "@/authState"
import Article1 from '@/components/Article1.vue'
import WorkOutPlan from '@/components/WorkOutPlan.vue'
import BMItracker from '@/components/BMItracker.vue'

const routes = [
  { path: '/', redirect: '/main' },  
  { path: '/main', name: 'Main', component: MainPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/userprofile', name: 'Userprofile', component: UserProfilePage},
  { path: '/adminprofile', name: 'Adminprofile', component: AdminProfilePage},
  { path: '/article1', name: 'Article1', component: Article1},
  { path: '/workout', name: 'workout', component: WorkOutPlan},
  { path: '/bmi', name: 'BMItracker', component: BMItracker}
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