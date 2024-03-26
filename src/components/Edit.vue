<script setup>
import { onMounted, ref } from "vue";
import router from "@/routes";
import { useToast } from "../../node_modules/vue-toastification";
const toast = useToast();
import { useStore } from "vuex";
const store = useStore();
let completed = ref(false);
let todo = ref([]);

onMounted(async () => {
  const allTodos = store.getters.getAllTodos;
  todo.value = allTodos.find((todo) => todo.id === Number(id));
  title.value = todo.value.title;
  completed.value = todo.value.completed;
});

const id = router.currentRoute.value.params.id;
let title = ref("");

//Function to edit todo
const editTodo = async () => {
  if (title.value === "") {
    toast.error("Title filed must not be empty");
    return;
  }
  if (
    todo.value.title === title.value &&
    completed.value === todo.value.completed
  ) {
    toast.error("No edit was made");
    return;
  }
  const payload = {
    id,
    title: title.value,
    completed: completed.value,
  };

  await store.dispatch("updateTodo", payload);
  toast.success("Edited Successfully!!");
};
</script>
<template>
  <div class="container-sm d-flex justify-content-center align-items-center">
    <div class="card w-50 mt-5 card-primary">
      <div class="card-header">
        <h3 class="card-title">Edit Todo</h3>
      </div>
      <form>
        <div class="card-body">
          <div class="form-group">
            <label for="exampleInputEmail1">Edit Title</label>
            <input
              type="text"
              name="title"
              v-model="title"
              class="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Title"
            />
          </div>
          <div class="form-group d-flex">
            <label for="exampleInputEmail1">Completed</label>
            <input
              type="checkbox"
              name="title"
              v-model="completed"
              class="form-control"
              id="exampleInputEmail1"
            />
          </div>
        </div>

        <div class="card-footer">
          <button @click="editTodo" type="button" class="btn btn-primary">
            Edit Todo
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
