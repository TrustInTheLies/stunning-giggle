<script setup>
import { ref } from "vue";
import Button from "@/components/Button.vue";
import router from "@/router";

const props = defineProps({
  title: String,
  task: String,
  btn: String,
  goto: String,
});

let login = ref("");
let password = ref("");
let res = ref("");

const validate = () => {
  if (login.value === "") {
    res.value = "Provide login";
  } else if (password.value === "") {
    res.value = "Provide password";
  } else {
    register();
  }
};

const register = async () => {
  let req = await fetch(`http://localhost:3000/${props.task}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ login: login.value, password: password.value }),
  });

  if (req.ok) {
    res.value = "Congratulations! You'll be redirected shortly...";
    setTimeout(() => {
      router.push({ name: props.goto });
    }, 3000);
  } else {
    res.value = `Oops! ${await req.json()}`;
  }
};
</script>

<template>
  <form>
    <h3>{{ title }}</h3>
    <label for="login">Login</label>
    <input type="text" name="login" id="login" v-model="login" />
    <label for="password">Password</label>
    <input type="password" name="password" id="password" v-model="password" />
    <Button @click="validate" :title="props.btn"></Button>
  </form>
  <p>{{ res }}</p>
</template>

<style scoped>
form {
  width: 30%;
  margin-right: auto;
  margin-left: auto;
  display: flex;
  flex-direction: column;
}
h3 {
  text-align: center;
  font-size: 30px;
}
p {
  text-align: center;
}
</style>
