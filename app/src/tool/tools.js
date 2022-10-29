// 滚动到底部的函数
export function scrollBottom() {
  let last_child = document.querySelector(".infoItemBox>div:last-child");
  if (last_child) last_child.scrollIntoView();
}

// 是否弹出消息框的函数
export function isMessage(info) {
  let center = document.querySelector(".Center");
  // 如果停留在最下面，每次接收消息就滚到最底部，如果距离底部超过了一个屏幕, 则不滚动
  if (center.scrollHeight - center.scrollTop - window.innerHeight <= window.innerHeight) {
    setTimeout(() => {
      scrollBottom(); // 滚动到底部
    }, 0);
  } else {
    if (info) {
      this.$message(`有新消息: ${info}`);
    }
  }
}

// 格式化时间函数
export function timeFormat(timestamp){
  function add0(m) {
    return m < 10 ? "0" + m : m;
  }

  var time = new Date(timestamp);
  var year = time.getFullYear();
  var month = time.getMonth() + 1;
  var date = time.getDate();
  var hours = time.getHours();
  var minutes = time.getMinutes();
  var seconds = time.getSeconds();
  return (
    year +
    "-" +
    add0(month) +
    "-" +
    add0(date) +
    "\n" +
    add0(hours) +
    ":" +
    add0(minutes) +
    ":" +
    add0(seconds)
  );
}

// 设置全局样式
export function setTheme(val) {
  let HTMLFontSize = document.querySelector("html").style.fontSize
      if (val == "跟随系统") {
        document.documentElement.style = ''
        document.documentElement.style.setProperty("font-size", HTMLFontSize)
      } else if (val == "深色") {
        document.documentElement.style.setProperty("--sbg", "#2d3035");
        document.documentElement.style.setProperty("--dbg", "#22252a");
        document.documentElement.style.setProperty("--bgop", "rgba(255, 255, 255, 0.5)");
        document.documentElement.style.setProperty("--color", "#fff");
        document.documentElement.style.setProperty("--border", "1px dashed #000");
        document.documentElement.style.setProperty("--iptBg", "#24272c");
        document.documentElement.style.setProperty("--title", "#2d3035");
        document.documentElement.style.setProperty("--titleColor", " #fff");
        document.documentElement.style.setProperty("--submitIptBg", "#24272c");
        document.documentElement.style.setProperty("--submitIptColor", " #aaa");
        document.documentElement.style.setProperty("--homeSearchBg", " #22252a");
        document.documentElement.style.setProperty("--homeSearchColor", " #fff");
      } else if (val == "浅色") {
        document.documentElement.style.setProperty("--sbg", "rgb(251, 251, 251)");
        document.documentElement.style.setProperty("--dbg", "#fff");
        document.documentElement.style.setProperty("--bgop", "rgba(0, 0, 0, 0.1)");
        document.documentElement.style.setProperty("--color", "#333");
        document.documentElement.style.setProperty("--border", "1px dashed #000");
        document.documentElement.style.setProperty("--iptBg", "#fff");
        document.documentElement.style.setProperty("--title", "rgb(251, 251, 251)");
        document.documentElement.style.setProperty("--titleColor", "#000");
        document.documentElement.style.setProperty("--submitIptBg", "rgb(239, 239, 239)");
        document.documentElement.style.setProperty("--submitIptColor", " #333");
        document.documentElement.style.setProperty("--homeSearchBg", " #fff");
        document.documentElement.style.setProperty("--homeSearchColor", " #000");
      }
}