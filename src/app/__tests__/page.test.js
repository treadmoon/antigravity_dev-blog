// 引入 jest-dom 以扩展 Jest 的断言匹配器（例如：toBeInTheDocument）
import '@testing-library/jest-dom'
// 引入 React Testing Library 的 render 和 screen 工具
// render: 用于在测试环境中渲染 React 组件
// screen: 用于查询渲染后的 DOM 元素
import { render, screen } from '@testing-library/react'
import Home from '../page'

// describe: 定义一个测试套件（Test Suite），用于将相关的测试用例分组
describe('Home', () => {
    // it: 定义一个测试用例（Test Case），第一个参数是描述，第二个参数是测试逻辑
    it('renders the heading', () => {
        // 渲染 Home 组件
        render(<Home />)

        // getByRole: 通过 ARIA role（角色）查找元素
        // { level: 1 } 限定查找 h1 标签
        const heading = screen.getByRole('heading', { level: 1 })

        // expect: Jest 的断言函数，用于判断结果是否符合预期
        // toBeInTheDocument: 断言元素是否存在于文档中
        expect(heading).toBeInTheDocument()

        // toHaveTextContent: 断言元素的文本内容包含特定字符串
        expect(heading).toHaveTextContent('Elevate Your')
    })

    it('renders the documentation link', () => {
        render(<Home />)

        // 通过 role 和 name (通常是文本内容或 aria-label) 查找链接
        // /Documentation/i 是一个正则表达式，i 表示忽略大小写
        const link = screen.getByRole('link', { name: /Documentation/i })

        expect(link).toBeInTheDocument()

        // toHaveAttribute: 断言元素是否具有特定的属性和值
        expect(link).toHaveAttribute('href', 'https://nextjs.org')
    })
})
