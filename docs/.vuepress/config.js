module.exports = {
    title: 'yuan',
    description: 'yuan',
    base: '/vuepress_blog/', // for Gitee
    // base: '/', // for GitHub
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
                        text: 'qq',
                        link: '1162734640',
                        icon: 'reco-qq'
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
        sidebarDepth: 6,
        lastUpdated: 'Last Updated',
        author: 'yuan',
        authorAvatar: '/avatar.png'
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
        ],
        [
            '@vuepress-reco/vuepress-plugin-bgm-player',
            {
                audios: [
                    {
                        name: '功成名就',
                        artist: '收听列表',
                        url:
                        'http://qrp1y47uy.hn-bkt.clouddn.com/%E5%BE%A1%E9%B9%BF%E7%A5%9E%E8%B0%B7%E3%80%81%E6%BC%86%E6%9F%9A%20-%20%E5%8A%9F%E6%88%90%E5%90%8D%E5%B0%B1.mp3',
                        cover:
                            'http://p1.music.126.net/oDiEku7wY0a3BWRXFA7Gqg==/109951164530191765.jpg?param=300x300'
                    },
                    ,
                    {
                        name: '大城小爱',
                        artist: '收听列表',
                        url:
                            'http://qrp1y47uy.hn-bkt.clouddn.com/%E6%9D%8E%E8%8D%A3%E6%B5%A9%20-%20%E5%A4%A7%E5%9F%8E%E5%B0%8F%E7%88%B1%20%28Live%29.lrc',
                        cover:
                            'https://y.gtimg.cn/music/photo_new/T002R300x300M000002OR8wD3Lo3E5_1.jpg?max_age=2592000?param=300x300'
                    },
                    {
                        name: '交换余生',
                        artist: ' 收听列表',
                        url:
                            'http://qrp1y47uy.hn-bkt.clouddn.com/%E6%9E%97%E4%BF%8A%E6%9D%B0%20-%20%E4%BA%A4%E6%8D%A2%E4%BD%99%E7%94%9F.mp3',
                        cover:
                            'http://p1.music.126.net/HBzkUXwTlbUsH6OJvdWCVg==/109951164927567872.jpg?param=300x300'
                    }
                ]
            }
        ]
    ]
}
