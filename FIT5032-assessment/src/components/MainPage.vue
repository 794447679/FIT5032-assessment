<template>
  <div>
    <BHeader />

    <section class="main-section">
      <h1>Welcome to Men's Health</h1>
      <p>This is a website that teaches men how to manage their health.</p>

      <!-- article list (each box takes full width) -->
      <div class="article-list">
        
        <RouterLink to="/article1" class="article-box">
          <h3>How is Men’s Health Different from Women’s?</h3>
        </RouterLink>

    
      </div>
    </section>

    <footer class="page-footer">
      <p>© 2025 Men's Health</p>
    </footer>
  </div>
</template>

<script setup>
import BHeader from "@/components/Bheader.vue"
</script>

<style scoped>
/* main section */
.main-section {
  padding: 50px 20px;
  text-align: center;
  background: #f4f4f4;
}

/* list layout */
.article-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  max-width: 700px;
  margin: 30px auto 0;
}

/* each box full width */
.article-box {
  display: block;
  padding: 20px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  text-decoration: none;
  color: #222;
  text-align: left;
  transition: 0.2s;
}
.article-box:hover {
  background: #f9f9f9;
  border-color: #bbb;
}
.article-box h3 {
  margin: 0;
  font-size: 1.2rem;
}
</style>