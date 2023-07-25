document.addEventListener('DOMContentLoaded', function() {

    const flag = document.getElementsByClassName('flag');

    const text = document.getElementById('text')
  
    const flagsize = flag[0].offsetWidth;

    const screenWidth = (window.innerWidth - 100);

    //console.log("屏幕宽度：" + screenWidth + " 像素");

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
        }

      });
});