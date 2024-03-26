import { createStore } from "vuex";
import axios from "axios";
import router from "./routes";

const store = createStore({
  state: {
    todos: [],
  },
  getters: {
    getAllTodos: (state) => {
      return state.todos;
    },
  },
  actions: {
    async fetchTodos({ commit }) {
      const response = await axios.get("http://localhost:3000/todos");
      commit("setTodos", response.data);
    },
    async addTodo({ commit }, payload) {
      const response = await axios.post("http://localhost:3000/todos", {
        title: payload.title,
        completed: payload.completed,
      });
      if (response.status === 201) {
        await router.push("/");
      }

      commit("addTodo", response.data);
    },
    async updateTodo({ commit }, payload) {
      const response = await axios.patch(
        `http://localhost:3000/todos/${payload.id}`,
        {
          title: payload.title,
          completed: payload.completed,
        }
      );
      if (response.status === 200) {
        await router.push("/");
      }

      commit("updateTodo", payload);
    },
    async updateCheckbox({ commit }, payload) {
      console.log(payload);
      const response = await axios.patch(
        `http://localhost:3000/todos/${payload.id}`,
        {
          completed: payload.completed,
        }
      );
      if (response.status === 200) {
        await router.push("/");
      }

      commit("updateCheckbox", payload);
    },
    async deleteTodo({ commit }, id) {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      commit("deleteTodo", id);
    },
  },
  mutations: {
    setTodos: (state, todos) => (state.todos = todos),
    addTodo: (state, todo) => state.todos.unshift(todo),
    deleteTodo: (state, id) =>
      (state.todos = state.todos.filter((todo) => todo.id !== id)),
    updateTodo: (state, data) => {
      const todo = state.todos.find((todo) => todo.id === Number(data.id));
      todo.title = data.title;
      todo.completed = data.completed;
    },
    updateCheckbox: (state, data) => {
      const todo = state.todos.find((todo) => todo.id === Number(data.id));
      todo.completed = data.completed;
    },
  },
});
export default store;
