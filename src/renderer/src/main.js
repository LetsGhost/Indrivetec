import { createApp } from 'vue'
import './styles/main.scss'
import App from './App.vue'

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import {
  faBars,
  faPenToSquare,
  faXmark,
  faX,
  faPlus,
  faArrowDown,
  faArrowUp,
  faMinus,
  faGlobe,
  faTrashAlt,
  faCircleMinus,
  faCheck
} from '@fortawesome/free-solid-svg-icons'
library.add(
  faPenToSquare,
  faXmark,
  faBars,
  faX,
  faPlus,
  faArrowDown,
  faArrowUp,
  faMinus,
  faGlobe,
  faTrashAlt,
  faCircleMinus,
  faCheck
)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
