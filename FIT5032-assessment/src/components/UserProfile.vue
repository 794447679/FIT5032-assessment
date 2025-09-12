<template>
  <div class="mt-3">
    <a href="/" class="btn btn-outline-secondary btn-sm">&larr; Back to main page</a>
  </div>

  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 col-xxl-4">
        
        <!-- quick table to show current info -->
        <DataTable :value="[profile]" responsiveLayout="scroll" size="small" class="mb-4">
          <Column field="username" header="Username" />
          <Column field="email" header="Email" />
          <Column field="state" header="State" />
        </DataTable>

        <h2 class="h5 mb-3">User Profile</h2>
        <div class="border rounded p-3">
          <div class="mb-4">
            <label class="form-label" for="username">Username</label>
            <input
              id="username"
              class="form-control"
              v-model="editData.username"
              placeholder="Enter username"
              @input="saved = false"
            />
          </div>

          <div class="mb-4">
            <label class="form-label" for="email">Email</label>
            <input
              id="email"
              type="email"
              class="form-control"
              v-model="editData.email"
              placeholder="Enter email"
              @input="saved = false"
            />
          </div>

          <div class="mb-4">
            <label class="form-label" for="state">State</label>
            <select
              id="state"
              class="form-select"
              v-model="editData.state"
              @input="saved = false"
            >
              <option value="" disabled>Select state</option>
              <option>VIC</option>
              <option>NSW</option>
              <option>QLD</option>
              <option>WA</option>
              <option>SA</option>
              <option>TAS</option>
              <option>ACT</option>
              <option>NT</option>
            </select>
          </div>

          <button class="btn btn-primary" @click="saveProfile">Save</button>
          <span v-if="saved" class="ms-2 text-success">User profile is saved.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue"
import { currentUser } from "@/authState"
import { db } from "@/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"

import DataTable from "primevue/datatable"
import Column from "primevue/column"

// data fetched from Firestore
const profile = reactive({
  username: "",
  email: "",
  state: ""
})

// editable copy (used for form inputs)
const editData = reactive({ ...profile })

// track if changes were saved
const saved = ref(false)

// load profile info from Firestore
async function fetchProfile() {
  if (!currentUser.value) return
  const uid = currentUser.value.uid
  const userDoc = await getDoc(doc(db, "users", uid))

  if (userDoc.exists()) {
    Object.assign(profile, userDoc.data())
    Object.assign(editData, userDoc.data())
  } else {
    // if no document, at least show email from auth
    profile.email = currentUser.value.email
    editData.email = currentUser.value.email
  }
}

// save updated info back to Firestore
async function saveProfile() {
  if (!currentUser.value) return
  const uid = currentUser.value.uid

  // quick validation for username
  if (!editData.username) {
    alert("Username cannot be empty")
    return
  }

  await setDoc(doc(db, "users", uid), {
    username: editData.username,
    email: editData.email,
    state: editData.state
  })

  Object.assign(profile, editData)
  saved.value = true
}

// fetch profile when page loads
onMounted(() => {
  fetchProfile()
})
</script>