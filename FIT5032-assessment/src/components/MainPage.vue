<template>
  <div>
    <BHeader />
    <section class="main-section">
      <h1>Welcome to Men's health</h1>
      <p>This is a website that teaches men how to manage their health.</p>
      <button>Click for more details</button>
    </section>
    <footer class="page-footer">
      <p>© 2025 Men's health</p>
    </footer>
  </div>
</template>

<script setup>
import BHeader from "@/components/Bheader.vue"
</script>

<style scoped>
/* top */
.top-bar {
  background: #fff;
  border-bottom: 1px solid #ddd;
}
.bar-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 14px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.site-name {
  font-weight: bold;
  font-size: 18px;
}
.nav-links {
  list-style: none;
  display: flex;
  gap: 15px;
  margin: 0;
  padding: 0;
}
.nav-links a {
  text-decoration: none;
  color: #222;
}

/* main */
.main-section {
  padding: 70px 20px;
  text-align: center;
  background: #f4f4f4;
}
.main-section h1 {
  font-size: 2.2rem;
  margin-bottom: 14px;
}
.main-section p {
  font-size: 1rem;
  margin-bottom: 20px;
  color: #555;
}
.main-section button {
  padding: 8px 18px;
  border: none;
  border-radius: 7px;
  background: #333;
  color: #fff;
  cursor: pointer;
}
.main-section button:hover {
  background: #555;
}




/* footer */
.page-footer {
  padding: 16px;
  text-align: center;
  background: #eaeaea;
  color: #444;
  margin-top: 35px;
}
</style>