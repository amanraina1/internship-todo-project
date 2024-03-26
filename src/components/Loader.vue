<script setup></script>

<template>
  <!-- Todo List Code -->

  <div class="container bg-grey">
    <div class="profile">
      <span class="img">
        <img
          class="mx-2"
          src="../assets/img/default-150x150.png"
          alt="user avatar"
        />
        <b>---- </b>
      </span>
      <span>
        <label for="completed">
          <input type="checkbox" name="completed" />
          -------
        </label>
      </span>
    </div>

    <h4>Loading....</h4>

    <div class="button">
      <button class="bg-lightgrey delete-icon">-------</button>
      <router-link to="/">
        <button class="bg-lightgrey edit-icon">-------</button>
      </router-link>
    </div>
  </div>
</template>
<style scoped>
.container {
  width: 400px;
  height: 220px;
  display: flex;
  justify-content: center;
  border: 2px solid black;
  align-items: center;
  flex-wrap: wrap;
  margin: 10px;
  border-radius: 20px;
}
.container .profile {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  font-weight: 900;
}

.container img {
  width: 40px;
}

.container .button {
  display: flex;
  justify-content: space-evenly;
  height: 20%;
  width: 100%;
}

.container a {
  display: flex;
  align-items: center;
  width: 40%;
}

.container .delete-icon {
  border: none;
  width: 40%;
  align-self: center;
  border-radius: 50px;
  padding: 5px 10px;
  background-color: rgb(154, 154, 154);
  color: white;
  cursor: pointer;
}

.container .edit-icon {
  border: none;
  width: 100%;
  align-self: center;
  border-radius: 50px;
  padding: 5px 10px;
  background-color: rgb(154, 154, 154);
  color: white;
  cursor: pointer;
}
</style>
