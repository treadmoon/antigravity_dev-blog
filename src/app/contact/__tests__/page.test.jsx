import '@testing-library/jest-dom'
// fireEvent: 用于模拟用户交互事件（如点击、输入等）
// waitFor: 用于处理异步操作，等待某个断言最终通过
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import ContactPage from '../page'

describe('ContactPage', () => {
    it('renders contact form', () => {
        render(<ContactPage />)
        // getByLabelText: 通过关联的 label 文本查找表单元素（input, textarea 等）
        // 这是访问性最好的查询方式之一
        expect(screen.getByRole('heading', { name: /Get in Touch/i })).toBeInTheDocument()
        expect(screen.getByLabelText(/Name/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Message/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Send Message/i })).toBeInTheDocument()
    })

    it('submits the form', async () => {
        render(<ContactPage />)

        // 模拟用户在输入框中输入内容
        // fireEvent.change 触发 change 事件
        fireEvent.change(screen.getByLabelText(/Name/i), { target: { value: 'Test User' } })
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } })
        fireEvent.change(screen.getByLabelText(/Message/i), { target: { value: 'Hello world' } })

        const button = screen.getByRole('button', { name: /Send Message/i })

        // 模拟点击提交按钮
        fireEvent.click(button)

        // 验证按钮是否处于禁用状态（加载中）
        expect(button).toBeDisabled()
        expect(button).toHaveTextContent('Sending...')

        // 等待异步操作完成（例如 API 调用后的状态更新）
        // waitFor 会重复运行回调函数，直到不再报错或超时（默认 1000ms，这里设置了 5000ms）
        await waitFor(() => {
            expect(screen.getByText(/Thank you for your message/i)).toBeInTheDocument()
        }, { timeout: 5000 })

        // 验证提交完成后按钮状态恢复
        expect(button).not.toBeDisabled()
        expect(button).toHaveTextContent('Send Message')
    })
})
