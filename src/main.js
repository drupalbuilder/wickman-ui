import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Ensure this line imports your router
import './index.css'; // or your main CSS file
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import vue3GoogleLogin from 'vue3-google-login';
import 'slick-carousel';

<script src="https://cdn.tailwindcss.com"></script>

const CLIENT_ID = "443909802788-uqen9a4to31d21eejfd4j2kb4hdnqh3c.apps.googleusercontent.com";

const app = createApp(App)

.use(vue3GoogleLogin,{
  clientId: CLIENT_ID,
});

app.use(router); // Ensure to use the router here

app.mount('#app');
