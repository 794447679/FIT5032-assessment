import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'bootstrap/dist/css/bootstrap.min.css'

import { doc, getDoc } from "firebase/firestore"
import { auth,db } from "./firebase"   
import { onAuthStateChanged } from "firebase/auth"
import { currentUser, isAuthenticated,userRole } from "@/authState"


onAuthStateChanged(auth, async (user) => {
  if (user) {
    currentUser.value = user
    isAuthenticated.value = true

    // load from firestone
    const snap = await getDoc(doc(db, "users", user.uid))
    if (snap.exists()) {
      const role = snap.data().role
      if (role === "admin") {
        userRole.value = "admin"   // admin
      } else {
        userRole.value = "user"    // user
      }
    } else {
      userRole.value = "user"
    }

    console.log(" Current role:", userRole.value)
  } else {
    // no user logged in
    currentUser.value = null
    isAuthenticated.value = false
    userRole.value = null
  }
})

createApp(App).use(router).mount('#app')