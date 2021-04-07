
const glob = require("glob")

const examplePages = glob.sync("examples/*/**.md").map(it => it.substring("examples/".length));

examplePages.sort();

module.exports = {
    title: '编程语言简史',
    themeConfig: {
        nav: [
            {text: "开始", link: "/getting-started.md"},
            {text: "连载", link: 'https://mp.weixin.qq.com/mp/appmsgalbum?__biz=MzI0OTQxNjQ4MA==&action=getalbum&album_id=1338601286555598848&scene=173'},
            {text: "示例", link: '/examples/'},
            {text: "资源", link: '/resources/'},
            {text: "反馈", link: 'https://github.com/kenpusney/bhpl/issues'},
        ],

        sidebar: {
            '/resources/': "auto",
            '/examples/': [
                '',
                ...examplePages,
            ],
        },
        search: false,
    },
    markdown: {
        extendMarkdown: md => {
            md.use(require('@area403/markdown-it-mathjax'));
        },
    },

    head: [
        [
            "script",
            {},

            `
var _hmt = _hmt || [];
(function() {
    var hm = document.createElement("script");
    hm.src = "https://hm.baidu.com/hm.js?3f2a76c36bd302d1cd1807e42f7b733d";
    var s = document.getElementsByTagName("script")[0]; 
    s.parentNode.insertBefore(hm, s);
})();
            `
        ]
    ]
}