
<template>
  <div class="rate-box">
    <div>
      <span
        v-for="n in 5"
        :key="n"
        class="star"
        :class="{ highlight: n <= ratingVal }"
        @click="doSave(n)"
      >★</span>
    </div>
    <p class="msg">
      {{ ratingVal > 0 ? "Your score: " + ratingVal + "/5" : "Not rated yet" }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { db } from "@/firebase"
import { doc, getDoc, setDoc } from "firebase/firestore"
import { currentUser } from "@/authState"

const props = defineProps({
  itemId: { type: String, required: true }
})

const ratingVal = ref(0)


onMounted(() => {
  initRate()
})

async function initRate() {
  if (!currentUser.value) return
  const u = currentUser.value.uid
  const d = doc(db, "ratings_basic", props.itemId + "_" + u)
  const snap = await getDoc(d)
  if (snap.exists()) {
    ratingVal.value = snap.data().value ?? 0
  }
}

async function doSave(val) {
  if (!currentUser.value) {
    alert("Need login first!")
    return
  }
  ratingVal.value = val
  const u = currentUser.value.uid
  const d = doc(db, "ratings_basic", props.itemId + "_" + u)
  await setDoc(d, { value: val })
}
</script>


<style>
.rate-box {
  margin: 10px auto;
  text-align: center;
}
.star {
  font-size: 28px;
  color: grey;
  cursor: pointer;
}
.highlight {
  color: #ff9900;
}
.msg {
  margin-top: 5px;
  font-size: 14px;
  color: #444;
}
</style>