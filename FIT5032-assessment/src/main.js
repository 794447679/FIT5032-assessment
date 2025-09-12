import './assets/main.css'




import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

//import bootstrap css
import 'bootstrap/dist/css/bootstrap.min.css'



// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBybroavfNOvEShCudmCH-MoPXiDTCHn94",
  authDomain: "fit5032-assessment-16c0f.firebaseapp.com",
  projectId: "fit5032-assessment-16c0f",
  storageBucket: "fit5032-assessment-16c0f.firebasestorage.app",
  messagingSenderId: "73095703349",
  appId: "1:73095703349:web:2eed851e2380cd0164ba7c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

createApp(App)
.use(router)
.mount('#app')
