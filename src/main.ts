import App from "./App.svelte";
import "./app.pcss";

import i18next from "i18next";
import { z } from "zod";
import { zodI18nMap } from "zod-i18n-map";
import translation from "zod-i18n-map/locales/pt/zod.json";

i18next.init({
  lng: "pt",
  resources: {
    es: { zod: translation },
  },
});
z.setErrorMap(zodI18nMap);

const app = new App({
  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  target: document.getElementById("app")!,
});

export default app;
