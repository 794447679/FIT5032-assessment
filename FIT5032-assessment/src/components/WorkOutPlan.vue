<template>
  <div class="container mt-5">
    <h2 class="text-center mb-4">Workout Calories Reference</h2>

    <!-- Simple search -->
    <div class="d-flex justify-content-between mb-3">
      <input
        type="text"
        class="form-control w-50"
        v-model="searchText"
        placeholder="Search exercise..."
      />
      <button class="btn btn-outline-secondary btn-sm" @click="resetSearch">Reset</button>
    </div>

    <!-- Table area -->
    <table class="table table-striped">
      <thead>
        <tr>
          <th @click="sortBy('exercise')">
            Exercise {{ showSortIcon('exercise') }}
          </th>
          <th @click="sortBy('category')">
            Category {{ showSortIcon('category') }}
          </th>
          <th @click="sortBy('calories')">
            Cal / Min {{ showSortIcon('calories') }}
          </th>
          <th @click="sortBy('recommended')">
            Recommended Time (min) {{ showSortIcon('recommended') }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in paginatedList" :key="item.exercise">
          <td>{{ item.exercise }}</td>
          <td>{{ item.category }}</td>
          <td>{{ item.calories }}</td>
          <td>{{ item.recommended }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="d-flex justify-content-between align-items-center mt-3">
      <small>Showing {{ startIndex + 1 }} - {{ endIndex }} of {{ filteredList.length }}</small>
      <div>
        <button class="btn btn-outline-primary btn-sm me-2" :disabled="page === 1" @click="page--">
          Prev
        </button>
        <button
          class="btn btn-outline-primary btn-sm"
          :disabled="endIndex >= filteredList.length"
          @click="page++"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue"

// simple static dataset
const exercises = ref([
  { exercise: "Running", category: "Cardio", calories: 10.5, recommended: 30 },
  { exercise: "Cycling", category: "Cardio", calories: 9.0, recommended: 40 },
  { exercise: "Swimming", category: "Full Body", calories: 11.2, recommended: 25 },
  { exercise: "Yoga", category: "Flexibility", calories: 4.5, recommended: 40 },
  { exercise: "Jump Rope", category: "Cardio", calories: 12.8, recommended: 15 },
  { exercise: "Push-ups", category: "Strength", calories: 7.5, recommended: 10 },
  { exercise: "Pull-ups", category: "Strength", calories: 8.2, recommended: 10 },
  { exercise: "Walking", category: "Cardio", calories: 5.0, recommended: 45 },
  { exercise: "Dancing", category: "Cardio", calories: 7.8, recommended: 30 },
  { exercise: "HIIT", category: "High Intensity", calories: 13.5, recommended: 20 },
  { exercise: "Pilates", category: "Flexibility", calories: 5.3, recommended: 35 },
  { exercise: "Weight Lifting", category: "Strength", calories: 6.9, recommended: 40 },
])

// basic reactive data
const searchText = ref("")
const sortField = ref("exercise")
const sortOrder = ref("asc")
const page = ref(1)
const itemsPerPage = 10

// filter by search
const filteredList = computed(() => {
  return exercises.value.filter(e =>
    e.exercise.toLowerCase().includes(searchText.value.toLowerCase())
  )
})

// sort logic
const sortedList = computed(() => {
  const list = [...filteredList.value]
  list.sort((a, b) => {
    let aVal = a[sortField.value]
    let bVal = b[sortField.value]
    if (aVal < bVal) return sortOrder.value === "asc" ? -1 : 1
    if (aVal > bVal) return sortOrder.value === "asc" ? 1 : -1
    return 0
  })
  return list
})

// pagination
const startIndex = computed(() => (page.value - 1) * itemsPerPage)
const endIndex = computed(() => Math.min(startIndex.value + itemsPerPage, sortedList.value.length))
const paginatedList = computed(() => sortedList.value.slice(startIndex.value, endIndex.value))

// change sorting
function sortBy(field) {
  if (sortField.value === field) {
    sortOrder.value = sortOrder.value === "asc" ? "desc" : "asc"
  } else {
    sortField.value = field
    sortOrder.value = "asc"
  }
}

// show arrow direction
function showSortIcon(field) {
  if (sortField.value !== field) return "↕"
  return sortOrder.value === "asc" ? "↑" : "↓"
}

// reset search and sorting
function resetSearch() {
  searchText.value = ""
  sortField.value = "exercise"
  sortOrder.value = "asc"
  page.value = 1
}
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
</style>