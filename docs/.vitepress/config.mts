import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/TypeScript/',
  title: "TypeScript API 文档",
  description: "TypeScript 编译器 API 文档",
  themeConfig: {
    search: {
      provider: 'local'
    },
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'AST 基础', link: '/ast-basics' },
      { text: '类型系统', link: '/type-interfaces' },
    ],

    sidebar: [
      {
        text: '快速入门',
        items: [
          { text: 'AST 基础', link: '/ast-basics' },
          { text: '工具函数', link: '/utilities' },
        ]
      },
      {
        text: '类型系统',
        items: [
          { text: '类型接口', link: '/type-interfaces' },
          { text: '类型节点', link: '/type-nodes' },
          { text: '类型检查器', link: '/typechecker' },
        ]
      },
      {
        text: '进阶',
        items: [
          { text: 'Symbol', link: '/symbol' },
          { text: '语言服务', link: '/language-service' },
          { text: '插件', link: '/plugin' },
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/microsoft/TypeScript' }
    ]
  }
})
