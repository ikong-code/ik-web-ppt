---
title: 使用文档
---

# XPPT

### DEMO
<img style="width: 100%;" src="https://saas.uban360.com/sfs/file?digest=fid42ca29f59f4ded0b147a4e736e91eacd" />

<!-- [👇 XPPT 使用地址](http://tms.uban360.net/xppt/) 
👇 项目仓库地址：[fe](https://git.shinemo.com/projects/IOC/repos/xppt-fe/browse) [server]((https://git.shinemo.com/projects/IOC/repos/xppt-server/browse)) -->

### 特性

这是一个基于 reactv18 + react-routerv6 + vite + typescript + redux + formilyv2 的在线演示文稿，后台框架采用的是 eggjs，数据存储是文件读写，图片上传采用的是公司的文件服务器，状态回溯使用的是 indexDB。

- 制作发布灵活，直接创建编辑保存
- 极度轻量，不占用空间和内存
- 主题自定义
- 可扩展，需要什么功能，自己去写

能够让周会分享的ppt统一管理起来，在线编辑在线预览，无需文件传输，随时随地演示。

### 背景
团队分享PPT时，虽然有个讯盟文档可以存放每次分享的PPT，但很少有人将ppt上传上去，或者找不到入口在哪。

或者后面有同事想查阅某个技术分享时的PPT，却因为没有记录而找不到，技术分享是一个前端团队的沉淀，如果只是分享不去记录，三两天听者就可能忘了。

基于多方面原因 + 明哥的启发，花了一天的时间进行调研，一开始探究的是[reveal.js](https://revealjs.com/)，这是一个HTML演示框架，通过编写HTML或者md文档进行演示，不过这个方案很快就被否决了，因为这个方案需要通过学习reveal的编写语法，有一定的上手难度。找来找去也就reveal.js方案，那就只能用自己的老本行实现一个，通过本行业的技术手段一个满足PPT的基础功能的网页版PPT。

### 项目启动

```
git clone https://git.shinemo.com/scm/ioc/xppt-fe.git
git clone ssh://git@git.shinemo.com:7999/ioc/xppt-fe.git

cd xppt-fe && npm install

npm run dev
```

### 项目部署
```
npm run build
```
将dist目录下的文件复制移动到xppt-server app/public目录下
提交xppt-server静态资源。登录服务器，如下图，进入xppt-server目录，拉取最新代码
```
# 先停止后台服务，再启动
npm run stop && npm run start
```

<img style="width: 600px;" src="https://saas.uban360.com/sfs/file?digest=fidc83b54b0a4e2486d1c45d8b0df35d5c5" />

### 项目设计思路

这个项目的页面布局如常规的低代码平台一样，左中右布局，左侧是幻灯片列表，中间是画布区域，右侧是配置项区域。
- 首先介绍PPT编辑器的构思，我是先从设计PPT数据结构入手的，通过脑图中的功能列表，设计出通过的PPT数据结构，如：
  1. 左侧幻灯片列表，就是Slide集合，每个Slide有一个唯一id，elements是当前幻灯片中节点信息集合(文本，图片，形状等)，background是当前幻灯片的背景样式，背景样式有背景图片，纯色填充及渐变填充(未实现)，通过识别background.type展示对应的背景样式，turningMode是演示PPT时当前幻灯片的转场方式。
  2. 画布区域方面：每个节点都有一个container包裹着，如拖拉拽缩放操作都是操作此container。辅助线及吸附是在拖拽节点时实时计算实现的，需要遍历计算距离当前看板中每个节点位置信息或中位线的距离。
  3. 右侧配置区域：通过选择当前节点信息，判别出是某一类型的节点，展示对应的配置项，如果是未聚焦状态，配置项是当前幻灯片看板的配置项。

- 状态回溯解决方案：每次主要的操作(频繁的操作就不记录)，都是需要进行快照记录，就要考虑整个快照历史记录的数据大小存储，首先排除后端存储，效率低，其次排除cookie localStorage等，原因存储空间小。最后采用[indexDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)存储，因为它储存大小是250m以上，足够使用了，
再加上图片无需保存base64，后端提供了文件服务器的原因，快照存储数据就小很多，查询存储操作是比较快的。

- 项目状态管理：项目状态管理使用的是[@reduxjs/toolKit](https://redux-toolkit.js.org/introduction/getting-started)，它解决了Redux的三个问题，一是配置Redux太复杂了，需要完整的actionType、actions、reducer、store，最后再通过connect连接，二是需要增加额外包才能让Redux做一些其他的事情，比如处理异步，需要用的Redux-thunk，而RTK自己就内置了，使用比较方便。三是Redxu需要太多样板代码了，写了很多重复代码。

- 项目路由：使用[react-router v6](http://react-guide.github.io/react-router-cn/index.html)，使用上与v5有很大的差距，优点是配置更方便了，缺点是要习惯上的改变，v5有多个常用的api被抹掉了，如switch。


幻灯片Slide的数据结构-如下
```ts
const slides: Slide[] = []

interface Slide {
  id: string                                  // 幻灯片id 8位的随机字符串
  elements: PPTElement[]                      // 幻灯片中节点列表
  background?: {                              // 幻灯片的背景样式 纯色填充 / 背景图片 / 渐变(TODO)
    type: "solid" | "image"
    color?: string                                // 纯色填充时的颜色
    image?: string                                // 背景图片  
    imageSize?: "cover" | "contain" | "repeat"    // 背景图片 展示样式
  }
  animations?: PPTAnimation[]                 // 幻灯片演示时当前页入场动画
  turningMode?: TurningMode                   // 转场方式
}

export type PPTElement = PPTTextElement | PPTImageElement | PPTShapeElement

interface PPTTextElement extends PPTBaseElement {
  type: "text"                // 节点类型 - 文本
  content: string             // 节点内容
  defaultColor: string        // 文本颜色
  fill?: string               // 文本框填充色
  lineHeight?: number         // 行高
  wordSpace?: number          // 字间距
  shadow?: PPTElementShadow   // 文本阴影
  fontSize?: string           // 字体大小
  textDecoration?: string     // 文本text-decoration样式
  fontStyle?: string          // font-style
  fontWeight?: number         // font-weight
}

interface PPTImageElement extends PPTBaseElement {
  type: "image"               // 节点类型 - 图片
  src: string                 // 图片 src
  flipH?: boolean             // 是否横向翻转
  flipV?: boolean             // 是否纵向翻转
  shadow?: PPTElementShadow   // 图片阴影
}

interface PPTShapeElement extends PPTBaseElement {
  type: "shape"               // 节点类型 - 形状
  path: string                // 形状绘制path
  fill: string                // 填充色
  opacity?: number            // 透明度
  flipH?: boolean             // 是否横向翻转
  flipV?: boolean             // 是否纵向翻转
}




```
#### 功能设计脑图

<img style="width: 600px;" src="https://saas.uban360.com/sfs/file?digest=fid5df31d0c5e3d1aadc251466ba17e4004" />


### 涉及技术栈
-  [React](https://reactjs.org/)
-  [React-router](http://react-guide.github.io/react-router-cn/index.html)
-  [React-Redux](https://react-redux.js.org/)
-  [antd](https://ant.design/)
-  [Vite](https://vitejs.cn/)
-  [Autoprefixer](https://github.com/postcss/autoprefixer)
-  [Formily](https://formilyjs.org/#/0yTeT0/jAU8UVSYI8)
-  [TinyColor2](https://github.com/bgrins/TinyColor#readme)
-  [React-Beautiful-Dnd](https://github.com/atlassian/react-beautiful-dnd)
-  [Sass](https://www.sass.hk/)
-  [indexDB](https://developer.mozilla.org/zh-CN/docs/Web/API/IndexedDB_API)

### 目录结构
```
|-- 项目结构说明
    |-- index.html                      # 入口文件
    |-- package.json
    |-- tsconfig.json                   # TypeScript配置文件
    |-- vite.config.ts                  # vite配置文件
    |-- src                             # 项目源码
        |-- globle.scss                 # 全局样式文件
        |-- main.tsx                    # 源码入口文件
        |-- assets                      # 静态资源目录
        |   |-- iconfont                # icon
        |   |-- images                  # 静态图片目录
        |   |-- style                   # 样式目录
        |       |-- variable.scss       # 全局css变量文件
        |-- components                  # 通用组件目录
        |   |-- AntdComponent           # 基于antd封装的组件目录
        |   |-- BaseElement             # ppt中的组件节点目录
        |   |   |-- BaseImageElement    # 图片节点组件
        |   |   |   |-- ImageOutline    # 图片组件outline
        |   |   |-- BaseShapeElement    # 形状节点组件
        |   |   |-- BaseTextElement     # 文本节点组件
        |   |-- ColorPicker             # 基于tinyColor2封装的颜色选项卡片组件
        |   |-- ElementOutline          # 节点组件的outline
        |   |-- FileInput               # 文件上传组件
        |-- config                      # 常量目录
        |   |-- canvas.ts               # 画布的常量文件
        |   |-- element.ts              # element的常量文件
        |   |-- hotkey.ts               # 快捷键的常量文件
        |   |-- shapes.ts               # 形状的常量文件
        |-- hooks                       # 自定义 hooks
        |   |-- useCreateElement.ts     # 创建各个类型element的 hook
        |   |-- useDeleteElement.ts     # 删除当前Element的 hook
        |   |-- useElementOutline.ts    # 节点的outline hook
        |   |-- useElementShadow.ts     # 节点的阴影 hook
        |   |-- useGlobalHotkey.ts      # 快捷键 hook
        |   |-- useModal.ts             # 弹窗 hook
        |   |-- useScreening.ts         # 全屏相关 hook
        |   |-- useSlideBackgroundStyle.ts    # 幻灯片背景样式 hook
        |   |-- useSlideHandler.ts      # ppt左侧幻灯片列表操作 hook
        |   |-- useViewportSize.tsx     # 画布缩放 hook
        |-- mocks                       # mock数据
        |   |-- layout.ts
        |   |-- slide.ts
        |   |-- theme.ts
        |-- router                      # 项目路由配置
        |   |-- index.tsx
        |-- service                     # 项目axios配置
        |   |-- api.ts
        |   |-- index.ts
        |-- store                       # redux store
        |   |-- canvasReducer.ts        # 画布的 store
        |   |-- index.ts                
        |   |-- keyboardReducer.ts      # 快捷键 store
        |   |-- screenReducer.ts        # 全屏 store
        |   |-- slidesReducer.ts        # 幻灯片 store
        |   |-- types.ts                # 类型
        |-- types                       # ts类型目录
        |   |-- edit.ts
        |   |-- slides.ts
        |-- utils                       # 通用方法目录
        |   |-- common.ts               # 普通方法
        |   |-- element.ts              # 计算节点的相关位置信息
        |   |-- image.ts                # 图片转base64
        |   |-- indexDB.ts              # 封装的indexDB类  用于状态回溯
        |   |-- screen.ts               # 全屏方法
        |-- views                       # 页面结构
            |-- Editor                  # 编辑器
            |   |-- EditorCenter        # 编辑器中间区域
            |   |   |-- components      # 画布的组件
            |   |       |-- Canvas      # 画布组件
            |   |       |   |-- components # 画布通用组件
            |   |       |   |-- hooks      # 画布自定义hooks
            |   |       |       |-- useCommonOperate.ts             # 节点的缩放点 hook
            |   |       |       |-- useDragElement.ts               # 拖拽组件移动 hook
            |   |       |       |-- useDragLineElement.ts           # 辅助线 + 吸附 hook
            |   |       |       |-- useInsertFromCreateSelection.ts # 插入节点 hook
            |   |       |       |-- useRotateElement.ts             # todo 组件旋转hook
            |   |       |       |-- useScaleElement.ts              # 缩放 hook
            |   |       |       |-- useSelectElement.ts             # 选择节点 hook
            |   |       |-- HeaderTools      # 画布上面操作区域
            |   |-- EditorHeader             # 编辑器上方操作区域
            |   |-- EditorLeft               # 编辑器左侧幻灯片栏
            |   |-- EditorRight              # 编辑器右侧配置项
            |-- List                    # PPT页面列表
            |   |-- CreateModal         # 创建ppt弹窗
            |-- NotFound                # 404
            |-- PPTEntry                # 编辑器入口页
            |-- Screen                  # PPT全屏展示页
```
