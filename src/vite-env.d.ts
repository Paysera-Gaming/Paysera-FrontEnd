/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_APP_TITLE: string
    // more env variables...
    VITE_BASE_API: string
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }