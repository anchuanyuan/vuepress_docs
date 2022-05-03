---
title: 如何通过electron和vue构建桌面应用程序
date: 2022.03.06
sidebarDepth: 4
tags:
  - electron
categories:
  - electron
---

## 什么是electron?

一个 使用 JavaScript，HTML 和 CSS 构建跨平台的桌面应用程序 的技术

这是官网地址[官网](https://www.electronjs.org/)

官网的介绍如下

 Electron 基于 Chromium 和 Node.js, 让你可以使用 HTML, CSS 和 JavaScript 构建应用。 

 Electron 兼容 Mac、Windows 和 Linux，可以构建出三个平台的应用程序。 

....

![1646577150497](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/07/005020-726202.png)
官网有这么一段示例demo

```
#克隆
git clone https://github.com/electron/electron-quick-start

#进入目录
cd electron-quick-start

#安装依赖
npm install && npm start
```

我们下载下来 研究一哈目录,随便点点 看看写了什么

![1646578003476](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/224644-47416.png)

我们隐约猜到大概就是electron帮我们启动了一个谷歌浏览器,然后用这个浏览器打开了一个HTML页面



那我们就想了 那这玩意有啥用啊,我直接写html 用浏览器打开那不是一样吗?

其实并不是, 谷歌浏览器他只能执行js, 但是不能执行nodejs,也就是说 像nodejs直接读取硬盘文件这种系统交互的操作浏览器是做不到的(也不是完全不能,只是因为安全性原因有所限制)

因为有运行nodejs的能力,所以就完全可以看成一个桌面程序了

有些桌面软件就是基于electron制作的, 我们所熟知的就有 `visio studio code` IDE编辑和 `Typroa`编辑器等

## 浅尝一下

把刚才的工程安装好依赖并运行

这里我还是习惯用 yarn 作为包管理工具代替npm 进行包依赖的下载

工程目录下输入

```
yarn
```

哦吼 报错了

![1646578861043](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/230101-946921.png)

大概意思就是我没有 yarn 作为包管理的 .lock文件 

那我就吧 项目根目录的 package-lock.json 删掉 再装一遍试试


哦豁 又报错了(或者不会报错就是下载的很慢)

![1646579130930](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/230531-188026.png)

404 仓库找不到electron

我们得去找个靠谱的electron 镜像地址 因为源版地址在海外正常下载估计得个把月才能把那个几十MB包下载下来

- 我们来试试淘宝的镜像

  ![1646579728623](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/231528-984661.png)

执行下面的命令

```
yarn config set electron_mirror https://npmmirror.com/mirrors/electron/

yarn
```

ok 开始下载了 挺快的 淘宝还挺管事  用了近140s

![1646579983281](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/231944-600329.png)

好的 看package.json 里面就一个脚本命令 咱们启动

```
yarn start
```

ok 桌面程序启动成功了 

![1646580091242](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/232131-378829.png)

改改html里面的内容

![1646580190810](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/232312-892592.png)

重载一下页面

![1646580388954](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/232629-656339.png)

ok 页面生效了

![1646580614140](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/233014-643151.png)

## 浅尝一下nodejs的能力

看看nodejs 的api怎么读取系统文件目录的,我们尝试遍历一下当前目录

![1646580859961](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/06/233421-984018.png)

照着文档 写函数 获取文件名字遍历输出

![1646582968649](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/07/000929-307631.png)

ok 完事了 就遍历了一层 有些其实还是目录(node_moudules等都是目录,不重要 就是验证一nodejs能力)

![1646583023932](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/07/001025-103347.png)

好的 就到这里 后面讲如何把一个vue项目 直接变成一个electron项目,并完成系统托盘 开机自启 自动更新等功能

打包分发等

## 把vue项目变成electron项目

很简单 如果是vue2 + webpack 项目 两部就能完成

1. vue 工程里面直接执行如下命令

   ```
   vue add electron-builder
   ```

2. 尝试运行



## 演示一遍 vue项目变成electron

### 我们初始化一个vue2的项目

得确保自己安装了 vuecli 脚手架工具

yarn add @vue/cli -g

```
vue create vue-electron-demo
# 一路回车
```

![1646583691555](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/07/002132-862149.png)

### 启动一下项目

```
cd vue-electron-demo
npm  run server
```

![1646583887469](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/07/002447-815852.png)

ok 项目正常

![1646583929673](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/07/002529-215688.png)

### 变成electron项目

```
vue add electron-builder
# 有选择就按回车 选最新版本就行
```

![1646584041167](C:/Users/admin/AppData/Roaming/Typora/typora-user-images/1646584041167.png)

好的安装完成了

发现文件目录有所变化,package.json 多了electron,启动命令 src下面还多了个background.js

![1646584193384](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/07/002955-919395.png)

### 启动试试

```
yarn run electron:serve
```

哦吼!一个vue项目直接变成桌面程序启动了!

![1646584428880](https://gitee.com/chuanyuan_an/tuchuang/raw/master/image/202203/07/003350-631220.png)

## 后面说怎么打包 怎么做图标 托盘 开机自启 主进程 和渲染进程通信等等

### 打包

待续...


1首页出现两个 是因为 路径的问题
 const tagPath = path.resolve(basePath, route.path)
          // const tagPath = path.posix.resolve(basePath, route.path)
2.区分环境 然后尝试自己拼接路径

3. -win ---ia32

background.js
```js
'use strict'

import { app, protocol, BrowserWindow ,nativeImage,Tray,Menu,ipcMain,Notification} from 'electron'
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS_DEVTOOLS } from 'electron-devtools-installer'
import path from 'path'
import checkForUpdates from "./update";
import {autoUpdater} from "electron-updater";
import {updateApp} from "./update";
const isDevelopment = process.env.NODE_ENV !== 'production'
// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])
let win = null
// 禁止双开
const isFirstInstance = app.requestSingleInstanceLock()
if (!isFirstInstance) {
  // log.info('is second instance')
  console.log("禁止双开")
  setTimeout(() => {
    app.quit()
  }, 1000)
  // win.show()
}else {
  async function createWindow() {
    app.commandLine.appendSwitch('autoplay-policy', 'no-user-gesture-required');
    // Create the browser window.
    win = new BrowserWindow({
      width: 1280,
      height: 960,
      webPreferences: {

        // Use pluginOptions.nodeIntegration, leave this alone
        // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
        nodeIntegration: process.env.ELECTRON_NODE_INTEGRATION,
        contextIsolation: !process.env.ELECTRON_NODE_INTEGRATION,
        webSecurity: false
      }
    })

    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
      if (!process.env.IS_TEST) win.webContents.openDevTools()
    } else {
      createProtocol('app')
      // Load the index.html when not in development
      await win.loadURL('app://./index.html')
    }
    // 更新客户端
    // updateApp(win)
  }

// Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
  app.on('ready', async () => {
    if (isDevelopment && !process.env.IS_TEST) {
      // Install Vue Devtools
      try {
        // await installExtension(VUEJS_DEVTOOLS)
      } catch (e) {
        console.error('Vue Devtools failed to install:', e.toString())
      }
    }
    await createWindow()
    try {
      // 最小化到托盘
      tray = setTray()
    } catch (err) {
      // log.info('err', err)
    }
    win.on('close', (e) => {
      if (forceClose) {
        return
      }
      e.preventDefault()
      hideWin()
    })
  })

  ipcMain.on('showNotify',(event,data)=>{
    showNotification(data)
  })
  ipcMain.on('checkUpdate',(event,data)=>{
    console.log('检查更新',data)
    updateApp(win,data)
    // autoUpdaterInstance.checkForUpdates()
  })
}
function hideWin () {
  if (win) {
    win.hide()
  }
}
// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {
      app.quit()
    })
  }
}

let tray // 防止被内存清理
let forceClose = false
// 隐藏主窗口，并创建托盘，绑定关闭事件
function setTray () {
  // const topMenu = Menu.buildFromTemplate({})
  // Menu.setApplicationMenu(topMenu)
  // 用一个 Tray 来表示一个图标,这个图标处于正在运行的系统的通知区
  // 通常被添加到一个 context menu 上.
  // 系统托盘右键菜单
  const trayMenuTemplate = [

    {
      // 系统托盘图标目录
      label: '退出',
      click: () => {
        // log.info('force quit')
        forceClose = true
        app.quit()
      }
    }
  ]
  // 设置系统托盘图标
  let iconRootPath
  iconRootPath = path.join(__dirname,'bundled/logo')
  // console.log()
  if(app.isPackaged) {
    iconRootPath = path.join(__dirname, '/logo')
  }
  let iconPath = path.join(iconRootPath, 'djk-logo.png')
  console.log({iconPath})

  const trayIcon = nativeImage.createFromPath(iconPath)
  const appTray = new Tray(trayIcon)


  // 图标的上下文菜单
  const contextMenu = Menu.buildFromTemplate(trayMenuTemplate)

  // 设置托盘悬浮提示
  appTray.setToolTip('泉城药易购后台管理程序')
  // 单击托盘小图标显示应用
  appTray.on('click', () => {
    // 显示主程序
    showWin()
  })

  appTray.on('right-click', function (event, bounds) {
    setTimeout(function () {
      appTray.popUpContextMenu(contextMenu)
    }, 200)
  })

  return appTray
}

function showWin () {
  if (win) {
    win.show()
  }
}
app.on('close', (e) => {
  if (forceClose) {
    return
  }
  // 隐藏窗口
  hideWin()
})

// 设置开机自启
const exeName = path.basename(process.execPath)
app.setLoginItemSettings({
  openAtLogin: app.isPackaged,
  openAsHidden: !app.isPackaged,
  path: process.execPath,
  args: [
    '--processStart', `${exeName}`,
  ]
})
// 消息通知
function showNotification (data) {
  const {title ,body} = data
  new Notification({ title: title, body: body }).show()
}
```

vue.config.js
```
pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        extraResources: [
          // {
          //   from: resolve(__dirname, '/src/assets/logo'),
          //   to: '/logo'
          // }
          {
            "from": './extraResources/',
            "to": "extraResources"
          }
        ],
        directories: {                  // 输出文件夹
          output: "djk"
        },
        appId: 'djkyyg',
        productName: '泉城药易购后台管理系统',
        // eslint-disable-next-line no-template-curly-in-string
        artifactName: 'djk-${version}.${ext}',
        copyright: 'Copyright © 2020-2021 ybdjk',
        win: {
          icon: 'public/logo/djk-logo.ico'
          // requestedExecutionLevel: 'highestAvailable' // 加了这个无法开机自启
        },
        nsis: {
          oneClick: false,
          perMachine: true,
          allowElevation: true,
          allowToChangeInstallationDirectory: true,
          // include: './build/installer.nsh'
        },
        publish: {
          provider: 'generic',
          url: config.updateURL
        }
      }
    }
}
```

updata.js

```
import { autoUpdater } from 'electron-updater'
import { ipcMain } from 'electron'
const  config = require('./config')
const feedUrl = config.updateURL
// const log = require('@/commonJs/log')
let mainWindow = null;
let isUpdateAsar = false;
let autoUpdaterInstance = autoUpdater
export function updateApp(window,URL) {
  let updateURL = URL || feedUrl
  mainWindow = window;
  // logger('in')
  // autoUpdaterInstance.hasInstace = true
  if(autoUpdaterInstance.hasInstace) {
    autoUpdaterInstance.setFeedURL(updateURL);
    autoUpdaterInstance.checkForUpdates()
  }else {
    autoUpdaterInstance.hasInstace = true
    autoUpdaterInstance.autoDownload = true//检查到更新时是否自动下载
    autoUpdaterInstance.setFeedURL(updateURL);
    autoUpdaterInstance.on('error', function (error) {
      sendUpdateMessage({
        cmd: 'error',
        msg: error
      })
    });
    //监听开始检测更新事件
    autoUpdaterInstance.on('checking-for-update', function (message) {
      sendUpdateMessage({
        cmd: 'checking-for-update',
        msg: message
      })

    });
    //监听发现可用更新事件
    autoUpdaterInstance.on('update-available', function (message) {
      sendUpdateMessage({
        cmd: 'update-available',
        msg: message
      })
    });
    //监听没有可用更新事件
    autoUpdaterInstance.on('update-not-available', function (message) {
      sendUpdateMessage({
        cmd: 'update-not-available',
        msg: message
      })
    });
    // 更新下载进度事件
    autoUpdaterInstance.on('download-progress', function (message) {
      // logger('download-progress:' + JSON.stringify(message))
      sendUpdateMessage({
        cmd: 'download-progress',
        msg: message
      })
    });
    //监听下载完成事件
    autoUpdaterInstance.on('update-downloaded', function (message) {
      // logger('update-downloaded:' + JSON.stringify(message))
      sendUpdateMessage({
        cmd: 'update-downloaded',
        msg: message
      })
      autoUpdaterInstance.quitAndInstall()
    });
    autoUpdaterInstance.checkForUpdates()
  }
}

function sendUpdateMessage(data) {
  const {cmd, msg} = data
  mainWindow.webContents.send(cmd, msg)
  // ipcMain.
}
function logger(line) {
}
// export  default autoUpdaterInstance
```