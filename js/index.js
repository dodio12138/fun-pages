var minimize = document.getElementById("minimize");
var close = document.getElementById("close");
var windows = document.getElementById("mainWindow")
var windowBody = document.getElementById("windowbody")
var statusBody = document.getElementById("statusbody")
var isClone = false;
// 添加点击事件处理程序
minimize.addEventListener("click", function() {
    // 在这里执行你的命令
    // 可以在这里执行其他操作或调用其他函数
    if(windowBody.style.display !== "none"){
        windowBody.style.display = "none";
        statusBody.style.display = "none";
    }else{
        windowBody.style.display = "block";
        statusBody.style.display = "flex";
    }
});

close.addEventListener("click", function() {
    windows.style.display = 'none';
});

// 用于跟踪拖拽状态的变量
var isDragging = false;

// 用于存储鼠标按下时的偏移量
var offsetX, offsetY;

// 当鼠标按下时触发的事件
windows.addEventListener("mousedown", function (e) {
    isDragging = true;
    offsetX = e.clientX - windows.getBoundingClientRect().left;
    offsetY = e.clientY - windows.getBoundingClientRect().top;
    //windows.style.cursor = "grabbing"; // 光标样式为“抓取中”
  });

  // 当鼠标移动时触发的事件
document.addEventListener("mousemove", function (e) {
    if (!isDragging) return;
  
    var x = e.clientX - offsetX;
    var y = e.clientY - offsetY;
  
    // 更新 div 的位置
    windows.style.left = x + "px";
    windows.style.top = y + "px";
  });
  
  // 当鼠标释放时触发的事件
document.addEventListener("mouseup", function () {
    isDragging = false;
    //windows.style.cursor = "grab";
  });

function checkClose(){
    if(windows.style.display === 'none' && isClone == false ){        for(let i = 0; i < 100; i++){
            setTimeout(() => {
                const divCopy = windows.cloneNode(true);
                // Calculate random x and y coordinates
                const x = Math.floor(Math.random() * (1-0.2) * window.innerWidth);
                const y = Math.floor(Math.random() * (1-0.2) * window.innerHeight);            
                // Set the position of the div copy
                divCopy.style.position = 'absolute';
                divCopy.style.left = x + 'px';
                divCopy.style.top = y + 'px';
                divCopy.style.display = 'block';
                //divCopy.childNodes[0].classList.add('inactive');
                divCopy.childNodes[1].childNodes[3].remove();
                divCopy.childNodes[1].className = 'title-bar inactive';
                //divCopy.classList.add('title-bar', 'inactive');
                //console.log(divCopy.childNodes);
                //console.log(divCopy.childNodes[1]);
                // Append the div copy to the document body
                document.body.appendChild(divCopy);
              }, i * 10);
        }
        isClone = true;
    }
}

setInterval(() => {
    // Perform detection
    checkClose();
  }, 100);