import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";

export const useAudioStore = defineStore("audio", () => {
  const data = ref([]);
  let playing = ref(false);
  const currentTime = ref();
  const audio = new Audio();
  audio.ontimeupdate = () => {
    currentTime.value = audio.currentTime;
  };
  const duration = reactive({
    minutes: 0,
    seconds: 0,
  });
  // const minutes = ref();
  // const seconds = ref();
  audio.onloadedmetadata = () => {
    duration.minutes = Math.floor(audio.duration / 60);
    duration.seconds = Math.round(audio.duration % 60);
  };
  const current = ref({
    title: "",
    album: "",
    artist: "",
    genre: "",
    year: "",
    url: "",
    image_url: "",
  });
  const getTracks = async () => {
    let req = await fetch("http://localhost:3000/tracks");
    if (req.ok) {
      let res = await req.json();
      res.forEach((item) => {
        data.value.push({ active: false, ...item });
      });
    } else {
      alert(`Oops! Something went wrong... ${req.status} ${req.statusText}`);
    }
  };

  return { data, current, duration, currentTime, playing, audio, getTracks };
});
