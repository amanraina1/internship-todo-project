<script setup>
import { onMounted, ref } from "vue";
import router from "@/routes";
import { useStore } from "vuex";
const store = useStore();

onMounted(async () => {
  const allTodos = store.getters.getAllTodos;
  const todo = allTodos.find((todo) => todo.id === Number(id));
  title.value = todo.title;
});

const id = router.currentRoute.value.params.id;
let title = ref("");

const editTodo = async () => {
  const payload = {
    id,
    title: title.value,
  };
  await store.dispatch("updateTodo", payload);
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
              name="name"
              v-model="title"
              class="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Title"
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
