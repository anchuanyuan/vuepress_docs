## vue3 stylelint

stylelint.config.js
```js

    module.exports = {
      extends: [
        'stylelint-config-standard',
        'stylelint-config-rational-order',
        'stylelint-config-recommended-vue',
      ],
      overrides: [
        {
          files: ["**/*.{html,vue}"],
          customSyntax: "postcss-html"
        },
        {
          files: ["**/*.less"],
          customSyntax: "postcss-less"
        },
      ],
      rules: {
        'at-rule-no-unknown': [
          true,
          {
            ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'layer'],
          },
        ],
        'declaration-block-trailing-semicolon': null,
        'no-descending-specificity': null,
        'selector-class-pattern': null, // css类名校验
      },
    }
```


'<style>'处的CssSyntaxError报错：缺少对'<style>'的解析，在stylelint.config.js中配置overrides对'<style>'的解析即可。
报opts.node.rangeBy is not a function错误：缺少postcss-scss依赖

stylelint 中文文档：

[用户指南]https://cloud.tencent.com/developer/chapter/18030
