---
applyTo: "**/*.tsx"
---

# 前端 UI 组件生成规范

## 通用规则
- 所有组件使用函数式组件和 React Hooks。
- 组件名使用 PascalCase（如 ButtonComponent）。
- 保持组件单一职责，小型化。

## 按钮组件特定规范
- 使用 Tailwind CSS 类名：基础类为 'bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'。
- 支持 props：type (button/submit)，label (字符串)，onClick (函数)，disabled (布尔)。
- 定义 TypeScript 接口：interface ButtonProps { type?: 'button' | 'submit'; label: string; onClick: () => void; disabled?: boolean; }。
- 避免内联样式，使用 CSS 模块或 Tailwind。
- 确保可访问性：添加 aria-label 如果需要。

## 其他
- 参考设计系统文档：[design-system/buttons.md](../docs/design-system/buttons.md)。