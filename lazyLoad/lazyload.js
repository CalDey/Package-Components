;(function(win, doc){
    var oImgList = doc.getElementsByClassName('img-list')[0],
        data = JSON.parse(doc.getElementById('img-data').innerHTML),
        imgTpl = doc.getElementById('imgTpl').innerHTML,
        oImg = doc.getElementsByClassName('list-img');

    var init = function() {
        oImgList.innerHTML = renderList(data);
        bindEvent();
        // 滚动条顶部定位
        setTimeout(function() {
            window.scrollTo(0, 0)
        }, 150)
    }

    function bindEvent() {
        // 节流防止滚动频繁触发
        window.onload = window.onscroll = throttle(imgLazyLoad(oImg), 500);
    }

    function renderList(data) {
        var list = '';
        // 替换模版
        data.forEach((el) => {
            list+= imgTpl.replace(/{{(.*?)}}/g, function(node, key){
                return {
                    img: el.img,
                    name: el.name
                }[key];
            })
        })
        return list
    }

    init()

})(window, document);

// 懒加载
function imgLazyLoad(img) {
    var imgLen = img.length;
    n = 0;

    return function() {
        var cHeight = document.documentElement.clientHeight,
            sTop = document.documentElement.scrollTop || document.body.scrollTop,
            imgItem;

        for(var i = n; i < imgLen; i++) {
            imgItem = img[i];
            if (imgItem.offsetTop < cHeight + sTop) {
                imgItem.src = imgItem.getAttribute('data-src');
                imgItem.removeAttribute('data-src');
                n++;
            }
        }
    }
}

// 节流
function throttle(fn, delay = 100) {
    let timer = null

    return function () {
      if (timer) {
        return
      }
      timer = setTimeout(() => {
        fn.apply(this, arguments)
        timer = null
      }, delay)
    }
}