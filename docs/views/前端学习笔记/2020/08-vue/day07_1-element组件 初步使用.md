---
title: Day07.1-element组件 基本使用
date: 2020-08-18
sidebarDepth: 4
tags:
  - Vue
categories:
  - 前端学习笔记
---

[TOC]

## element 组件 初步使用

### 1.Layout 布局

#### 1.1 通过基础的 24 分栏，迅速简便地创建布局。(row 和 col )

通过 row 和 col 组件，并通过 col 组件的 `:span` 属性我们就可以自由地组合布局。

```html
<el-row>
  <el-col :span="12"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="12"><div class="grid-content bg-purple-light"></div></el-col>
</el-row>
```

#### 1.2 分栏间隔( :gutter )

```html
<el-row :gutter="20">
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
  <el-col :span="6"><div class="grid-content bg-purple"></div></el-col>
</el-row>
```

### 2.Container 布局容器

用于布局的容器组件，方便快速搭建页面的基本结构：

```html
<el-container
  >：外层容器。当子元素中包含
  <el-header>
    或
    <el-footer>
      时，全部子元素会垂直上下排列，否则会水平左右排列。

      <el-header
        >：顶栏容器。

        <el-aside
          >：侧边栏容器。

          <el-main
            >：主要区域容器。

            <el-footer>：底栏容器。 felx 布局</el-footer></el-main
          ></el-aside
        ></el-header
      ></el-footer
    ></el-header
  ></el-container
>
```

### 3.Button/icon

使用`type`、`plain`、`round`和`circle`属性来定义 Button 的样式。

使用`disabled`属性来定义按钮是否可用，它接受一个`Boolean`值。

文字按钮 <el-button type="text">文字按钮</el-button>

图标按钮 <el-button type="primary" icon="el-icon-edit"></el-button>

按钮组 使用<el-button-group>标签来嵌套你的按钮。

加载中的按钮 要设置为 loading 状态，只要设置`loading`属性为`true`即可。

不同尺寸按钮 额外的尺寸：`medium`、`small`、`mini`，通过设置`size`属性来配置它们。

### 5.MessageBox

#### 5.1 确认删除

```js
this.$messageBox
  .confirm('确定删除该分类?', '删除提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  })
  .then(async () => {
    const res = await this.$http.delete(
      `categories/${this.catID}/attributes/` + attr_id
    )
    if (!res) return this.$message.error('删除失败,有错误发生')
    this.$message({
      type: 'success',
      message: '删除成功!'
    })
    this.getCateParams()
  })
  .catch(() => {
    this.$message({
      type: 'info',
      message: '已取消删除'
    })
  })
```

### 6.Dialog 对话框

```html
<el-dialog
  title="提示"
  :visible.sync="dialogVisible"
  width="30%"
  :before-close="handleClose"
>
  <span>这是一段信息</span>
  <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
</el-dialog>

<script>
  export default {
    data() {
      return {
        dialogVisible: false
      }
    },
    methods: {
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
      }
    }
  }
</script>
```

### 7.table 表格列表 el-table

```html
<el-table :data="orderlist" border stripe>
  <el-table-column type="index"></el-table-column>
  <el-table-column label="订单编号" prop="order_number"></el-table-column>
  <el-table-column label="订单价格" prop="order_price"></el-table-column>
  <el-table-column label="是否付款" prop="pay_status">
    <template v-slot="slotProps">
      <el-tag type="success" v-if="slotProps.row.pay_status === '1'"
        >已付款</el-tag
      >
      <el-tag type="danger" v-else>未付款</el-tag>
    </template>
  </el-table-column>
</el-table>
```

el-table 表格

- :data 数据源
- border 边框线
- stripe

el-table-column 表格列

- type="index" 索引列
- label="订单编号" 列名
- prop="order_number" 在 el-table 中绑定的数据源

### 8.分页条 el-pagination

```
  <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
```

el-pagination

- @size-change 改变每页数量事件
- @current-change 当前页改变事假
- :current-page="queryInfo.pagenum" 当前页
- :page-sizes="[5, 10, 15]" 每页可变数目
- layout="total, sizes, prev, pager, next, jumper" 要显示的
- :total="total" 总数目

