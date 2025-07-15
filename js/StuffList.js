// 窗口层级管理
var windowZIndexCounter = 1000; // 起始z-index值
var allWindows = []; // 动态窗口列表

// 简单吸附配置
var snapDistance = 10; // 吸附距离（像素）

function bringWindowToFront(targetWindow) {
    // 将目标窗口设置为最高层级
    windowZIndexCounter++;
    targetWindow.style.zIndex = windowZIndexCounter;
    
    // 确保其他窗口的z-index较低
    allWindows.forEach(function(window) {
        if (window && window !== targetWindow) {
            if (!window.style.zIndex || parseInt(window.style.zIndex) >= windowZIndexCounter) {
                window.style.zIndex = windowZIndexCounter - 1;
            }
        }
    });
}

// 简单的窗口吸附函数（包含屏幕边缘检测）
function snapToWindows(draggedWindow, x, y) {
    var draggedRect = {
        left: x,
        top: y,
        right: x + draggedWindow.offsetWidth,
        bottom: y + draggedWindow.offsetHeight
    };
    
    var snapX = x;
    var snapY = y;
    
    // 屏幕边缘检测和限制
    var screenWidth = window.innerWidth;
    var screenHeight = window.innerHeight;
    var edgeMargin = 5; // 允许窗口离屏幕边缘的最小距离
    
    // 限制窗口不能超出屏幕边界
    snapX = Math.max(edgeMargin, Math.min(snapX, screenWidth - draggedWindow.offsetWidth - edgeMargin));
    snapY = Math.max(edgeMargin, Math.min(snapY, screenHeight - draggedWindow.offsetHeight - edgeMargin));
    
    // 更新拖拽矩形位置（基于边缘约束后的位置）
    draggedRect.left = snapX;
    draggedRect.top = snapY;
    draggedRect.right = snapX + draggedWindow.offsetWidth;
    draggedRect.bottom = snapY + draggedWindow.offsetHeight;
    
    // 屏幕边缘吸附检测
    var edgeSnapDistance = 15; // 屏幕边缘吸附距离
    
    // 左边缘吸附
    if (Math.abs(draggedRect.left - 0) < edgeSnapDistance) {
        snapX = 0;
    }
    // 右边缘吸附
    else if (Math.abs(draggedRect.right - screenWidth) < edgeSnapDistance) {
        snapX = screenWidth - draggedWindow.offsetWidth;
    }
    
    // 顶部边缘吸附
    if (Math.abs(draggedRect.top - 0) < edgeSnapDistance) {
        snapY = 0;
    }
    // 底部边缘吸附
    else if (Math.abs(draggedRect.bottom - screenHeight) < edgeSnapDistance) {
        snapY = screenHeight - draggedWindow.offsetHeight;
    }
    
    // 更新拖拽矩形位置（基于边缘吸附后的位置）
    draggedRect.left = snapX;
    draggedRect.top = snapY;
    draggedRect.right = snapX + draggedWindow.offsetWidth;
    draggedRect.bottom = snapY + draggedWindow.offsetHeight;
    
    // 检查与其他窗口的吸附
    allWindows.forEach(function(otherWindow) {
        if (!otherWindow || otherWindow === draggedWindow || 
            otherWindow.style.display === 'none') return;
        
        var otherRect = otherWindow.getBoundingClientRect();
        
        // 检查是否在垂直范围内重叠（用于水平吸附）
        var verticalOverlap = !(draggedRect.bottom < otherRect.top || 
                               draggedRect.top > otherRect.bottom);
        
        // 检查是否在水平范围内重叠（用于垂直吸附）
        var horizontalOverlap = !(draggedRect.right < otherRect.left || 
                                 draggedRect.left > otherRect.right);
        
        if (verticalOverlap) {
            // 左边吸附到右边
            if (Math.abs(draggedRect.left - otherRect.right) < snapDistance) {
                snapX = otherRect.right;
            }
            // 右边吸附到左边
            else if (Math.abs(draggedRect.right - otherRect.left) < snapDistance) {
                snapX = otherRect.left - draggedWindow.offsetWidth;
            }
            // 左边对齐
            else if (Math.abs(draggedRect.left - otherRect.left) < snapDistance) {
                snapX = otherRect.left;
            }
            // 右边对齐
            else if (Math.abs(draggedRect.right - otherRect.right) < snapDistance) {
                snapX = otherRect.right - draggedWindow.offsetWidth;
            }
        }
        
        if (horizontalOverlap) {
            // 顶部吸附到底部
            if (Math.abs(draggedRect.top - otherRect.bottom) < snapDistance) {
                snapY = otherRect.bottom;
            }
            // 底部吸附到顶部
            else if (Math.abs(draggedRect.bottom - otherRect.top) < snapDistance) {
                snapY = otherRect.top - draggedWindow.offsetHeight;
            }
            // 顶部对齐
            else if (Math.abs(draggedRect.top - otherRect.top) < snapDistance) {
                snapY = otherRect.top;
            }
            // 底部对齐
            else if (Math.abs(draggedRect.bottom - otherRect.bottom) < snapDistance) {
                snapY = otherRect.bottom - draggedWindow.offsetHeight;
            }
        }
    });
    
    // 最终边界检查：确保窗口吸附后仍在屏幕内
    snapX = Math.max(0, Math.min(snapX, screenWidth - draggedWindow.offsetWidth));
    snapY = Math.max(0, Math.min(snapY, screenHeight - draggedWindow.offsetHeight));
    
    return { x: snapX, y: snapY };
}

