import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);

app.directive("focuss", {
  created(el) {
    el.addEventListener("mouseover", () => {
      el.style.fontSize = "30px";
    });
    el.addEventListener("mouseleave", () => {
      el.style.fontSize = "15px";
    });
  },
});

app.mount("#app");