### 9 form 表单

```html
<el-form
  :model="addForm"
  :rules="addFormRules"
  ref="addFormRef"
  label-width="100px"
  label-position="top"
>
  <el-form-item label="商品名称" prop="goods_name">
    <el-input v-model="addForm.goods_name"></el-input>
  </el-form-item>
</el-form>

<script>
  rules: {
            name: [
              { required: true, message: '请输入活动名称', trigger: 'blur' },
              { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
            ],
            region: [
              { required: true, message: '请选择活动区域', trigger: 'change' }
            ]
  }
</script>
script>
```

<el-form > 表单:

- :model="addForm" 绑定的数据 写法比较特殊

- :rules 表单验证的规则

- ref="addFormRef" 表单的指引值, 在 this..$refs[""]可以获取具体表单并调用表单特有的方法

- label-position="top" 文字对齐方式

<el-form-item> 表单项

- label="XX 名称" 表单项名称
- prop="goods_name" 表单验证规则,在表单绑定的 addFormRules 的属性里面

表单重置

### 10 步骤条的使用

```
  <!-- 步骤条区域 -->
      <el-steps :space="200" :active="activeIndex" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
```

效果

![1585211260332](C:\Users\AN\AppData\Roaming\Typora\typora-user-images\1585211260332.png)

activeIndex 控制进度 字符串的 0-n

### 11.tabs 切换面板

```
<el-tabs v-model="activeIndex" :tab-position="'left'" style="height: 200px;">
        <el-tab-pane label="基本信息">基本信息</el-tab-pane>
        <el-tab-pane label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
```

效果

![1585211606527](C:\Users\AN\AppData\Roaming\Typora\typora-user-images\1585211606527.png)

v-model 绑定的 name

#### 如何阻止 tab 页面的切换? before-leave(oldtab,newtab)

监听 tabs 页签的点击切换行为 before-leave(oldtab,newtab)

```
 <el-tabs v-model="activeIndex" :tab-position="'left'" :before-leave="beforeTabLeave"> //标签页数据绑定

 beforeTabLeave(activeName, oldActiveName) {
      // console.log('即将离开的标签页名字是：' + oldActiveName)
      // console.log('即将进入的标签页名字是：' + activeName)
      // return false
      //结合其他业务逻辑进行控制
      if (oldActiveName === '0' && this.addForm.goods_cat.length !== 3) {
        this.$message.error('请先选择商品分类！');
        return false;
      }
    }
```

#### tab 切换成功后如何触发点击事件? @tab-click="tabClicked"

tab-click 事件切换事件

### 13 实现步骤条与 tab 面板的联动

```
  <el-steps :space="200" :active="parseInt(activeIndex)" finish-status="success" align-center> //步骤条的

 <el-tabs v-model="activeIndex" :tab-position="'left'" style="height: 200px;"> //tab面板的

data() {
    return {
      activeIndex: '3' //两者共同的属性
    };


```

效果

![1585211798482](C:\Users\AN\AppData\Roaming\Typora\typora-user-images\1585211798482.png)

### 14.级联选择器

```
<el-cascader expand-trigger="hover" :options="catelist" :props="cateProps" v-model="addForm.goods_cat" @change="handleChange"> </el-cascader>

```

效果 expand-trigger="hover" 滑过显示 :options="catelist" 数据源 :props="cateProps" 对象

![1585213326652](C:\Users\AN\AppData\Roaming\Typora\typora-user-images\1585213326652.png)

#### 如何只选中最后一级?

在双向绑定的数据 v-model 中进行判断

```
 // 级联选择器选中项变化，会触发这个函数
    handleChange: function() {
      console.log(this.addForm.goods_cat);
      if (this.addForm.goods_cat.length !== 3) {
        this.addForm.goods_cat = [];
      }
    }
```

### 15 多选框组

### 16 上传组件

### 17 富文本编辑器 vue-quill-editor 插件

```
 npm i  vue-quill-editor -S
 //入口文件导入并注册
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)



//使用
<template>
    <quill-editor class="editor"
            v-model="content" 
            ref="myQuillEditor" 
            :options="editorOption" 
            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
            @change="onEditorChange($event)">
        </quill-editor>

```