// 创建窗口HTML结构
function createWindowElement(windowData, index) {
    const windowDiv = document.createElement('div');
    windowDiv.className = 'window';
    windowDiv.id = windowData.id;
    
    // 应用位置样式
    const position = windowData.position || {};
    Object.keys(position).forEach(function(style) {
        windowDiv.style[style] = position[style];
    });
    
    windowDiv.innerHTML = `
        <div class="title-bar">
            <div class="title-bar-text">
                ${windowData.title}
            </div>
            <div class="title-bar-controls">
                <button aria-label="Minimize"></button>
                <button aria-label="Close"></button>
            </div>
        </div>
        <div class="window-body">
            <ul class="tree-view">
                <!-- 数据将通过 renderItems 函数填充 -->
            </ul>
        </div>
        <div class="status-bar">
            <p class="status-bar-field">Press F1 for help</p>
            <p class="status-bar-field">Owned by Levy Zhang</p>
        </div>
    `;
    
    return windowDiv;
}

// 数据加载和渲染功能
async function loadDeviceData() {
    try {
        const response = await fetch('../res/devices.json');
        const data = await response.json();
        createAndRenderWindows(data);
        return Promise.resolve();
    } catch (error) {
        console.error('Failed to load device data:', error);
        // 创建错误提示窗口
        const errorWindow = document.createElement('div');
        errorWindow.className = 'window';
        errorWindow.style.margin = '32px';
        errorWindow.style.width = '300px';
        errorWindow.innerHTML = `
            <div class="title-bar">
                <div class="title-bar-text">Error</div>
            </div>
            <div class="window-body">
                <p>Failed to load device data</p>
            </div>
        `;
        document.body.appendChild(errorWindow);
        return Promise.reject(error);
    }
}

// 创建和渲染所有窗口
function createAndRenderWindows(data) {
    // 清空现有窗口
    allWindows = [];
    
    data.windows.forEach(function(windowData, index) {
        // 创建窗口元素
        const windowElement = createWindowElement(windowData, index);
        document.body.appendChild(windowElement);
        
        // 添加到窗口列表
        allWindows.push(windowElement);
        
        // 渲染设备列表
        const treeElement = windowElement.querySelector('.tree-view');
        if (treeElement) {
            treeElement.innerHTML = renderItems(windowData.items);
            
            // 动态调整窗口宽度
            adjustWindowWidth(windowElement, treeElement);
        }
    });
    
    // 数据渲染完成后初始化窗口功能
    initializeWindowFunctions();
}

