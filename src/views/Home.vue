<template>
  <div class="wrapper">
    <h2>Home</h2>
    <div class="tracks">
      <Track v-for="item in store.data" :data="item"></Track>
    </div>
    <Player
      v-if="store.current.url.length > 0"
      @loadeddata="store.current.duration = store.audio.duration"
    ></Player>
  </div>
</template>

<script setup>
import { onBeforeMount, onMounted, ref, watch } from "vue";
import Track from "@/components/Track.vue";
import Player from "@/components/Player.vue";
import { useAudioStore } from "@/stores/audio";

const store = useAudioStore();

onBeforeMount(() => {
  store.getTracks();
});
</script>

<style>
.tracks {
  height: 61vh;
  overflow-y: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.tracks::-webkit-scrollbar {
  display: none;
}

body {
  overflow-y: hidden;
}
</style>
