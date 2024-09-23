import "./assets/main.scss"
import './main.css'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import pinia from '@/stores/index'
import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import App from './App.vue'
import Prism from 'prismjs'
import router from './router'

const app = createApp(App)

app.use(pinia)
app.use(router)


VueMarkdownEditor.use(vuepressTheme, {
  Prism,
});

app.use(VueMarkdownEditor)

app.mount('#app')
