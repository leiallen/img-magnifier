/**
 * Created by Administrator on 2016/12/4 0004.
 */
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

        objFloatBox.style.left = left + "px";   //oSmall.offsetLeft的值是相对什么而言
        objFloatBox.style.top = top + "px";

        var percentX = left / (objMark.offsetWidth - objFloatBox.offsetWidth);
        var percentY = top / (objMark.offsetHeight - objFloatBox.offsetHeight);

        objBigBoxImage.style.left = -percentX * (objBigBoxImage.offsetWidth - objBigBox.offsetWidth) + "px";
        objBigBoxImage.style.top = -percentY * (objBigBoxImage.offsetHeight - objBigBox.offsetHeight) + "px";
    }
}