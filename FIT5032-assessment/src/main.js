import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'

import { auth } from "./firebase"   
import { onAuthStateChanged } from "firebase/auth"
import { currentUser, isAuthenticated } from "@/authState"

onAuthStateChanged(auth, (user) => {
  currentUser.value = user || null
  isAuthenticated.value = !!user
})

createApp(App).use(router).mount('#app')