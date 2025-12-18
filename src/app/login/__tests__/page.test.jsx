import '@testing-library/jest-dom'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import LoginPage from '../page'
import { useRouter } from 'next/navigation'

// jest.mock: 模拟外部模块
// 这里我们模拟 'next/navigation'，因为我们在组件中使用了 router.push
// 实际测试环境中路由跳转功能需要被接管
jest.mock('next/navigation', () => ({
    useRouter: jest.fn(),
}))

describe('LoginPage', () => {
    it('renders login form', () => {
        // 设定 mock 函数的返回值
        // 当 useRouter 被调用时，返回一个包含 push 方法的对象
        // push 也是一个 mock 函数，方便后续断言它是否被调用
        useRouter.mockReturnValue({ push: jest.fn() })

        render(<LoginPage />)
        expect(screen.getByRole('heading', { name: /Welcome Back/i })).toBeInTheDocument()
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
        expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
        expect(screen.getByRole('button', { name: /Sign In/i })).toBeInTheDocument()
    })

    it('navigates to home on successful login', async () => {
        // 创建一个新的 mock 函数用于追踪 push 调用
        const push = jest.fn()
        useRouter.mockReturnValue({ push })

        render(<LoginPage />)

        // 模拟输入账号密码
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } })
        fireEvent.change(screen.getByLabelText(/Password/i), { target: { value: 'password123' } })

        const button = screen.getByRole('button', { name: /Sign In/i })
        fireEvent.click(button)

        expect(button).toBeDisabled()
        expect(button).toHaveTextContent('Signing in...')

        // toHaveBeenCalledWith: 断言 mock 函数被以特定的参数调用了
        // 这里验证登录成功后是否跳转到了首页 '/'
        await waitFor(() => {
            expect(push).toHaveBeenCalledWith('/')
        }, { timeout: 5000 })
    })
})
