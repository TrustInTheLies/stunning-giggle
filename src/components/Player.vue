<script setup>
import { useAudioStore } from "@/stores/audio";
import { ref } from "vue";

const store = useAudioStore();
let time = ref(store.audio.currentTime);
const play = () => {
  store.audio.currentTime = 0;
  if (store.audio.paused) {
    store.data.forEach((item) => {
      if (item.url === store.current.url) {
        item.active = !item.active;
      }
    });
    store.audio.play();
    store.current.active = true;
  } else {
    store.data.forEach((item) => {
      if (item.url === store.current.url) {
        item.active = !item.active;
      }
    });
    store.current.active = false;
    store.audio.pause();
  }
};
const updateTime = () => {
  store.audio.currentTime = store.currentTime;
};
</script>

<template>
  <div class="track player" :data-genre="store.current.genre">
    <div class="meta">
      <img class="cover" :src="store.current.image_url" alt="album" />
      <div class="main">
        <div class="data">
          <p class="artist line">{{ store.current.artist }}</p>
          <h3 class="title line">{{ store.current.title }}</h3>
          <p class="album line">
            {{ store.current.album }}
            <span class="year">(from {{ store.current.year }})</span>
          </p>
        </div>
        <div class="controls">
          <p>0:00</p>
          <input
            type="range"
            :max="Math.floor(store.audio.duration)"
            step="1"
            v-model="store.currentTime"
            @change="updateTime"
          />
          <p>
            {{ store.duration.minutes }}:{{
              store.duration.seconds === 0 ? "00" : store.duration.seconds
            }}
          </p>
        </div>
      </div>
    </div>

    <audio :src="store.current.url" ref="audio"></audio>
    <img
      v-if="!store.current.active"
      class="play"
      src="../assets/play.png"
      alt=""
      @click="play"
    />
    <img
      v-if="store.current.active"
      class="play"
      src="../assets/pause.png"
      alt=""
      @click="play"
    />
  </div>
</template>

<style scoped>
input {
  width: 400px;
}
.controls {
  display: flex;
  justify-content: space-between;
}
.line {
  display: inline;
  margin-right: 30px;
}
.title {
  font-size: 20px;
}
.artist {
  font-size: 14px;
}
.album {
  font-size: 14px;
}
.meta {
  display: flex;
  align-items: center;
}
.cover {
  width: 150px;
  height: 150px;
  border-radius: 50%;
  margin-right: 20px;
}
.track {
  width: 100%;
  position: sticky;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 30px;
  margin-top: 30px;
}
.player {
  margin: 0;
}
.play {
  width: 50px;
  height: 50px;
  cursor: pointer;
}
</style>
