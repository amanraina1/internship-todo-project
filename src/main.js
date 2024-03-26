import { createApp } from "vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@fortawesome/fontawesome-free/css/all.css";
import router from "./routes";
import App from "./App.vue";
import store from "./store.js";
import "admin-lte/dist/css/adminlte.min.css";
import "admin-lte/dist/js/adminlte.min.js";
import Toast from "../node_modules/vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);
app.component("font-aweosme-icon", FontAwesomeIcon);
app.use(Toast);
app.use(router);
app.use(store);
app.mount("#app");
