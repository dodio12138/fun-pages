# 设备数据 JSON 填写规范

## 文件结构

```json
{
  "windows": [
    {
      "id": "windowId",
      "title": "窗口标题",
      "position": { "margin": "32px", "width": "300px" },
      "items": [...]
    }
  ]
}
```

## 窗口配置

### 基本属性
- `id`: 窗口唯一标识符 (必需)
- `title`: 窗口标题，建议使用 emoji + 描述 (必需)
- `position`: 窗口位置和大小配置 (可选)

### 标题格式建议
- 📷 Camera Equipment
- 💻 Laptop & Desktop  
- 📱 Mobile Devices
- 🎮 Gaming Consoles

## 设备项目配置

### 基本设备项
```json
{
  "name": "设备名称",
  "type": "设备类型",
  "status": "状态",
  "tooltip": "悬浮提示"
}
```

### 文件夹类型设备
```json
{
  "name": "设备名称",
  "type": "folder",
  "status": "状态",
  "tooltip": "悬浮提示",
  "children": [
    // 子项目配置
  ]
}
```

## 属性详解

### name (必需)
设备或配置项的名称，需要遵循命名规范。

### type (推荐)
设备或配置的类型，用于自动高亮：

#### 硬件类型
- `processor`: 处理器
- `memory`: 内存
- `storage`: 存储设备
- `display`: 显示屏
- `graphics`: 显卡
- `camera`: 相机规格

#### 软件类型
- `system`: 操作系统

#### 其他类型
- `color`: 颜色
- `feature`: 功能特性
- `resolution`: 分辨率
- `folder`: 文件夹（用于分组）

### status (可选)
- `deleted`: 已删除/已更换的项目，会显示删除线

### tooltip (可选)
鼠标悬浮时显示的提示信息。

**格式建议**: "描述，地点，时间"
- 例如: "Sold second-hand for ￥3000, China, Oct 2024"
- 例如: "Upgraded memory to 24GB, London, Jul 2025"

## 命名规范

### 处理器 (processor)
```
品牌 型号 @ 频率 (架构信息)
```
**示例**:
- Intel Core i5-7300HQ @ 2.50GHz
- Apple A12 Bionic (7nm)
- Snapdragon 7+ Gen 2 (4nm)

### 内存 (memory)
```
品牌 型号 容量 类型-频率 (规格说明)
```
**示例**:
- Samsung 16GB DDR4-2400 (8GB x2)
- SK hynix HMA82GS6DJR8N-VK 16GB DDR4-2666MHz
- 32GB DDR5-4800MHz (16GB x2)

### 存储 (storage)
```
品牌 型号 容量 转速/接口 设备类型
```
**示例**:
- HGST HTS721010A9E630 1TB 7200RPM HDD
- Samsung 980 PRO 2TB NVMe PCIe Gen4 SSD
- ZHITAI PC005 Active 1TB NVMe SSD

### 显示屏 (display)
```
尺寸 分辨率等级 刷新率 面板类型 (型号/色域)
```
**示例**:
- 15.6" Full HD IPS Display (AUO41ED)
- 17.3" QHD 240Hz IPS (2560x1440, 100% DCI-P3)
- 6.1" Liquid Retina LCD

### 显卡 (graphics)
```
品牌 型号 (显存信息)
```
**示例**:
- NVIDIA GeForce GTX 1050 (2GB GDDR5)
- NVIDIA GeForce RTX 3080 Ti Mobile (16GB GDDR6)
- Intel HD Graphics 630 (Integrated)

### 相机 (camera)
```
像素 + 功能描述 或 镜头规格
```
**示例**:
- 12MP Single Camera
- 50MP Triple Camera System
- Tamron 28-300mm f/2.8-5.6 Di III RXD (Sony E)

### 分辨率 (resolution)
```
宽度 x 高度px @ 像素密度ppi
```
**示例**:
- 1792 x 828px @ 326ppi
- 2560 x 1440px @ 220ppi

### 系统 (system)
```
系统名 版本 & 其他系统
```
**示例**:
- Windows 11 Pro
- Windows 10 Pro & Ubuntu 24.04 LTS
- Windows 10 Pro & Kali 2025

### 颜色 (color)
使用官方颜色名称
**示例**:
- White, Black, Gold, Silver
- Midnight Black, Space Gray
- Purple, Pink

## 高亮效果

根据 `type` 自动应用不同颜色高亮：

- **处理器**: 绿色 - 频率、核心数、型号
- **内存**: 棕色 - DDR类型，蓝色 - 容量，橙色 - 频率
- **存储**: 蓝色 - 容量和类型，橙色 - 转速
- **显示**: 蓝色 - 尺寸和技术，紫色 - 分辨率，橙色 - 频率/密度
- **显卡**: 绿色 - 型号，棕色 - 显存
- **相机**: 橙色 - 像素，绿色 - 光圈，蓝色 - 焦距
- **系统**: 各品牌经典配色 (Windows蓝、Ubuntu橙、Apple黑等)

## 完整示例

```json
{
  "windows": [
    {
      "id": "mainWindow2",
      "title": "💻 Laptop & Desktop",
      "position": { "margin": "32px", "width": "300px" },
      "items": [
        {
          "name": "HP Pavilion Power 15-cb0xx",
          "type": "folder",
          "children": [
            { 
              "name": "Intel Core i5-7300HQ @ 2.50GHz", 
              "type": "processor" 
            },
            { 
              "name": "Samsung 16GB DDR4-2400 (8GB x2)",
              "type": "memory",
              "status": "deleted",
              "tooltip": "Upgraded memory to 24GB, London, Jul 2025"
            },
            { 
              "name": "ZHITAI PC005 Active 1TB NVMe SSD", 
              "type": "storage" 
            },
            { 
              "name": "Windows 10 Pro & Kali 2025", 
              "type": "system" 
            }
          ]
        }
      ]
    }
  ]
}
```

## 注意事项

1. **一致性**: 同类型设备使用统一的命名格式
2. **可读性**: 优先使用官方/标准名称
3. **完整性**: 重要技术参数尽量完整
4. **时效性**: 及时更新设备状态和tooltip信息
5. **扩展性**: 新增type时需要在JS和CSS中添加对应的高亮规则

## 更新日志

- 2025-07-15: 初始规范文档
- 存储设备命名格式统一为: 品牌 型号 容量 规格 类型
- 系统类型增加经典配色高亮支持
