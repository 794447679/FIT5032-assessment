<template>
  <div class="container mt-4">
    <!-- back button -->
    <div class="mb-3">
      <RouterLink to="/" class="btn btn-outline-secondary btn-sm">&larr; Back to Main Page</RouterLink>
    </div>

    <h2 class="mb-3">Admin: Manage Users</h2>

    <!-- show all users -->
    <DataTable :value="users" responsiveLayout="scroll" size="small" class="mb-4">
      <Column field="email" header="Email" />
      <Column field="username" header="Username" />
      <Column field="state" header="State" />
      <Column field="role" header="Role" />
      <Column header="Actions">
        <template #body="slotProps">
          <button class="btn btn-sm btn-primary me-2" @click="editUser(slotProps.data)">Edit</button>
        </template>
      </Column>
    </DataTable>

    <!-- edit form -->
    <div v-if="selectedUser" class="border rounded p-3">
      <h5>Edit User</h5>
      <div class="mb-2">
        <label class="form-label">Username</label>
        <input class="form-control" v-model="selectedUser.username" />
      </div>
      <div class="mb-2">
        <label class="form-label">State</label>
        <select class="form-select" v-model="selectedUser.state">
          <option value="">Select state</option>
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
      <div class="mb-2">
        <label class="form-label">Role</label>
        <input
          class="form-control"
          v-model="selectedUser.role"
          disabled
        />
      </div>
    </div>

        <button class="btn btn-success mt-2" @click="saveUser(selectedUser)">
        Save Changes
      </button>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { db } from "@/firebase"
import { collection, getDocs, doc, setDoc } from "firebase/firestore"
import DataTable from "primevue/datatable"
import Column from "primevue/column"

const users = ref([])          // all users
const selectedUser = ref(null) // the one we are editing

// load all users from firestore
async function loadUsers() {
  const snap = await getDocs(collection(db, "users"))
  users.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
}

// pick a user to edit
function editUser(user) {
  selectedUser.value = { ...user }
}

// save user back to firestore
async function saveUser(user) {
  if (!user.id) return
  await setDoc(doc(db, "users", user.id), {
    email: user.email,
    username: user.username,
    state: user.state,
    role: user.role
  })
  alert(`User ${user.email} updated`)
  await loadUsers() // reload after saving
}

// load on page mount
onMounted(() => {
  loadUsers()
})
</script>