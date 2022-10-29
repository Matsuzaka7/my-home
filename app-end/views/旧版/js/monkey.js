let p = document.querySelector('.Center').querySelector('h3')
let btn = document.querySelector('.Center').querySelectorAll('button')
let h5 = document.querySelector('.Center').querySelector('h5')
let ipt = document.querySelector('.Center').querySelector('input')
let a = document.querySelector('.Center').querySelectorAll('#a')

btn[0].onclick = function () {
  if (ipt.value == false) {
    ipt.value = arr.length;
    h5.innerHTML = '当前排列数字的个数为：' + arr.length
  } else {
    h5.innerHTML = '当前排列数字的个数为：'
    h5.innerHTML += ipt.value
    arr = [];
    for (let i = 0; i < ipt.value; i++) {
      arr.push(i)
    }
    for (let i = 0; i < a.length; i++) {
      a[i].className = ''
      if (ipt.value == i + 5) {
        a[i].className = 'blue'
      } else if (ipt.value > 9 || ipt.value < 5) {
        a[5].className = 'blue'
      }
    }
  }

}

let arr = [1, 2, 3, 4, 5]
h5.innerHTML += arr.length
a[0].className = 'blue'

btn[1].onclick = function () {
  p.innerHTML = '请稍等...'
  setTimeout(() => {
    bogoSort(arr)
  }, 100);
}

/* var sum = 0;
for (var i = 0; i < 100; i++) {
  var a = bogoSort(arr)
  sum += a[1]
}
console.log('平均次数为' + (sum / 100));
*/
function bogoSort(arr) {

  let n = 0, ordered = false;

  function shuffle(array) {
    for (let i = 0, length = arr.length; i < length; i++) {
      let j = Math.floor(Math.random() * length); // 随机数
      [arr[i], arr[j]] = [arr[j], arr[i]];
      n++;
    }
  }

  function isOrdered(array) {
    for (let i = 1, length = arr.length; i < length; i++) {
      // 判断所有值的 前一位是否小于后一位
      if (arr[i] < arr[i - 1]) {
        return false;
      }
    }
    return true;
  }

  while (ordered == false) { // 效率低下的位置
    v = shuffle(arr);
    ordered = isOrdered(arr);
  }
  p.innerHTML = ('计算了' + n + '次')
  return [arr, n];
}