// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    AZURE_OPENAI_ENDPOINT: process.env.AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_KEY: process.env.AZURE_OPENAI_KEY,
    AZURE_SEARCH_ENDPOINT: process.env.AZURE_SEARCH_ENDPOINT,
    AZURE_SEARCH_KEY: process.env.AZURE_SEARCH_KEY,
    AZURE_SEARCH_INDEX: process.env.AZURE_SEARCH_INDEX,
    AZURE_OPENAI_EMBEDDINGS: process.env.AZURE_OPENAI_EMBEDDINGS,
    AZURE_OPENAI_CHAT_DEPLOYMENT_NAME:
      process.env.AZURE_OPENAI_CHAT_DEPLOYMENT_NAME,
    EXTENSIONS: process.env.EXTENSIONS,
    SYSTEM_PROMPT: process.env.SYSTEM_PROMPT
  },
  devtools: { enabled: true },
  modules: ['@nuxt/ui'],

  ui: {
    icons: ['fluent']
  },
  //ssr: false,
  colorMode: {
    preference: 'dark'
  }
})