// 动态调整窗口宽度函数
function adjustWindowWidth(windowElement, treeElement) {
    // 获取用户在JSON中指定的宽度
    const specifiedWidth = windowElement.style.width ? 
        parseInt(windowElement.style.width.replace('px', '')) : null;
    
    // 默认最小宽度
    const defaultMinWidth = 250;
    let maxTextWidth = 0;
    
    // 创建临时测量元素
    const tempElement = document.createElement('div');
    tempElement.style.visibility = 'hidden';
    tempElement.style.position = 'absolute';
    tempElement.style.fontSize = window.getComputedStyle(treeElement).fontSize;
    tempElement.style.fontFamily = window.getComputedStyle(treeElement).fontFamily;
    tempElement.style.fontWeight = 'bold'; // 考虑加粗文字
    document.body.appendChild(tempElement);
    
    // 测量所有文本内容的宽度
    const allTextElements = treeElement.querySelectorAll('a, summary');
    allTextElements.forEach(function(element) {
        tempElement.innerHTML = element.innerHTML;
        const textWidth = tempElement.offsetWidth;
        if (textWidth > maxTextWidth) {
            maxTextWidth = textWidth;
        }
    });
    
    // 清理临时元素
    document.body.removeChild(tempElement);
    
    // 计算内容需要的宽度（添加padding和margin的空间）
    const extraSpace = 60; // 考虑padding、margin、滚动条等
    const contentNeededWidth = maxTextWidth + extraSpace;
    
    // 智能宽度决策逻辑
    let finalWidth;
    
    if (specifiedWidth) {
        // 如果用户指定了宽度
        if (contentNeededWidth <= specifiedWidth) {
            // 内容宽度小于等于指定宽度，使用指定宽度
            finalWidth = specifiedWidth;
            console.log(`窗口 ${windowElement.id}: 使用用户指定宽度 ${specifiedWidth}px (内容需要 ${contentNeededWidth}px)`);
        } else {
            // 内容宽度大于指定宽度，使用内容优化宽度
            finalWidth = Math.max(defaultMinWidth, contentNeededWidth);
            console.log(`窗口 ${windowElement.id}: 内容超出指定宽度，使用优化宽度 ${finalWidth}px (指定 ${specifiedWidth}px，内容需要 ${contentNeededWidth}px)`);
        }
    } else {
        // 用户未指定宽度，使用自动优化
        finalWidth = Math.max(defaultMinWidth, contentNeededWidth);
        console.log(`窗口 ${windowElement.id}: 用户未指定宽度，使用优化宽度 ${finalWidth}px`);
    }
    
    // 应用最终宽度
    windowElement.style.width = finalWidth + 'px';
}

