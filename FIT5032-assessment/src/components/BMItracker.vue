<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">BMI Tracker</h2>

    <!-- Input area -->
    <div class="form-section mb-4">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <form @submit.prevent="calculateBMI">
            <div class="mb-3">
              <label for="height" class="form-label">Height (cm)</label>
              <input v-model="height" type="number" class="form-control" placeholder="Enter height" />
            </div>
            <div class="mb-3">
              <label for="weight" class="form-label">Weight (kg)</label>
              <input v-model="weight" type="number" class="form-control" placeholder="Enter weight" />
            </div>
            <button type="submit" class="btn btn-success w-100">Calculate & Save</button>
          </form>
        </div>
      </div>
    </div>

    <!-- Table section -->
    <div class="table-section">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h4>Your BMI Records</h4>
        <button @click="loadRecords" class="btn btn-outline-primary btn-sm">🔄 Refresh</button>
      </div>

      <table class="table table-striped">
        <thead>
          <tr>
            <th @click="sortBy('createdAt')">Date {{ sortIcon('createdAt') }}</th>
            <th>Height (cm)</th>
            <th>Weight (kg)</th>
            <th>BMI</th>
            <th @click="sortBy('status')">Status {{ sortIcon('status') }}</th>
          </tr>

          <!-- Only 2 search boxes: date + status -->
          <tr>
            <th>
              <input
                type="text"
                v-model="filters.date"
                class="form-control form-control-sm"
                placeholder="Search date..."
              />
            </th>
            <th></th>
            <th></th>
            <th></th>
            <th>
              <input
                type="text"
                v-model="filters.status"
                class="form-control form-control-sm"
                placeholder="Search status..."
              />
            </th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="record in paginatedData" :key="record.id">
            <td>{{ record.createdAt.toDate().toLocaleString() }}</td>
            <td>{{ record.height }}</td>
            <td>{{ record.weight }}</td>
            <td>{{ record.bmi.toFixed(2) }}</td>
            <td>{{ record.status }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="d-flex justify-content-between align-items-center mt-2">
        <small>Showing {{ startIndex + 1 }}–{{ endIndex }} of {{ filteredData.length }}</small>
        <div>
          <button
            class="btn btn-outline-primary btn-sm me-2"
            :disabled="page === 1"
            @click="page--"
          >
            Prev
          </button>
          <button
            class="btn btn-outline-primary btn-sm"
            :disabled="endIndex >= filteredData.length"
            @click="page++"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { db } from "@/firebase"
import { collection, addDoc, query, where, getDocs, orderBy } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const height = ref("")
const weight = ref("")
const records = ref([])

// filters for date + status only
const filters = ref({ date: "", status: "" })

// sorting control
const sortField = ref("createdAt")
const sortDirection = ref("desc")

// pagination
const page = ref(1)
const perPage = 10

// get user info
const auth = getAuth()
const user = auth.currentUser

// BMI calculation
const calculateBMI = async () => {
  if (!user) return alert("Please login first!")

  const h = parseFloat(height.value) / 100
  const w = parseFloat(weight.value)
  const bmi = w / (h * h)
  const status =
    bmi < 18.5 ? "Underweight" : bmi < 24.9 ? "Normal" : bmi < 29.9 ? "Overweight" : "Obese"

  await addDoc(collection(db, "bmi_records"), {
    userId: user.uid,
    height: parseFloat(height.value),
    weight: parseFloat(weight.value),
    bmi,
    status,
    createdAt: new Date()
  })

  alert(`BMI: ${bmi.toFixed(2)} (${status}) saved.`)
  loadRecords()
}

// fetch data
const loadRecords = async () => {
  if (!user) return
  const q = query(
    collection(db, "bmi_records"),
    where("userId", "==", user.uid),
    orderBy("createdAt", "desc")
  )
  const querySnapshot = await getDocs(q)
  records.value = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// filter logic (only date + status)
const filteredData = computed(() => {
  return records.value.filter(r => {
    const dateStr = r.createdAt.toDate().toLocaleString().toLowerCase()
    return (
      dateStr.includes(filters.value.date.toLowerCase()) &&
      r.status.toLowerCase().includes(filters.value.status.toLowerCase())
    )
  })
})

// sorting logic
const sortedData = computed(() => {
  return [...filteredData.value].sort((a, b) => {
    let aVal = a[sortField.value]
    let bVal = b[sortField.value]
    if (aVal?.toDate) aVal = aVal.toDate()
    if (bVal?.toDate) bVal = bVal.toDate()
    if (aVal < bVal) return sortDirection.value === "asc" ? -1 : 1
    if (aVal > bVal) return sortDirection.value === "asc" ? 1 : -1
    return 0
  })
})

// pagination logic
const startIndex = computed(() => (page.value - 1) * perPage)
const endIndex = computed(() => Math.min(startIndex.value + perPage, sortedData.value.length))
const paginatedData = computed(() => sortedData.value.slice(startIndex.value, endIndex.value))

// sorting icon logic
const sortBy = field => {
  if (sortField.value === field) {
    sortDirection.value = sortDirection.value === "asc" ? "desc" : "asc"
  } else {
    sortField.value = field
    sortDirection.value = "asc"
  }
}
const sortIcon = field => {
  if (sortField.value !== field) return "↕"
  return sortDirection.value === "asc" ? "↑" : "↓"
}

onMounted(loadRecords)
</script>

<style scoped>
.container {
  max-width: 900px;
}
th {
  cursor: pointer;
  user-select: none;
}
th:hover {
  background-color: #f1f1f1;
}
input.form-control-sm {
  font-size: 0.8rem;
  padding: 2px 5px;
}
</style>