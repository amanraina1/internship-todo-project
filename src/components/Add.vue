<script setup>
import { ref } from "vue";
import { useToast } from "../../node_modules/vue-toastification";
const toast = useToast();
import store from "@/store";
const title = ref("");

const addTodo = async () => {
  if (title.value === "") {
    toast.error("Title filed must not be empty");
    return;
  }
  await store.dispatch("addTodo", {
    title: title.value,
    completed: false,
  });
  toast.success("Added Successfully!!");
};
</script>
<template>
  <div class="container-sm d-flex justify-content-center align-items-center">
    <div class="card w-50 mt-5 card-primary">
      <div class="card-header">
        <h3 class="card-title">Add Todo</h3>
      </div>
      <form>
        <div class="card-body">
          <div class="form-group">
            <label for="exampleInputEmail1">Add Title</label>
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
          <button @click="addTodo" type="button" class="btn btn-primary">
            Add Todo
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
