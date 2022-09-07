window.onload = function () {

    // 需求1：鼠标经过大盒子，展示左右的按钮
    var container = document.querySelector('.container');
    var leftBox = document.querySelector('.arrow a:first-child');
    var rightBox = document.querySelector('.arrow a:last-child');
    container.onmouseenter = function () {
        leftBox.style.display = 'block';
        rightBox.style.display = 'block';

        clearInterval(timer);
    }
    container.onmouseleave = function () {
        leftBox.style.display = 'none';
        rightBox.style.display = 'none';

        clearInterval(timer);
        timer = setInterval(rightBox.onclick, 1500);
    }

    // 需求2：点击下标小圆点，滑动图片
    var olLis = document.querySelectorAll('ol li');
    var ulBox = document.querySelector('ul');
    // 单张图片的宽度
    var imgWidth = ulBox.children[0].offsetWidth;
    ulBox.style.width = ulBox.children.length * imgWidth + 'px';
    ulBox.style.left = -imgWidth + 'px';
    olLis.forEach(function (el, index) {
        el.onclick = function () {
            paiTa(index);
            // 移动的是ulBox
            move(index);
            // 统一索引
            count = index;
        }
    })

    function paiTa(n) {
        // 小圆点的排他
        olLis.forEach(function (item) {
            item.removeAttribute('class');
        })
        olLis[n].className = 'current';
    }

    function move(n) {
        ulBox.style.transition = 'left 0.35s ease-in-out';
        ulBox.style.left = -imgWidth * (n + 1) + 'px';
    }

    // 需求3：左右按钮触发滑动
    var count = 0;
    var flag = true;
    rightBox.onclick = function () {
        if (flag) {
            flag = false;
            count++;

            move(count);
            if (count >= ulBox.children.length - 2) return paiTa(0);
            paiTa(count);
        }
    }
    leftBox.onclick = function () {
        if (flag) {
            flag = false;
            count--;
            move(count);
            if (count < 0) return paiTa(5);
            paiTa(count);
        }
    }

    // 监听最后一张结束和第一张跳转
    var lastIndex = ulBox.children.length - 2;
    ulBox.ontransitionend = function () {
        if (count < 0) {
            // 已经去往复制的最后一张了
            ulBox.style.transition = 'none';
            ulBox.style.left = -imgWidth * lastIndex + 'px';
            count = lastIndex - 1;
        } else if (count >= lastIndex) {
            // 已经去往复制的第一张了
            ulBox.style.transition = 'none';
            ulBox.style.left = -imgWidth + 'px';
            count = 0;
        }

        flag = true;
    }


    // 需求4:  自动轮播
    var timer = setInterval(rightBox.onclick, 1500);
}