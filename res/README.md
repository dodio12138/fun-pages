# 设备数据 JSON 结构说明

## 基本结构
每个设备项目可以包含以下属性：

### 必需属性
- `name`: 设备名称（字符串）

### 可选属性
- `type`: 设备类型
  - `"folder"`: 表示这是一个可展开的文件夹，包含子项
  - 不设置: 表示这是一个普通的设备项目

- `status`: 设备状态
  - `"deleted"`: 设备已被删除/丢失/被偷，会显示删除线
  - 不设置: 正常状态

- `tooltip`: 鼠标悬停提示信息（字符串）
  - 当鼠标移动到设备名称上时显示的提示文字

- `children`: 子项数组（仅当 type 为 "folder" 时有效）
  - 包含设备的详细规格或子设备

## 示例

### 普通设备
```json
{
  "name": "Sony α6300"
}
```

### 文件夹设备
```json
{
  "name": "HP Pavilion Power Laptop 15",
  "type": "folder",
  "children": [
    { "name": "Intel(R) Core(TM) i5-7300HQ CPU 2.50GHz" },
    { "name": "8GB RAM" }
  ]
}
```

### 被删除/丢失的设备
```json
{
  "name": "Redmi Note 12 Turbo",
  "type": "folder",
  "status": "deleted",
  "tooltip": "Stolen at Piccadilly Circus bus station, UK in December 2024",
  "children": [
    { "name": "Snapdragon 7+ Gen2" },
    { "name": "Black" }
  ]
}
```

### 带提示的普通设备
```json
{
  "name": "Canon 800D",
  "tooltip": "Bought in 2019, excellent condition"
}
```

## 样式效果
- 设置了 `status: "deleted"` 的设备会显示删除线和灰色文字
- 设置了 `tooltip` 的设备在鼠标悬停时会显示提示信息
- 两个属性可以同时使用
