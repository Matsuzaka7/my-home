export function MovingPic(el) {
  var oDiv = document.querySelector(el); //获取可拖动元素
  var oL, oT, sL, sT;
  //touchstart事件
  function touchSatrtFunc(e) {
    if (e.touches.length === 1) {
      var touch = e.touches[0]; //获取第一个触点
      var x = Number(touch.pageX); //页面触点X坐标
      var y = Number(touch.pageY); //页面触点Y坐标
      //记录触点初始位置
      oL = oDiv.offsetLeft; //可拖动元素距离页面左侧的距离
      oT = oDiv.offsetTop; //可拖动元素距离页面顶部的距离
      sL = x - oL; //获取页面触点距离div左侧的距离
      sT = y - oT; //获取页面触点距离div顶部的距离
    }
  }
  //touchmove事件(移动)
  var oldMxy = 0; // 旧值
  var num = 1; // 放大初始值
  var twoFlag = false; // 记录上一次是不是两只手指点的
  function touchMoveFunc(e) {
    e.preventDefault();
    if (e.touches.length === 1 && !twoFlag) {
      var touch = e.touches[0]; //获取第一个触点
      var x = Number(touch.pageX); //页面触点X坐标
      var y = Number(touch.pageY); //页面触点Y坐标
      // 松开触发
      oDiv.style.left = x - sL + "px";
      oDiv.style.top = y - sT + "px";
      oDiv.style.transition = "none";
    } else if (e.touches.length === 2) {
      var touch1 = e.touches[0]; //获取第一个触点
      var touch2 = e.touches[1]; //获取第二个触点

      var newMx1 = touch1.pageX;
      var newMy1 = touch1.pageY;
      var newMx2 = touch2.pageX;
      var newMy2 = touch2.pageY;

      var newMxy = Math.sqrt(
        Math.pow(newMx2 - newMx1, 2) + Math.pow(newMy2 - newMy1, 2)
      );
      console.log(newMx1, newMx2, newMy1, newMy2);
      // 放大 newMxy - oldMxy > 3是手指张幅程度, 太小就不处理
      if (newMxy > oldMxy && newMxy - oldMxy > 3) {
        num <= 5 ? (num += 0.15) : ""; // 限制最大缩放
        oDiv.style.transition = "none";
        oDiv.style.transform = `translate(-50%, -50%) scale(${num})`;
      } else if (newMxy < oldMxy && newMxy - oldMxy < -3) {
        // 缩小
        num >= 0.4 ? (num -= 0.15) : ""; // 限制最小缩放
        oDiv.style.transition = "none";
        oDiv.style.transform = `translate(-50%, -50%) scale(${num})`;
      }
      oldMxy = Math.sqrt(
        Math.pow(newMx2 - newMx1, 2) + Math.pow(newMy2 - newMy1, 2)
      );
      // 设置为true,告诉两只手指操作完毕, 一秒后可以使用一只手指的手势
      twoFlag = true;
      var timer;
      if (twoFlag) {
        clearTimeout(timer);
        if (!timer) {
          timer = setTimeout(() => {
            twoFlag = false;
            timer = null;
          }, 500);
        }
      }
    }
  }

  function touchEndFunc(fn) {
    // 处理边界, 超出屏幕后返回到最中间
    let scaleVal =
      oDiv.style.transform &&
      oDiv.style.transform.split(" ")[2].slice(6).slice(0, -1);
    if (Number(scaleVal) <= 1.2 || oDiv.style.transform == "") {
      if (
        oDiv.offsetLeft + oDiv.offsetWidth / 2 > window.innerWidth || // 右边
        oDiv.offsetTop + oDiv.offsetHeight / 2 > window.innerHeight || // 下边
        oDiv.offsetLeft - oDiv.offsetWidth / 2 < 0 || // 左边
        oDiv.offsetTop - oDiv.offsetHeight / 2 < 0 // 上边
      ) {
        oDiv.style.left = "50%";
        oDiv.style.top = "50%";
        oDiv.style.transition = "all 0.2s";
      }
    }
    fn || fn();
  }
  oDiv.addEventListener("touchstart", touchSatrtFunc, false);
  oDiv.addEventListener("touchmove", touchMoveFunc, true);
  oDiv.addEventListener("touchend", touchEndFunc, false);
}
