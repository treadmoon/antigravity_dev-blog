# 🎨 设计摘要 - 现代极简登录页

## 三大设计支柱

### 1️⃣ **粗体排版**
- **Playfair Display** 3.5rem 标题
- **Outfit** 轻盈的正文字体
- 拒绝 Inter/Roboto

### 2️⃣ **极简配色**
```
🤍 纯白背景
⬛ 深黑文本
🔵 海军蓝 accent (#1e3a8a)
```

### 3️⃣ **创意布局**
```
┌─────────────────────────────┐
│ Create   │    Welcome.      │
│ Design   │  Email           │
│ Build    │  Password        │
│ (rotated)│  [Sign In]       │
│          │  [Create Account]│
│          │   ↻              │
└─────────────────────────────┘
```

## ✨ 关键动画

| 元素       | 动画             | 特点                      |
| ---------- | ---------------- | ------------------------- |
| 背景Orb    | organicFlow      | 有机变形，20s周期         |
| 卡片入场   | cardEntrance     | elastic easing，overshoot |
| 按钮hover  | scale + 背景滑入 | 3D视觉，3级运动           |
| 旋转正方形 | floatingRotate   | 30s无限循环               |

## 🎯 避免的陈词滥调

```
❌ 紫色渐变    → ✅ 黑白蓝
❌ Inter字体   → ✅ Playfair Display
❌ 圆角过度    → ✅ 硬边设计
❌ SVG图标群  → ✅ ● ○ 圆点
❌ 阴影堆砌    → ✅ 单层1px border
```

## 📱 断点

- **桌面**: 左装饰 + 右表单
- **平板**: 只有表单
- **手机**: 全宽表单

## 🌓 Dark Mode

自动生效，无需额外配置。

---

**设计原则**: 大胆的排版 + 极简的颜色 + 有机的运动
