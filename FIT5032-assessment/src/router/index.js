import { createRouter, createWebHistory } from 'vue-router'

import MainPage from '../components/MainPage.vue'
import LoginPage from '../components/LoginPage.vue'
import RegisterPage from '../components/RegisterPage.vue'
import UserProfilePage from '@/components/UserProfile.vue'

const routes = [
  { path: '/', redirect: '/main' },  
  { path: '/main', name: 'Main', component: MainPage },
  { path: '/login', name: 'Login', component: LoginPage },
  { path: '/register', name: 'Register', component: RegisterPage },
  { path: '/userprofile', name: 'Userprofile', component: UserProfilePage}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router