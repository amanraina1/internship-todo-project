<template>
  <body class="hold-transition sidebar-mini layout-fixed">
    <div class="wrapper">
      <!-- <Preloader></Preloader> -->
      <Navbar></Navbar>
      <Sidebar></Sidebar>
      <div class="content-wrapper">
        <!-- <ContentHeader></ContentHeader> -->

        <section class="content">
          <div class="container-fluid d-flex flex-column align-items-center">
            <!-- <router-view /> -->
          </div>
        </section>
      </div>

      <Footer></Footer>
      <!-- <ContentSidebar></ContentSidebar> -->
    </div>
  </body>
</template>

<script>
import Navbar from "./dashboard/Navbar.vue";
import Sidebar from "./dashboard/Sidebar.vue";
import Footer from "./dashboard/Footer.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Sidebar,
    Footer,
  },
};
</script>
