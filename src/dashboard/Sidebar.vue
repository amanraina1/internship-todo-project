<template>
  <aside
    style="height: 100%"
    class="main-sidebar sidebar-dark-primary elevation-4"
  >
    <!-- Brand Logo -->
    <a href="#" class="brand-link">
      <img
        src="../assets/img/AdminLTELogo.png"
        alt="AdminLTE Logo"
        class="brand-image img-circle elevation-3"
        style="opacity: 0.8"
      />
      <span class="brand-text font-weight-light">AdminLTE 3</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <!-- <img
            src="../assets/img/avatar5.png"
            class="img-circle elevation-2"
            alt="User Image"
          /> -->
        </div>
        <div class="info">
          <router-link to="/add" class="d-block">Add Todo</router-link>
        </div>
      </div>

      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>
</template>
<script setup>
// import { ref } from "vue";
// const username = ref("Aman");
</script>
