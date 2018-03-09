// Import Vue
import Vue from 'vue';
import MultiLanguage from 'vue-multilanguage';

// import vueConfig from 'vue-config;

// Import F7
import Framework7 from 'framework7/dist/framework7.esm.bundle.js';

// Import F7 Vue Plugin
import Framework7Vue from 'framework7-vue/dist/framework7-vue.esm.bundle.js';

// Import F7 Styles
import Framework7Styles from 'framework7/dist/css/framework7.css';

// Import Icons and App Custom Styles
import IconsStyles from './css/icons.css';
import AppStyles from './css/app.css';

// Import Routes
import Routes from './routes';
// Import Vuex store
import store from './store/store';
// Apollo
import apolloProvider from './apollo/apollo-provider';

// Import Languages
import languages from './languages';

// Import App config
// import appConfigs from './app-config';

// Import App Component
import App from './App.vue';

// Init App config Vue Plugin
// Vue.use(vueConfig, appConfigs);

// Init F7 Vue Plugin
Vue.use(Framework7Vue, Framework7);
// Init Multi-Language plugin for Vue.js

Vue.use(MultiLanguage, languages);

// Init App
const FitLead = new Vue({
  el: '#app',
  template: '<app/>',
  // Init Framework7 by passing parameters here
  framework7: {
    id: 'io.framework7.testapp', // App bundle ID
    name: 'FitLead', // App name
    theme: 'md', // Automatic theme detection
    pushState: true,
    // App routes
    routes: Routes
  },
  store,
  apolloProvider,
  // Register App Component
  components: {
    app: App
  }
});

export default { FitLead };
