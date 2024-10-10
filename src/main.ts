import './assets/main.scss'
import './main.css'
import 'element-plus/dist/index.css'
import { createApp } from 'vue'
import pinia from '@/stores/index'
// import VueMarkdownEditor from '@kangc/v-md-editor'
import '@kangc/v-md-editor/lib/style/base-editor.css'
// import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js'
import '@kangc/v-md-editor/lib/theme/style/vuepress.css'
import App from './App.vue'
import Prism from 'prismjs'
import router from './router'
import myDialog from './views/alarms/manage/myDialog.vue' 
//国际化
// import i18n from './i18n/i18n';
// import ElementPlus from 'element-plus';
// import 'element-plus/lib/theme-chalk/index.css';
// import { createPinia } from 'pinia'

const app = createApp(App)
// const pinia = createPinia()
app.use(pinia)
app.use(router)

// VueMarkdownEditor.use(vuepressTheme, {
//   Prism
// })

// app.use(VueMarkdownEditor)

app.component('myDialog', myDialog)

//国际化
// app.use(ElementPlus, { locale: i18n.global.t }); // 注意：这里的 locale 配置可能不是必需的，因为 Element Plus 会自动使用全局的 $t 函数  
// app.use(i18n);

app.mount('#app')
