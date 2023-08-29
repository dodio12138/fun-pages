// 获取输出容器的引用
const outputDiv = document.getElementById("list");

// 构建YAML文件的路径
// const yamlFilePath = '../res/languages.yaml'; // 替换为实际的文件名和路径

const yamlFilePath = 'https://raw.githubusercontent.com/github-linguist/linguist/master/lib/linguist/languages.yml'; // 替换为实际的文件名和路径
// 使用XMLHttpRequest对象读取YAML文件
const xhr = new XMLHttpRequest();
xhr.open('GET', yamlFilePath, true);


xhr.onload = function() {
    if (xhr.status === 200) {
        const yamlData = xhr.responseText;
        try {
            // 解析YAML数据
            const parsedData = jsyaml.load(yamlData);

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
            for(const ling in parsedData){
                const language = parsedData[ling];
                const elementDiv = document.createElement("div");
                console.log(language.color);
                elementDiv.className = 'item';
                elementDiv.style.display = 'flex';
                elementDiv.style.gap = '8px';
                elementDiv.innerHTML = `
                    <span class="circle" style=" display= 'block'; background-color: ${language.color}"></span>
                    <span>${ling}</span>
                `;
                outputDiv.appendChild(elementDiv);
            }
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