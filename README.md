# efficiency+

> a mini-program for raise efficiency
> 一款增加生活效率的小程序

![qrcode.png](https://github.com/zenoslin/efficiency/blob/master/img/qrcode.png)

## tools

![index.png](https://github.com/zenoslin/efficiency/blob/master/img/index.png)

制作了一些（沙雕）的小工具，提高（我的）生活效率

### 拼单计算器

你是否经常在为跟别人一起点外卖，而不知道怎么计算满减后的金额而忧愁呢（~~那就别点外卖！从根本上解决问题啊~~）打开 `拼单计算器` 即可快速计算每个人需支付的金额（无法做到非常公平）

```*
//算法
(用户A花费金额 / 无任何附加费用总金额) * 最后总支出金额 = 用户A所需要支付金额
```

### 渐变调色盘

这是一个华而不实的配色工具，你可以看到很多渐变配色在手机上的效果与具体色值

渐变配色方案来自[https://github.com/itmeo/webgradients](https://github.com/itmeo/webgradients)

## Build

```bash
# clone repository
git clone https://github.com/zenoslin/efficiency.git
cd efficiency

# 指定平台的开发时构建(微信、百度、头条、支付宝)
npm dev:wx
npm dev:swan
npm dev:tt
npm dev:my

# 指定平台的打包构建
npm build:wx
npm build:swan
npm build:tt
npm build:my

# 生成 bundle 分析报告
npm run build --report
```

## License

efficiency+ is created under the [MIT](https://github.com/zenoslin/efficiency/blob/master/LICENSE) license.
