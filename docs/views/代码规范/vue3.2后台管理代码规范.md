---
title: vue3.2后台管理
date: 2021-08-21
sidebarDepth: 4
tags:
- 代码风格
categories:
- 规范
---

# vue3.2后台管理

## 创建项目

```bash
# 安装pnpm
npm i pnpm -g
# 创建vue项目
pnpm create vue
```

ts pinia vue-router eslint prettier  其他的暂时不选

```bash
# 安装依赖
pnpm i
#运行项目
pnpm dev
```
项目成功运行

## 代码格式化

```bash

pmpm i prettier

```

根目录 新建 .prettierrc.js
```js
module.exports = {
  semi:false, // 不需要分号
  // semi:true,
  trailingComma: "none", // 对象最后不加逗号
  singleQuote: true // 用单引号
}

```

## commit 提交规范

通用示例: (可以根据需要自定义) 
```text

提交 commit 的类型，包括以下几种

feat: 新功能

fix: 修复问题

docs: 修改文档

style: 修改代码格式，不影响代码逻辑

refactor: 重构代码，理论上不影响现有功能

perf: 提升性能

test: 增加修改测试用例

chore: 修改工具相关（包括但不限于文档、代码生成等）

deps: 升级依赖
```

### 安装commitizen 和cz-customizable
```bash
pnpm add commitizen -g
pnpm add cz-customizable -D
```

### package.json添加配置

```
"config": {  
	"commitizen" : {    
		"path" :"node_modules/cz-customizable" 
     }
 }
```

### 新建 cz-config.js 文件

```js
module.exports = {
  // 可选类型
  types: [
    { value: 'feat', name: 'feat:     新功能' },
    { value: 'fix', name: 'fix:      修复' },
    { value: 'docs', name: 'docs:     文档变更' },
    { value: 'style', name: 'style:    代码格式(不影响代码运行的变动)' },
    {
      value: 'refactor',
      name: 'refactor: 重构(既不是增加feature，也不是修复bug)'
    },
    { value: 'perf', name: 'perf:     性能优化' },
    { value: 'test', name: 'test:     增加测试' },
    { value: 'chore', name: 'chore:    构建过程或辅助工具的变动' },
    { value: 'revert', name: 'revert:   回退' },
    { value: 'build', name: 'build:    打包' }
  ],
  // 消息步骤
  messages: {
    type: '请选择提交类型:',
    customScope: '请输入修改范围(可选):',
    subject: '请简要描述提交(必填):',
    body: '请输入详细描述(可选):',
    footer: '请输入要关闭的issue(可选):',
    confirmCommit: '确认使用以上信息提交？(y/n/e/h)'
  },
  // 跳过问题
  skipQuestions: ['body', 'footer'],
  // subject文字长度默认是72
  subjectLimit: 72
}

```

