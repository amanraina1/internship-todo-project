<script setup>
const emit = defineEmits(["filter"]);
const filter = async () => {
  emit("filter");
};
</script>

<template>
  <div @click="filter" class="header">
    <div style="cursor: pointer" class="comp">
      <h4>Filter Todos</h4>
      <span><i class="fas fa-bars"></i></span>
    </div>
  </div>
</template>

<style scoped>
.header {
  width: 100%;
  /* height: 30px; */
  display: flex;
  justify-content: end;
}
.comp {
  width: 12%;
  /* height: 100%; */
  margin-top: 5px;
  border: 1px solid black;
  border-radius: 10px;
  padding-left: 5px;
  display: flex;
  align-items: baseline;
  justify-content: space-evenly;
  /* gap: 10px; */
  color: rgb(65, 168, 228);
}
.comp h4 {
  font-size: 1rem;
}
</style>
