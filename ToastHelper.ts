/** 持续时间 枚举 */
export enum ToastDurationEnum {
  short = 2,
  long = 8,
}

/** 位置 枚举 */
export enum ToastPositionEnum {
  center,
  top,
  top_left,
  left,
  bottom_left,
  bottom,
  bottom_right,
  right,
  top_right,
}

export default class ToastHelper {
  private static _bgSpriteFrame = null;
  private static _bgSpriteFrameUuid = "b43ff3c2-02bb-4874-81f7-f2dea6970f18";

  private static _offsetX: number = 0;
  private static _offsetY: number = 0;

  private static MakeText(text: string = "", duration: number = ToastDurationEnum.short, toastPosition: ToastPositionEnum = ToastPositionEnum.bottom) {
    // 获取 canvas 对象
    var canvas = cc.director.getScene().getComponentInChildren(cc.Canvas);
    var width = canvas.node.width;
    var height = canvas.node.height;

    // 设置 背景图片
    let bgNode = new cc.Node();
    bgNode.opacity = 255; // 透明度
    let bgSprite = bgNode.addComponent(cc.Sprite);
    bgSprite.type = cc.Sprite.Type.SLICED;
    let bgLayout = bgNode.addComponent(cc.Layout);
    bgLayout.resizeMode = cc.Layout.ResizeMode.CONTAINER;

    // 设置 Lable文本格式
    let textNode = new cc.Node();
    let textLabel = textNode.addComponent(cc.Label);
    textLabel.horizontalAlign = cc.Label.HorizontalAlign.CENTER;
    textLabel.verticalAlign = cc.Label.VerticalAlign.CENTER;
    textLabel.fontSize = 20;
    textLabel.string = text;

    //背景图片与文本内容的间距
    let hPadding = textLabel.fontSize / 8;
    let vPadding = 2;
    bgLayout.paddingLeft = hPadding;
    bgLayout.paddingRight = hPadding;
    bgLayout.paddingTop = vPadding;
    bgLayout.paddingBottom = vPadding;

    // 当文本宽度过长时，设置为自动换行格式
    if (text.length * textLabel.fontSize > width / 3) {
      textNode.width = width / 3;
      textLabel.overflow = cc.Label.Overflow.RESIZE_HEIGHT;
    }

    bgNode.addChild(textNode);

    // 设置背景图
    if (this._bgSpriteFrame) {
      bgSprite.spriteFrame = this._bgSpriteFrame;
    }

    // position 设置 Toast 显示的位置
    if (toastPosition == ToastPositionEnum.center) {
      textNode.y = 0;
      textNode.x = 0;
    } else if (toastPosition == ToastPositionEnum.top) {
      textNode.y = textNode.y + (height / 5) * 2;
    } else if (toastPosition == ToastPositionEnum.top_left) {
      textNode.y = textNode.y + (height / 5) * 2;
      textNode.x = textNode.x - width / 5;
    } else if (toastPosition == ToastPositionEnum.left) {
      textNode.x = textNode.x - width / 5;
    } else if (toastPosition == ToastPositionEnum.bottom_left) {
      textNode.y = textNode.y - (height / 5) * 2;
      textNode.x = textNode.x - width / 5;
    } else if (toastPosition == ToastPositionEnum.bottom) {
      textNode.y = textNode.y - (height / 5) * 2;
    } else if (toastPosition == ToastPositionEnum.bottom_right) {
      textNode.y = textNode.y - (height / 5) * 2;
      textNode.x = textNode.x + width / 5;
    } else if (toastPosition == ToastPositionEnum.right) {
      textNode.x = textNode.x + width / 5;
    } else if (toastPosition == ToastPositionEnum.top_right) {
      textNode.y = textNode.y + (height / 5) * 2;
      textNode.x = textNode.x + width / 5;
    } else {
      // 默认情况 BOTTOM
      textNode.y = textNode.y - (height / 5) * 2;
    }
    textNode.x = textNode.x + this._offsetX;
    textNode.y = textNode.y + this._offsetY;

    // 将 toast 放入 场景中
    canvas.node.addChild(bgNode);

    cc.tween(bgNode)
      .by(duration, { position: cc.v3(cc.v2(0, 0)) }) // 持续时间
      .to(0.5, { opacity: 0 }) // 逐渐 透明消失
      .removeSelf() // 移除
      .call(() => {
        bgNode.destroy(); // 销毁
      })
      .start();
  }

  /** 显示 */
  public static Show(text: string, duration: number = ToastDurationEnum.short, toastPosition: ToastPositionEnum = ToastPositionEnum.bottom): void {
    // 加载资源
    if (this._bgSpriteFrame == null) {
      cc.loader.load({ uuid: this._bgSpriteFrameUuid }, (error, result: cc.Texture2D) => {
        if (error) {
          cc.error(error);
          return;
        }
        this._bgSpriteFrame = new cc.SpriteFrame(result);
        this._bgSpriteFrame.insetTop = 3;
        this._bgSpriteFrame.insetBottom = 3;
        this._bgSpriteFrame.insetLeft = 4;
        this._bgSpriteFrame.insetRight = 4;
        //加载完再调用
        this.MakeText(text, duration, toastPosition);
      });
    } else {
      this.MakeText(text, duration, toastPosition);
    }
    return;
  }
  /** 长显示 */
  public static ShowLong(text: string) {
    this.Show(text, ToastDurationEnum.long);
  }
  /** 短显示 */
  public static ShowShort(text: string) {
    this.Show(text, ToastDurationEnum.short);
  }
}
