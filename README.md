# CocosCreator_TypeScript_Toast
> 在界面上显示类似Android的toast消息提示
## 环境

> CocosCreator 2.4.4   +  TypeScript

## 🗨️使用例子

> 将 ts 文件放入项目中

### 代码
```typescript
// 导入
import ToastHelper, { ToastDurationEnum, ToastPositionEnum } from "../../Framework/ToastHelper";

const { ccclass, property } = cc._decorator;

@ccclass
export default class TestController extends cc.Component {
  onLoad() {
    // **************
    //  测试
    // **************

    // 短/长时间 (默认 底部显示)   
    ToastHelper.ShowShort("本局还剩下3次看广告的机会,请珍惜....");
    ToastHelper.ShowLong("本局还剩下3次看广告的机会,请珍惜....");

    // 自定义显示时间 (4秒)
    ToastHelper.Show("本局还剩下3次看广告的机会,请珍惜....", 4);

    // 自定义位置
    ToastHelper.Show("本局还剩下3次看广告的机会,请珍惜....", 4, ToastPositionEnum.bottom_left);
    ToastHelper.Show("本局还剩下3次看广告的机会,请珍惜....", ToastDurationEnum.short, ToastPositionEnum.bottom_left);
    
  }
}

```
> 如果游戏打包后,某些平台不支持加载UUID内置资源,你可以将源码改为加载项目中的一个图片资源

## 🍦如果这个项目对你有帮助, 也可以请作者吃一包辣条🍦

![wxPay](img.assets/wxPay.png)

![aliPay](img.assets/aliPay.png)
