<template>
  <div class="mt-3">
    <a href="/" class="btn btn-outline-secondary btn-sm">&larr; Back to main page</a>
  </div>

  <div class="container py-4">
    <div class="row justify-content-center">
      <div class="col-12 col-sm-10 col-md-8 col-lg-6 col-xl-4 col-xxl-4">
        <DataTable :value="[user]" responsiveLayout="scroll" size="small" class="mb-4">
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
              v-model="draft.username"
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
              v-model="draft.email"
              placeholder="Enter email"
              @input="saved = false"
            />
          </div>

          <div class="mb-4">
            <label class="form-label" for="state">State</label>
            <select
              id="state"
              class="form-select"
              v-model="draft.state"
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

          <button class="btn btn-primary" @click="save">Save</button>
          <span v-if="saved" class="ms-2 text-success">User profile is saved.</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import profiles from '../assets/json/userProfile.json'


import DataTable from 'primevue/datatable';
import Column from 'primevue/column';


const user = reactive(profiles[0] || {})

const draft = reactive({ ...user })

const saved = ref(false)

function save () {
  Object.assign(user, draft)
  saved.value = true
}
</script>