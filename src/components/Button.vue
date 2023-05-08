<script setup>
const props = defineProps({
  title: String,
});
</script>

<template>
  <button class="submit" type="button">{{ props.title }}</button>
</template>

<style scoped>
.submit {
  padding: 10px;
  margin-top: 10px;
  width: 150px;
  margin-left: auto;
  margin-right: auto;
  background-color: transparent;
  color: hsla(160, 100%, 37%, 1);
  border: 2px solid hsla(160, 100%, 37%, 1);
  cursor: pointer;
  border-radius: 5px;
}
</style>