function initializeWindowFunctions() {
    var isClone = false;

    // 为每个动态创建的窗口设置事件监听器
    allWindows.forEach(function(windowElement) {
        if (!windowElement) return;
        
        var minimize = windowElement.querySelector("button[aria-label='Minimize']");
        var close = windowElement.querySelector("button[aria-label='Close']");
        var windowBody = windowElement.querySelector(".window-body");
        var statusBody = windowElement.querySelector(".status-bar");
        
        // 最小化功能
        if (minimize) {
            minimize.addEventListener("click", function() {
                if(windowBody.style.display !== "none"){
                    windowBody.style.display = "none";
                    statusBody.style.display = "none";
                }else{
                    windowBody.style.display = "block";
                    statusBody.style.display = "flex";
                }
            });
        }
        
        // 关闭功能
        if (close) {
            close.addEventListener("click", function() {
                windowElement.style.display = 'none';
            });
        }
        
        // 拖拽功能
        var isDragging = false;
        var offsetX, offsetY;
        
        windowElement.addEventListener("mousedown", function (e) {
            isDragging = true;
            offsetX = e.clientX - windowElement.getBoundingClientRect().left;
            offsetY = e.clientY - windowElement.getBoundingClientRect().top;
            
            // 设置窗口为绝对定位
            windowElement.style.position = 'absolute';
            windowElement.style.margin = '0';
            
            // 将当前窗口置于最前面
            bringWindowToFront(windowElement);
        });
        
        document.addEventListener("mousemove", function (e) {
            if (!isDragging) return;
            
            var x = e.clientX - offsetX;
            var y = e.clientY - offsetY;
            
            // 应用窗口吸附
            var snapPosition = snapToWindows(windowElement, x, y);
            
            windowElement.style.left = snapPosition.x + "px";
            windowElement.style.top = snapPosition.y + "px";
        });
        
        document.addEventListener("mouseup", function () {
            isDragging = false;
        });
    });

    // 修复 checkClose 函数
    function checkClose(){
        var mainWindow = allWindows[0]; // 使用第一个窗口
        if(mainWindow && mainWindow.style.display === 'none' && isClone == false ){
            for(let i = 0; i < 100; i++){
                setTimeout(() => {
                    const divCopy = mainWindow.cloneNode(true);
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
}

function renderItems(items) {
    if (!items || items.length === 0) return '';
    
    return items.map(function(item) {
        if (item.type === 'folder' && item.children) {
            // 渲染文件夹类型的项目
            const statusClass = item.status === 'deleted' ? ' class="deleted-item"' : '';
            const tooltipAttr = item.tooltip ? ` title="${item.tooltip}" data-tooltip="true"` : ' data-tooltip="false"';
            
            return `
                <li>
                    <details close>
                        <summary${statusClass}${tooltipAttr}>${item.name}</summary>
                        <ul>
                            ${renderItems(item.children)}
                        </ul>
                    </details>
                </li>
            `;
        } else {
            // 渲染普通项目
            let classNames = [];
            
            // 添加删除状态样式
            if (item.status === 'deleted') {
                classNames.push('deleted-item');
            }
            
            const classAttr = classNames.length > 0 ? ` class="${classNames.join(' ')}"` : '';
            const tooltipAttr = item.tooltip ? ` title="${item.tooltip}" data-tooltip="true"` : ' data-tooltip="false"';
            
            // 根据item的type对内容进行targeted高亮处理
            const enhancedName = highlightKeyInfo(item.name, item.type);
            
            // 调试日志
            if (item.status === 'deleted') {
                console.log('Found deleted item:', item.name, 'classAttr:', classAttr);
            }
            
            return `<li><a${classAttr}${tooltipAttr}>${enhancedName}</a></li>`;
        }
    }).join('');
}

// 根据type返回对应的CSS类名
function getTypeClass(type) {
    const typeClassMap = {
        'processor': 'key-processor',
        'memory': 'key-memory',
        'storage': 'key-storage',
        'display': 'key-display',
        'resolution': 'key-resolution',
        'graphics': 'key-processor', // 显卡也使用处理器样式
        'system': '', // 系统信息不需要特殊高亮
        'camera': '', // 相机信息不需要特殊高亮
        'color': '', // 颜色信息不需要特殊高亮
        'feature': '' // 功能信息不需要特殊高亮
    };
    
    return typeClassMap[type] || '';
}

// 基于type进行targeted内容高亮的函数
function highlightKeyInfo(text, itemType) {
    // 如果item有特定type，根据type进行针对性处理
    if (itemType) {
        switch(itemType) {
            case 'processor':
                // 只高亮处理器相关的数字和规格
                text = text.replace(/(\d+\.?\d*\s*GHz)/g, '<span class="key-frequency">$1</span>');
                text = text.replace(/(\d+-core)/g, '<span class="key-processor">$1</span>');
                text = text.replace(/(Core\s+i\d+[^\s@]*)/g, '<span class="key-processor">$1</span>');
                text = text.replace(/(A\d+\s+Bionic)/g, '<span class="key-processor">$1</span>');
                text = text.replace(/(Snapdragon\s+[\d+\s*Gen\s*\d+]*)/g, '<span class="key-processor">$1</span>');
                text = text.replace(/(Alder\s+Lake|Tiger\s+Lake)/g, '<span class="key-processor">$1</span>');
                return text;
                
            case 'memory':
                // 只高亮内存相关的数字和规格
                text = text.replace(/(\d+\s*GB)/g, '<span class="key-storage">$1</span>');
                text = text.replace(/(DDR\d+(-\d+)?MHz?)/g, '<span class="key-memory">$1</span>');
                text = text.replace(/(LPDDR\d+X?)/g, '<span class="key-memory">$1</span>');
                text = text.replace(/(\d+MHz)/g, '<span class="key-frequency">$1</span>');
                return text;
                
            case 'storage':
                // 只高亮存储相关的数字和规格
                text = text.replace(/(\d+\s*[GT]B)/g, '<span class="key-storage">$1</span>');
                text = text.replace(/(NVMe|PCIe\s+Gen\d+|SSD|HDD)/g, '<span class="key-storage">$1</span>');
                text = text.replace(/(\d+RPM)/g, '<span class="key-frequency">$1</span>');
                return text;
                
            case 'display':
                // 只高亮显示相关的数字和规格
                text = text.replace(/(\d+\.?\d*")/g, '<span class="key-display">$1</span>');
                text = text.replace(/(\d+\s*x\s*\d+)/g, '<span class="key-resolution">$1</span>');
                text = text.replace(/(\d+Hz)/g, '<span class="key-frequency">$1</span>');
                text = text.replace(/(\d+ppi)/g, '<span class="key-density">$1</span>');
                text = text.replace(/(QHD|FHD|4K|Full\s+HD)/g, '<span class="key-display">$1</span>');
                text = text.replace(/(IPS|OLED|LCD|Retina)/g, '<span class="key-display">$1</span>');
                text = text.replace(/(\d+%\s*[A-Z-]+)/g, '<span class="key-display">$1</span>');
                return text;
                
            case 'graphics':
                // 只高亮显卡相关的数字和规格
                text = text.replace(/(RTX\s+\d+\s*Ti?\s*Mobile?)/g, '<span class="key-processor">$1</span>');
                text = text.replace(/(GTX\s+\d+)/g, '<span class="key-processor">$1</span>');
                text = text.replace(/(\d+\s*GB\s+GDDR\d+)/g, '<span class="key-memory">$1</span>');
                text = text.replace(/(GDDR\d+)/g, '<span class="key-memory">$1</span>');
                return text;
                
            case 'camera':
                // 只高亮相机相关的数字和规格
                text = text.replace(/(\d+MP)/g, '<span class="key-frequency">$1</span>');
                text = text.replace(/(f\/\d+\.?\d*(?:-\d+\.?\d*)?)/g, '<span class="key-processor">$1</span>');
                text = text.replace(/(\d+(?:-\d+)?mm)/g, '<span class="key-display">$1</span>');
                return text;
                
            case 'system':
                // 为系统信息添加经典配色高亮
                text = text.replace(/(Windows\s+\d+\s*\w*)/g, '<span class="key-windows">$1</span>');
                text = text.replace(/(Ubuntu\s+[\d.]+\s*\w*)/g, '<span class="key-ubuntu">$1</span>');
                text = text.replace(/(Kali\s+\d+)/g, '<span class="key-kali">$1</span>');
                text = text.replace(/(macOS|iOS|iPadOS)/g, '<span class="key-apple">$1</span>');
                text = text.replace(/(Android)/g, '<span class="key-android">$1</span>');
                text = text.replace(/(Nintendo\s+Switch\s+OS)/g, '<span class="key-nintendo">$1</span>');
                return text;
                
            case 'color':
                // 颜色信息不需要特殊数字高亮，保持原样
                return text;
                
            case 'feature':
                // 功能特性不需要特殊数字高亮，保持原样
                return text;
                
            case 'resolution':
                // 只高亮分辨率相关的数字和规格
                text = text.replace(/(\d+\s*x\s*\d+)/g, '<span class="key-resolution">$1</span>');
                text = text.replace(/(\d+ppi)/g, '<span class="key-density">$1</span>');
                return text;
        }
    }
    
    // 对于没有特定type的内容，只进行基本的数字高亮（不改变颜色，只加粗）
    text = text.replace(/(\d+\.?\d*\s*GHz)/g, '<span class="key-number">$1</span>');
    text = text.replace(/(\d+\s*[GT]B)/g, '<span class="key-number">$1</span>');
    text = text.replace(/(\d+MHz)/g, '<span class="key-number">$1</span>');
    text = text.replace(/(\d+Hz)/g, '<span class="key-number">$1</span>');
    text = text.replace(/(\d+ppi)/g, '<span class="key-number">$1</span>');
    text = text.replace(/(\d+MP)/g, '<span class="key-number">$1</span>');
    
    return text;
}

setInterval(() => {
    // Perform detection
    // checkClose();
}, 100);

// 页面加载完成后加载设备数据
document.addEventListener('DOMContentLoaded', function() {
    loadDeviceData().then(function() {
        // 数据加载完成，窗口功能已经在loadDeviceData中初始化
        console.log('Device data loaded and windows initialized');
    }).catch(function(error) {
        console.error('Failed to initialize:', error);
    });
});