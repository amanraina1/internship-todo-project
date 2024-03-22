import Home from "./components/Home.vue";
import Add from "./components/Add.vue";
import Edit from "./components/Edit.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "Home",
    component: Home,
    path: "/",
  },
  {
    name: "Add",
    component: Add,
    path: "/add",
  },
  {
    name: "Edit",
    component: Edit,
    path: "/edit/:id",
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
