function getEl(name) {
  let tag = document.querySelector(name)
  tag.flag = false
  return tag
}

function setStyle(how, obj, callback) {
  let el = document.querySelector(how)
  for (k in obj) {
    el.style[k] = obj[k]
  }
  callback && callback()
}

let topLeft = getEl('.left')
let LeftMenu = getEl('.LeftMenu')
let right = getEl('.right')
let rightFun = getEl('.rightFun')
let rightFunUl = document.querySelector('.rightFun').querySelector('ul')
let rightFunLI = document.querySelector('.rightFun').querySelector('ul').querySelectorAll('li')
let Center = getEl('.Center')
let kaipingdonghua = getEl('.kaipingdonghua')
let kaipingdonghuaSpan = getEl('.kaipingdonghua').querySelector('span')

setTimeout(() => {
  kaipingdonghua.style.opacity = 0;
  setTimeout(() => {
    kaipingdonghua.style.display = 'none';
  }, 1000)
}, 2700)

setTimeout(() => {
  kaipingdonghuaSpan.style.animation = 'opEnd 1s infinite';
  setTimeout(() => {
    kaipingdonghuaSpan.style.display = 'none';
  }, 1000)
}, 2700)

kaipingdonghua.addEventListener('click', function (e) {
  kaipingdonghuaSpan.style.left = e.clientX + 'px';
  kaipingdonghuaSpan.style.top = e.clientY + 'px';
  kaipingdonghuaSpan.style.animation = 'opEnd 1s infinite';
  kaipingdonghua.style.opacity = 0;
  setTimeout(() => {
    kaipingdonghua.style.display = 'none';
  }, 1000)
})

Center.addEventListener('click', function (e) {
  if (topLeft.flag) {
    topLeft.click()
  } else if (right.flag) {
    right.click()
  }
}, false)

topLeft.addEventListener('click', function (e) {
  e.stopPropagation();
  this.flag = !this.flag
  if (this.flag && !right.flag) {
    LeftMenu.style.left = '0'
  } else if (this.flag) {
    right.click()
    LeftMenu.style.left = '0'
  } else {
    LeftMenu.style.left = -LeftMenu.offsetWidth - 10 + 'px'
  }
})

let label = document.querySelectorAll('label')

right.addEventListener('click', function (e) {
  e.stopPropagation();
  this.flag = !this.flag
  if (this.flag && !topLeft.flag) {
    setStyle('.rightFun', {
      width: '3.8rem',
      height: rightFunLI.length + 'rem'
    }, function () {
      setTimeout(() => {
        for (let i = 0; i < label.length; i++) {
          label[i].style.display = 'block'
        }
      }, 200)
    })
  } else if (this.flag) {
    topLeft.click()
    setStyle('.rightFun', {
      width: '3.8rem',
      height: rightFunLI.length + 'rem'
    }, function () {
      setTimeout(() => {
        for (let i = 0; i < label.length; i++) {
          label[i].style.display = 'block'
        }
      }, 200)
    })
  } else {
    rightFun.style = null
  }
})

let night = document.querySelector('.night') // 黑夜按钮
let turn = document.querySelector('.turn') // 翻转按钮
let leftGb = document.querySelector('.leftGb') // 侧栏背景按钮
let crazy = document.querySelector('.crazy') // 抽风按钮

