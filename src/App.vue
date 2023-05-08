<script setup></script>

<template>
  <header>
    <h1 class="title">Music</h1>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/register">Register</RouterLink>
      <RouterLink to="/login">Login</RouterLink>
    </nav>
  </header>
  <RouterView v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <Component :is="Component"></Component>
    </Transition>
  </RouterView>
</template>

<style scoped>
.title {
  font-size: 60px;
}
header {
  display: flex;
  padding: 30px;
  align-items: center;
  justify-content: space-between;
}
a {
  font-size: 20px;
  margin-right: 20px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
