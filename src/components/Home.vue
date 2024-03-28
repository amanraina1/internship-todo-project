<script setup>
import store from "@/store";
import { ref, onMounted, computed } from "vue";
import { useToast } from "../../node_modules/vue-toastification";
const toast = useToast();
let data = ref([]);
const page = ref(1);
const TODO_PER_PAGE = 12;
let count = ref(false);
const dummyTodos = ref([]);
const isOpen = ref(false);
const id = ref();

onMounted(async () => {
  await store.dispatch("fetchTodos");
  data.value = store.getters.getAllTodos;
  dummyTodos.value = [...data.value];
  filterTodo();
});
const showModal = (todoId) => {
  isOpen.value = true;
  id.value = todoId;
};
const displayedTodos = computed(() => {
  return data.value.slice(
    page.value * TODO_PER_PAGE - TODO_PER_PAGE,
    page.value * TODO_PER_PAGE
  );
});
const deleteTodo = async (id) => {
  await store.dispatch("deleteTodo", id);
  data.value = store.getters.getAllTodos;
  isOpen.value = false;
  count.value = false;
  toast.success("Deleted Successfully");
};
// Filter todos on the basis of length
const wordLengthWithoutSpacing = (str) => str.replace(/\s/g, "").length;
const filterTodo = () => {
  if (!count.value) {
    data.value = [...dummyTodos.value];
    count.value = true;
  } else {
    data.value.sort(
      (a, b) =>
        wordLengthWithoutSpacing(a.title) - wordLengthWithoutSpacing(b.title)
    );
    count.value = false;
  }
};
const selectPageHandler = (i) => {
  if (i >= 1 && i <= Math.ceil(data.value.length / 12) && i !== page.value)
    page.value = i;
};
const toggleCheckbox = async (id, completed) => {
  const payload = {
    id,
    completed: !completed,
  };
  await store.dispatch("updateCheckbox", payload);
  data.value = store.getters.getAllTodos;
};
</script>

<template>
  <div class="root">
    <Teleport to="body">
      <div v-if="isOpen" class="modal">
        <div>
          <h1>Are you sure you want to Delete ?</h1>
          <button class="bg-red" @click="deleteTodo(id)">Yes</button>
          <button class="bg-primary" @click="isOpen = false">No</button>
        </div>
      </div>
    </Teleport>
  </div>

  <div class="card container-fluid">
    <div class="card-header">
      <h3 class="card-title">Todo List</h3>
    </div>

    <div class="card-body">
      <div id="example2_wrapper" class="dataTables_wrapper dt-bootstrap4">
        <div class="row mb-2">
          <div class="col-sm-12 text-center col-md-12">
            <button @click="filterTodo" class="bg-blue border-none">
              {{ count ? "Sort Todo" : "List Todo" }}
            </button>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12">
            <table
              id="example2"
              class="table table-bordered table-hover dataTable dtr-inline"
              aria-describedby="example2_info"
            >
              <thead>
                <tr>
                  <th
                    class="sorting sorting_asc"
                    tabindex="0"
                    aria-controls="example2"
                    rowspan="1"
                    colspan="1"
                    aria-sort="ascending"
                    aria-label="Rendering engine: activate to sort column descending"
                  >
                    ID No.
                  </th>
                  <th
                    class="sorting"
                    tabindex="0"
                    aria-controls="example2"
                    rowspan="1"
                    colspan="2"
                    aria-label="Browser: activate to sort column ascending"
                  >
                    Title
                  </th>
                  <th
                    class="sorting"
                    tabindex="0"
                    aria-controls="example2"
                    rowspan="1"
                    colspan="1"
                    aria-label="Platform(s): activate to sort column ascending"
                  >
                    Status
                  </th>
                  <th
                    class="sorting"
                    tabindex="0"
                    aria-controls="example2"
                    rowspan="1"
                    colspan="1"
                    aria-label="Engine version: activate to sort column ascending"
                  >
                    Action Button
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="todo in displayedTodos">
                  <td tabindex="0">{{ todo.id }}</td>
                  <td
                    @dblclick="toggleCheckbox(todo.id, todo.completed)"
                    style="cursor: pointer"
                    colspan="2"
                    class="title"
                    :class="todo.completed ? 'disable' : ''"
                  >
                    {{ todo.title }}
                  </td>
                  <td v-if="todo.completed">Completed ✅</td>
                  <td v-else>Pending</td>
                  <td class="d-flex align-items-center justify-content-around">
                    <i
                      @click="showModal(todo.id)"
                      style="cursor: pointer"
                      title="Delete"
                      class="fas fa-trash"
                    ></i>
                    <router-link :to="'/edit/' + todo.id">
                      <i
                        style="cursor: pointer"
                        title="Update"
                        class="fas fa-edit text-dark"
                      ></i>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="row">
          <div class="col-sm-12 col-md-5">
            <div
              class="dataTables_info"
              id="example2_info"
              role="status"
              aria-live="polite"
            >
              Showing {{ page * TODO_PER_PAGE - TODO_PER_PAGE + 1 }} to
              {{ Math.min(page * TODO_PER_PAGE, data.length) }} of
              {{ data.length }} entries
            </div>
          </div>
          <div
            style="cursor: pointer"
            class="col-sm-12 d-flex justify-content-end col-md-7"
          >
            <div
              class="dataTables_paginate paging_simple_numbers"
              id="example2_paginate"
            >
              <ul v-if="data.length > 0" class="pagination">
                <li
                  :class="page === 1 ? 'pagination__disable' : ''"
                  class="paginate_button page-item previous"
                  id="example2_previous"
                >
                  <span
                    @click="selectPageHandler(page - 1)"
                    data-dt-idx="0"
                    tabindex="0"
                    class="page-link"
                    >Previous</span
                  >
                </li>
                <li
                  :class="page === i + 1 ? 'active' : ''"
                  v-for="(_, i) in [...Array(Math.ceil(data.length / 12))]"
                  @click="selectPageHandler(i + 1)"
                  class="paginate_button page-item"
                >
                  <span
                    aria-controls="example2"
                    data-dt-idx="1"
                    tabindex="0"
                    class="page-link"
                    >{{ i + 1 }}</span
                  >
                </li>

                <li class="paginate_button page-item next" id="example2_next">
                  <span
                    :class="
                      page === Math.ceil(data.length / 12)
                        ? 'pagination__disable'
                        : ''
                    "
                    @click="selectPageHandler(page + 1)"
                    aria-controls="example2"
                    data-dt-idx="7"
                    tabindex="0"
                    class="page-link"
                    >Next</span
                  >
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.root {
  position: relative;
}
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal h1 {
  color: aliceblue;
}
.modal > div {
  background-color: #2f2e2eef;
  padding: 50px;
  border-radius: 10px;
}
.modal > div button {
  padding: 10px 30px;
  margin: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: larger;
  font-weight: 800;
}
.pagination__disable {
  opacity: 0;
}
.disable {
  color: gray;
  text-decoration: line-through;
}
</style>
