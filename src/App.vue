<template>
  <body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
      <!-- <Preloader></Preloader> -->
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div class="content-wrapper">
        <!-- <ContentHeader></ContentHeader> -->

        <section class="content" style="height: 800px">
          <div
            class="container-fluid d-flex flex-column align-items-center"
            style="height: 800px"
          >
            <router-view />
          </div>
        </section>
      </div>

      <!-- <Footer></Footer> -->
      <!-- <ContentSidebar></ContentSidebar> -->
    </div>
  </body>
</template>

<script setup>
import Navbar from "./dashboard/Navbar.vue";
import Sidebar from "./dashboard/Sidebar.vue";
// import Footer from "./dashboard/Footer.vue";
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700&display=fallback");
</style>
