document.addEventListener('DOMContentLoaded', function() {

    const flag = document.getElementsByClassName('flag');

    const text = document.getElementById('text')
  
    const flagsize = flag[0].offsetWidth;

    const screenWidth = (window.innerWidth - 100);

    //console.log("屏幕宽度：" + screenWidth + " 像素");

    document.body.addEventListener('contextmenu', function (event) {
        // 阻止默认右击菜单的显示
        event.preventDefault();
    });
    
    flag[0].addEventListener('click', function() {
        // 获取当前元素的宽度
        const currentWidth = flag[0].offsetWidth;

        // 将宽度扩大一倍
        const newWidth = currentWidth * 2;

        // 应用新的宽度
        //flag[0].style.width = flag[0].offsetWidth + 'calc(var(--height) * 2)';
        if(screenWidth>(flag[0].offsetWidth+flag[1].offsetWidth+flag[2].offsetWidth)){
            flag[0].style.width = currentWidth + flagsize + 'px';

            text.textContent = "法" + text.textContent;
        }

    });

    flag[0].addEventListener('contextmenu', function(event) {
        // 阻止浏览器的默认右击菜单
        event.preventDefault();

        // 获取当前元素的宽度
        const currentWidth = flag[0].offsetWidth;

        // 将宽度扩大一倍
        const newWidth = currentWidth * 0.5;

        // 应用新的宽度
        if(newWidth >= flagsize){
            flag[0].style.width = (currentWidth - flagsize) + 'px';
            text.textContent = text.textContent.replace('法', "");
        }else {
            flag[0].style.width = '0px';
            text.textContent = text.textContent.replace('法', "");
        }
        if (flag[1].style.width == (3*flagsize+'px')&&flag[0].offsetWidth==0&&flag[2].offsetWidth==0) {
            text.textContent = '法兰西';
            document.body.style.cursor = "url('../res/cur/3.cur'),default";
        }

      });

    flag[1].addEventListener('click', function() {
        // 获取当前元素的宽度
        const currentWidth = flag[1].offsetWidth;

        // 将宽度扩大一倍
        const newWidth = currentWidth * 2;

        // 应用新的宽度
        if(screenWidth>(flag[0].offsetWidth+flag[1].offsetWidth+flag[2].offsetWidth)){
        flag[1].style.width = currentWidth + flagsize + 'px';

        // 获取当前元素的文本内容
        let textType = text.textContent;

        // 找到“兰”的位置
        const index = textType.indexOf('兰');

        if (index !== -1) {
        // 在“兰”的左边插入一个“兰”字
            const newText = textType.slice(0, index) + '兰' + textType.slice(index);

            // 应用新的文本内容
            text.textContent = newText;}}
        console.log(flag[1].style.width);
        currentText = text.textContent;
        if (flag[1].style.width == (3*flagsize+'px')&&flag[0].offsetWidth==0&&flag[2].offsetWidth==0) {
            text.textContent = '法兰西';
            document.body.style.cursor = "url('../res/cur/3.cur'),default";
        }else if(flag[1].style.width == (4*flagsize+'px')&&flag[0].offsetWidth==0&&flag[2].offsetWidth==0){
            text.textContent = '兰兰兰兰';
            document.body.style.cursor = "url('../res/cur/1.cur'),default";
        }
    });

    flag[1].addEventListener('contextmenu', function(event) {
        // 阻止浏览器的默认右击菜单
        event.preventDefault();

        // 获取当前元素的宽度
        const currentWidth = flag[1].offsetWidth;

        // 将宽度扩大一倍
        const newWidth = currentWidth * 0.5;

        // 应用新的宽度
        if(newWidth >= flagsize){
            flag[1].style.width = (currentWidth - flagsize) + 'px';
            
            text.textContent = text.textContent.replace('兰', "");
        }else {
            flag[1].style.width = '0px';
            text.textContent = text.textContent.replace('兰', "");
        }
        console.log(flag[1].style.width);
        if (flag[1].style.width == (3*flagsize+'px')&&flag[0].offsetWidth==0&&flag[2].offsetWidth==0) {
            text.textContent = '法兰西';
            document.body.style.cursor = "url('../res/cur/3.cur'),default";
        }else if(flag[1].style.width == (2*flagsize+'px')&&flag[0].offsetWidth==0&&flag[2].offsetWidth==0){
            text.textContent = '兰兰';
            document.body.style.cursor = "url('../res/cur/1.cur'),default";
        }
      });

    flag[2].addEventListener('click', function() {
        // 获取当前元素的宽度
        const currentWidth = flag[2].offsetWidth;

        // 将宽度扩大一倍
        const newWidth = currentWidth * 2;

        // 应用新的宽度
        if(screenWidth>(flag[0].offsetWidth+flag[1].offsetWidth+flag[2].offsetWidth)){
        flag[2].style.width = currentWidth + flagsize + 'px';

        text.textContent = text.textContent + "西";
        }
    });

    flag[2].addEventListener('contextmenu', function(event) {
        // 阻止浏览器的默认右击菜单
        event.preventDefault();

        // 获取当前元素的宽度
        const currentWidth = flag[2].offsetWidth;

        // 将宽度扩大一倍
        const newWidth = currentWidth * 0.5;

        // 应用新的宽度
        if(newWidth >= flagsize){
            flag[2].style.width = (currentWidth - flagsize) + 'px';
            text.textContent = text.textContent.replace('西', "");
        }else {
            flag[2].style.width = '0px';
            text.textContent = text.textContent.replace('西', "");
        }
        if (flag[1].style.width == (3*flagsize+'px')&&flag[0].offsetWidth==0&&flag[2].offsetWidth==0) {
            text.textContent = '法兰西';
            document.body.style.cursor = "url('../res/cur/3.cur'),default";
        }

      });
});