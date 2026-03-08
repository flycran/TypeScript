import DefaultTheme from 'vitepress/theme'
import { useData } from 'vitepress'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import FindSyntaxKind from '../components/FindSyntaxKind.vue'
import FindSymbolFlags from '../components/FindSymbolFlags.vue'
import FindTypeFlags from '../components/FindTypeFlags.vue'
import FindNodeFlags from '../components/FindNodeFlags.vue'
import AstViewer from '../components/AstViewer.vue'
import type { App } from 'vue'
import { watch } from 'vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import './element-theme.css'
import 'splitpanes/dist/splitpanes.css'

export default {
  extends: DefaultTheme,
  enhanceApp({ app }: { app: App }) {
    app.use(ElementPlus)
    app.component('FindSyntaxKind', FindSyntaxKind)
    app.component('FindSymbolFlags', FindSymbolFlags)
    app.component('FindTypeFlags', FindTypeFlags)
    app.component('FindNodeFlags', FindNodeFlags)
    app.component('AstViewer', AstViewer)
  },
  setup() {
    const { isDark } = useData()
    watch(isDark, (val) => {
      document.documentElement.classList.toggle('dark', val)
    }, { immediate: true })
  }
}
