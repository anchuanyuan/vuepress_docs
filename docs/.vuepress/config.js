module.exports = {
    title: 'yuan',
    description: 'yuan',
    base: '/vuepress_blog/',
    head: [
        [
            'link',
            {
                rel: 'icon',
                href: '/favicon.ico'
            }
        ],
        [
            'meta',
            {
                name: 'viewport',
                content: 'width=device-width,initial-scale=1,user-scalable=no'
            }
        ]
    ],
    theme: 'reco',
    themeConfig: {
        noFoundPageByTencent: false,
        nav: [
            {
                text: '首页',
                link: '/',
                icon: 'reco-home'
            },
            {
                text: '时间轴',
                link: '/timeline/',
                icon: 'reco-date'
            },

            {
                text: '关于我',
                link: '/about'
            },
            {
                text: 'Contact',
                icon: 'reco-message',
                items: [
                    {
                        text: 'GitHub',
                        link: '',
                        icon: 'reco-github'
                    }
                ]
            }
        ],
        type: 'blog',
        blogConfig: {
            category: {
                location: 2,
                text: '分类'
            },
            tag: {
                location: 3,
                text: '标签'
            }
        },
        friendLink: [
            {
                title: '午后南杂',
                desc: 'Enjoy when you can, and endure when you must.',
                email: '1156743527@qq.com',
                link: 'https://www.recoluan.com'
            },
            {
                title: 'vuepress-theme-reco',
                desc: 'A simple and beautiful vuepress Blog & Doc theme.',
                avatar:
                    'https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png',
                link: 'https://vuepress-theme-reco.recoluan.com'
            }
        ],
        logo: '/logo.png',
        search: true,
        searchMaxSuggestions: 10,
        sidebar: 'auto',
        sidebarDepth: 5,
        lastUpdated: 'Last Updated',
        author: 'yuan',
        authorAvatar: '/avatar.png',
        record: 'xxxx',
        startYear: '2017'
    },
    markdown: {
        lineNumbers: true
    },
    plugins: [
        [
            '@vuepress-reco/vuepress-plugin-kan-ban-niang',
            {
                theme: ['z16'],
                clean: false,
                messages: {
                    welcome: '欢迎你的关注 ',
                    home: '心里的花，我想要带你回家。',
                    theme: '好吧，希望你能喜欢我的其他小伙伴。',
                    close: '再见哦'
                }
            }
        ]
    ]
}
