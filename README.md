#兼容性良好的JS原生图片放大镜插件

##如何使用
###*标准结构示例
```html
<div id="wrap-box"> <!--最外层块元素-->
    <div id="small-box"> <!--小图片包裹块元素-->
        <div id="mark"></div> <!--兼容IE多加的块元素-->
        <div id="float-box"></div> <!--阴影块元素-->
        <img src="img-small.jpg"/> <!--小图片-->
    </div>
    <div id="big-box"> <!--大图片包裹块元素-->
        <img src="img-big.jpg"/> <!--大图片-->
    </div>
</div>
```
###*标准样式
```CSS
/*放大镜效果元素样式*/
#wrap-box {
    display: block;
    width: 400px;
    height: 255px;
    margin: 50px;
    position: relative;
    border: 1px solid #ccc;
}

#small-box {
    position: relative;
    z-index: 1;
}

#float-box {
    display: none;
    width: 160px;
    height: 120px;
    position: absolute;
    background: #ffffcc;
    border: 1px solid #ccc;
    filter: alpha(opacity=50);
    opacity: 0.5;
}

#mark {
    position: absolute;
    display: block;
    width: 400px;
    height: 255px;
    background-color: #fff;
    filter: alpha(opacity=0);
    opacity: 0;
    z-index: 10;
}

#big-box {
    display: none;
    position: absolute;
    top: 0;
    left: 460px;
    width: 400px;
    height: 300px;
    overflow: hidden;
    border: 1px solid #ccc;
    z-index: 1;;
}

#big-box img {
    position: absolute;
    z-index: 5
}
```

###*配置项
```javascript
//页面加载完毕后执行
window.onload = function () {

    //配置项
    var Dom = {
        parentBox : 'wrap-box', //最外层块元素
        smallBox : 'small-box', //小图片包含块
        mark : 'mark', //兼容IE多加的块元素,解决IE闪跳
        floatBox : 'float-box', //阴影块元素
        bigBox : 'big-box' //大图片包含块
    };

    imgMagnifier(Dom);
};
```
###*主程序
```javascript
function imgMagnifier(obj) {
    var objParentBox = document.getElementById(obj.parentBox);
    var objSmallBox = document.getElementById(obj.smallBox);
    var objMark = document.getElementById(obj.mark);
    var objFloatBox = document.getElementById(obj.floatBox);
    var objBigBox = document.getElementById(obj.bigBox);
    var objBigBoxImage = objBigBox.getElementsByTagName('img')[0];

    objMark.onmouseover = function () {
        objFloatBox.style.display = "block";
        objBigBox.style.display = "block"
    };

    objMark.onmouseout = function () {
        objFloatBox.style.display = "none";
        objBigBox.style.display = "none"
    };

    objMark.onmousemove = function (ev) {

        var _event = ev || window.event;  //兼容多个浏览器的event参数模式

        var left = _event.clientX - objParentBox.offsetLeft - objSmallBox.offsetLeft - objFloatBox.offsetWidth / 2;
        var top = _event.clientY - objParentBox.offsetTop - objSmallBox.offsetTop - objFloatBox.offsetHeight / 2;

        if (left < 0) {
            left = 0;
        } else if (left > (objMark.offsetWidth - objFloatBox.offsetWidth)) {
            left = objMark.offsetWidth - objFloatBox.offsetWidth;
        }

        if (top < 0) {
            top = 0;
        } else if (top > (objMark.offsetHeight - objFloatBox.offsetHeight)) {
            top = objMark.offsetHeight - objFloatBox.offsetHeight;

        }

        objFloatBox.style.left = left + "px";//oSmall.offsetLeft的值是相对什么而言
        objFloatBox.style.top = top + "px";

        var percentX = left / (objMark.offsetWidth - objFloatBox.offsetWidth);
        var percentY = top / (objMark.offsetHeight - objFloatBox.offsetHeight);

        objBigBoxImage.style.left = -percentX * (objBigBoxImage.offsetWidth - objBigBox.offsetWidth) + "px";
        objBigBoxImage.style.top = -percentY * (objBigBoxImage.offsetHeight - objBigBox.offsetHeight) + "px";
    }
}
```
##作者
###雷少俊 Allenlei
闲来无事，写个简单的插件方便使用，嘻嘻