import './assets/main.css'

import {createApp} from 'vue'
import {library} from "@fortawesome/fontawesome-svg-core";
import {faUserSecret} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import App from './App.vue'
import './styles/index.css'
library.add(faUserSecret)
createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')

