const panel = document.getElementById('panel');

document.addEventListener('DOMContentLoaded', function () {

    //绘制时间线
    const magine = 100; //偏移量
    const jianxi = 60;

    const nowyear = new Date();
    const year = nowyear.getFullYear();

    const timelineDiv = document.createElement('div');
    timelineDiv.className = 'timeline';
    timelineDiv.style.top = magine + 'px';
    const timeDiv = document.createElement('div');
    timeDiv.className = 'time';
    timeDiv.innerHTML = year;

    timelineDiv.appendChild(timeDiv);
    panel.appendChild(timelineDiv);


    for (let i = 0; i < 15; i++) {
        const time = 2000 - i * 50;
        const timelineDiv = document.createElement('div');
        timelineDiv.className = 'timeline';
        timelineDiv.style.top = (2023 - time) * 2 + magine + 'px';
        const timeDiv = document.createElement('div');
        timeDiv.className = 'time';
        timeDiv.innerHTML = time;

        timelineDiv.appendChild(timeDiv);
        panel.appendChild(timelineDiv);
    }

    // 读取JSON文件
    fetch('../res/philosophers.json')
        .then(response => response.json())
        .then(data => {
            let randomGroup = [];
            for (let person in data) {
                if (data.hasOwnProperty(person)) {
                    const name = findName(data[person].name);
                    const born = data[person].bornyear;
                    const dead = data[person].deadyear;

                    const pDiv = document.createElement('div');
                    pDiv.className = 'p-div';
                    const nameDiv = document.createElement('div');
                    nameDiv.className = 'name';
                    nameDiv.innerHTML = name;

                    if (dead == null) {
                        pDiv.style.top = magine + 'px';
                        pDiv.style.height = (year - born) * 2 + 'px';
                    } else {
                        pDiv.style.top = (2023 - dead) * 2 + magine + 'px';
                        pDiv.style.height = (dead - born) * 2 + 'px';
                    }
                    pDiv.style.left = person * jianxi + magine + 'px';
                    pDiv.style.height = (dead - born) * 2 + 'px';
                    pDiv.style.backgroundColor = randomHSLColor();

                    pDiv.appendChild(nameDiv);
                    panel.appendChild(pDiv);
                }
            }
        })
        .catch(error => console.error('Error reading JSON file:', error));
});

function findName(inputString) {
    const lastDotIndex = inputString.lastIndexOf('·');

    if (lastDotIndex !== -1) {
        return inputString.substring(lastDotIndex + 1);
    } else {
        return inputString;
    }
};

function randomHSLColor() {
    // 生成随机的色相值 (0-360)
    const hue = Math.floor(Math.random() * 360);

    // 固定饱和度和亮度值
    const saturation = 50;
    const value = 50;

    // 返回 HSV 颜色字符串
    return `hsl(${hue}, ${saturation}%, ${value}%)`;
}