# efficiency+

> a mini-program for raise efficiency
>
> 一款增加生活效率的小程序

## 介绍

这是一个简单的小程序，本意是制作一些小工具来提高生活效率，方便日常使用。

技术栈`原生小程序` `微信云开发`，其中部分样式使用了[colorUI](https://github.com/weilanwl/ColorUI)。

> 第一版使用了 mpvue，但是开发过程出现了不支持 vue 某些语法，没有文档的情况下排查错误耗费了大量时间。
>
> 所以，考量到这是一个轻小程序，并且使用原生框架促进自己学习，便使用原生框架重写了这个小程序。
>
> 后续可能会了解 `wepy`或者 `taro`再去修改技术栈。
>
> mpvue 的代码迁移到了[mpvue 分支](https://github.com/zenoslin/efficiency/tree/mpvue)

![qrcode.png](https://github.com/zenoslin/efficiency/blob/master/images/qrcode.png)

## Tools

制作了一些（沙雕）的小工具，提高（我的）生活效率

![index.png](https://github.com/zenoslin/efficiency/blob/master/images/index.png)

### 拼单计算器

你是否经常在为跟别人一起点外卖，而不知道怎么计算满减后的金额而忧愁呢（~~那就别点外卖！从根本上解决问题啊~~）

打开 `拼单计算器` 即可快速计算每个人需支付的金额（无法做到非常公平）

```*
//算法
(用户A花费金额 / 无任何附加费用总金额) * 最后总支出金额 = 用户A所需要支付金额
```

### 渐变调色盘

这是一个华而不实的配色工具，你可以看到很多渐变配色在手机上的效果与具体色值

渐变配色方案来自[WebGradients](https://github.com/itmeo/webgradients)

### 计划任务

使用小程序云开发写的一个在线todolist，支持将任务在云端同步。

## Build

```bash
# clone repository
git clone https://github.com/zenoslin/efficiency.git
cd efficiency
```

## License

efficiency+ is created under the [MIT](https://github.com/zenoslin/efficiency/blob/master/LICENSE) license.
