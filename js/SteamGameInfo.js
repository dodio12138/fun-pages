// 获取输出容器的引用
const outputDiv = document.getElementById("list");
const l_types = document.getElementById("l_type");


const jsonFilePath = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=3D4750BA1A6F2D58B55552B74420E197&steamid=76561198806925309&format=json&include_appinfo=true'; // 替换为实际的文件名和路径
// 使用XMLHttpRequest对象读取JSON文件
const xhr = new XMLHttpRequest();
xhr.open('GET', jsonFilePath, true);


xhr.onload = function() {
    if (xhr.status === 200) {
        const jsonData = xhr.responseText;
        try {
            // 解析YAML数据
            const parsedData = jsyaml.load(jsonData);

            // 清空输出容器
            outputDiv.innerHTML = "";
            // 遍历解析后的数据并创建HTML元素
            // parsedData.forEach(item => {
            //     const elementDiv = document.createElement("div");
            //     elementDiv.innerHTML = `
            //         <span class="circle" style="background-color: ${item.color}"></span>
            //         <span>${item}</span>
            //     `;
            //     outputDiv.appendChild(elementDiv);
            // });
            let i = 0;
            for(const ling in parsedData){
                const language = parsedData[ling];
                const elementDiv = document.createElement("div");
                elementDiv.className = 'item';
                elementDiv.style.display = 'flex';
                elementDiv.style.gap = '8px';
                elementDiv.innerHTML = `
                    <span class="circle" style="background-color: ${language.color}"></span>
                    <span>${ling}</span>
                `;
                outputDiv.appendChild(elementDiv);
                i++;
            }
            l_types.innerText = `<---${i}--->`;
        } catch (error) {
            console.error("Error parsing YAML:", error);
            outputDiv.innerHTML = "Error parsing YAML file.";
        }
    } else {
        console.error("Failed to load YAML file:", xhr.statusText);
        outputDiv.innerHTML = "Failed to load YAML file.";
    }
};

xhr.send();