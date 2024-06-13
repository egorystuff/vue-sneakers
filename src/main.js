import './assets/main.css'
import { createWebHistory, createRouter } from 'vue-router'
import { createApp } from 'vue'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import App from './App.vue'
import TheHome from './pages/TheHome.vue'
import TheFavorites from './pages/TheFavorites.vue'
import TheSneaker from './pages/TheSneaker.vue'

const app = createApp(App)

const routes = [
  { path: '/', name: 'Home', component: TheHome },
  { path: '/favorites', name: 'Favorites', component: TheFavorites },
  { path: '/sneaker', name: 'Sneaker', component: TheSneaker }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

app.use(autoAnimatePlugin)
app.use(router)
app.mount('#app')
