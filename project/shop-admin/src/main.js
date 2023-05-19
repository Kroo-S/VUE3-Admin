import { createApp } from 'vue'
// import './style.css'
import App from './App.vue'

//引入element plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入windi css
import 'virtual:windi.css'

// 引入router
import router from './router' 

//引入全部图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 引入状态管理store
import store from './store/index'

//引入路由导航守卫，才能正常使用
import './permission'

// createApp(App).mount('#app')

const app = createApp(App)
app.use(ElementPlus)
app.use(router)

app.use(store)

// 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

//引入nprogress
import "nprogress/nprogress.css"

app.mount('#app')