let nightToastFlag = false
night.addEventListener('click', function () {
  if (night.checked) {
    setStyle('.Maintop', {
      transition: 'all .5s',
      color: '#bbb',
      backgroundColor: '#2D3035',
    })

    setStyle('.LeftMenu', {
      color: '#bbb',
      backgroundColor: '#22252A',
    }, function () {
      console.log(1);
      getEl('.LeftMenu').classList.remove('LeftMenuBg')
    })

    setStyle('.rightFunUl', {
      color: '#bbb',
      backgroundColor: '#22252A',
    })
    
    setStyle('.Center', {
      transition: 'all .5s',
      color: '#bbb',
      backgroundColor: '#2D3035',
    })

    let bn = document.querySelectorAll('.siptAndBtn')
    bn.forEach((item, index) => {
      console.log(item);
      item.style.transition = 'all .5s';
      item.style.color = '#e0e0e0';
      item.style.backgroundColor = 'rgba(255,255,255,0.1)'
    })
  } else {
    if (leftGb.checked) {
      // 如果夜间模式是关闭的，并且侧栏背景是打开的，就添加这个侧栏背景类名
      LeftMenu.classList.add('LeftMenuBg')
    }

    setStyle('.Maintop', {
      transition: 'all .5s',
      color: '#DFE6DF',
      backgroundColor: '#3a3a3a',
      boxShadow: '0 0 5px 0px rgba(0, 0, 0, 0.5)'
    })

    setStyle('.LeftMenu', {
      color: '#666',
      backgroundColor: '#fff'
    })

    setStyle('.rightFunUl', {
      color: '#666',
      background: '#fff',
    })

    setStyle('.Center', {
      transition: 'all .5s',
      color: '#708090',
      backgroundColor: 'transparent',
    })

    let bn = document.querySelectorAll('.siptAndBtn')
    bn.forEach((item, index) => {
      console.log(item);
      item.style.transition = 'all .5s';
      item.style.color = '#e0e0e0';
      item.style.backgroundColor = '#3a3a3a'
    })
  }
  tiShi()
})

leftGb.addEventListener('click', function () {
  if (this.checked && night.checked) {
    LeftMenu.classList.remove('LeftMenuBg')
  } else if (this.checked) {
    LeftMenu.classList.add('LeftMenuBg')
  } else {
    LeftMenu.classList.remove('LeftMenuBg')
  }
  tiShi()
})

function tiShi() {
  if (night.checked && leftGb.checked && !nightToastFlag) {
    nightToastFlag = true
    getEl('.bottomAsex').innerText = '在夜间模式下,\t 侧栏背景的修改不会生效'
    setStyle('.bottomAsex', {
      display: 'block',
      position: 'absolute',
      top: '50%',
      left: '50%',
      width: '100vw',
      textAlign: 'center',
      transform: 'translate(-50%,-50%)',
      opacity: '1',
      fontSize: '0.5rem',
      fontWeight: '900',
      color: '#fff',
      zIndex: '999',
      transition: 'all .5s'
    }, function () {
      setTimeout(() => {
        setStyle('.bottomAsex', {
          opacity: 0,
          transition: 'all .5s'
        }, function () {
          setTimeout(() => {
            getEl('.bottomAsex').innerText = null
            getEl('.bottomAsex').cssText = null
          }, 500)
        })
      }, 1500);
    })
  }
}

turn.addEventListener('click', function () {
  this.checked ? setStyle('body', { transition: 'all .5s', transform: 'rotateY(180deg)' }) : setStyle('body', { transition: 'all .5s', transform: 'rotateY(0deg)' })
})

crazy.addEventListener('click', function () {
  this.checked ? setStyle('body', { animation: 'rotate 0.01s infinite' }) : setStyle('body', { animation: null })
})

let ceShiInput = document.querySelectorAll('.ceshi')
let checkAllToast = true

for (i = 0; i < ceShiInput.length; i++) {
  ceShiInput[i].onclick = function () {
    let flag = true;
    ceShiInput.forEach((item, index) => {
      console.log(!ceShiInput[index].checked, Date.now());
      if (!ceShiInput[index].checked) flag = false
    })

    if (flag && checkAllToast) {
      checkAllToast = false
      getEl('.bottomAsex').innerText = '不要点啦!\t Hentai!!'
      setStyle('.bottomAsex', {
        display: 'block',
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '100vw',
        textAlign: 'center',
        transform: 'translate(-50%,-50%)',
        opacity: '1',
        fontSize: '0.5rem',
        fontWeight: '900',
        color: 'pink',
        zIndex: '999',
        transition: 'all .5s'
      }, function () {
        setTimeout(() => {
          setStyle('.bottomAsex', {
            opacity: 0,
          }, function () {
            setTimeout(() => {
              getEl('.bottomAsex').innerText = null
              getEl('.bottomAsex').style = null
            }, 500)
          })
        }, 1500);
      })
    }
  }
}
