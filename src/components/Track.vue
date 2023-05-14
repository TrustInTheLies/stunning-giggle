<script setup>
import { ref } from "vue";
import { useAudioStore } from "@/stores/audio";

const store = useAudioStore();
const props = defineProps({
  data: Object,
});

const play = () => {
  store.data.forEach((item) => {
    item.active = false;
  });
  if (store.audio.src !== props.data.url) {
    store.audio.src = props.data.url;
    store.current = { ...props.data };
  }
  props.data.active = true;
  store.current.active = true;
  store.current = { ...props.data };
  if (store.audio.paused) {
    store.audio.play();
  } else {
    props.data.active = false;
    store.current.active = false;
    store.audio.pause();
  }
};
</script>

<template>
  <div class="track" :data-genre="props.data.genre">
    <div class="meta">
      <img class="cover" :src="props.data.image_url" alt="album" />
      <div class="data">
        <p class="artist line">{{ props.data.artist }}</p>
        <h3 class="title line">{{ props.data.title }}</h3>
        <p class="album">
          {{ props.data.album }}
          <span class="year">(from {{ props.data.year }})</span>
        </p>
      </div>
    </div>
    <img
      v-if="!props.data.active"
      class="play"
      src="../assets/play.png"
      alt=""
      @click="play"
    />
    <img
      v-if="props.data.active"
      class="play"
      src="../assets/pause.png"
      alt=""
      @click="play"
    />
  </div>
</template>

<style scoped>
.line {
  display: inline;
  margin-right: 10px;
}
.title {
  font-size: 26px;
}
.artist {
  font-size: 18px;
}
.meta {
  display: flex;
  align-items: center;
}
.cover {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin-right: 20px;
}
.track {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 30px;
}
.play {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
</style>
