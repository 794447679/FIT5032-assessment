import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"


const firebaseConfig = {
  apiKey: "AIzaSyBybroavfNOvEShCudmCH-MoPXiDTCHn94",
  authDomain: "fit5032-assessment-16c0f.firebaseapp.com",
  projectId: "fit5032-assessment-16c0f",
  storageBucket: "fit5032-assessment-16c0f.firebasestorage.app",
  messagingSenderId: "73095703349",
  appId: "1:73095703349:web:2eed851e2380cd0164ba7c"
}


const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

export { auth, db }