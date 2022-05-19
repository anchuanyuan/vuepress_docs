import {defineUserConfig,defaultTheme} from 'vuepress'
import { codeBlockPlugin } from "@yanyu-fe/vuepress-plugin-code-block";

export default defineUserConfig({
    title: "组件库",
    plugins:[codeBlockPlugin()],
    locales: {
        "/": {
            lang: "zh-ch"
        }
    },
    theme: defaultTheme({
        navbar: [
            // NavbarItem
            {
                text: '组件',
                link: '/components/',
            },

        ],
        sidebar: [
    /*        // SidebarItem
            {
                text: '按钮',
                link: '/foo/',
                children: [
                    // SidebarItem
                    {
                        text: 'github',
                        link: 'https://github.com',
                        children: [],
                    },
                    // 字符串 - 页面文件路径
                    '/foo/bar.md',
                ],
            },*/
            // 字符串 - 页面文件路径
            'components/button/index.md',
        ],
    }),
})
