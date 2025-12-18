import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import RootLayout from '../layout'

describe('RootLayout', () => {
    it('renders navigation links', () => {
        // 渲染 RootLayout 组件
        // 注意：因为 Layout 包含 children，所以我们在测试中需要传入子元素
        // <div data-testid="child"> 用于方便在测试中查找这个子元素，验证它是否被正确渲染
        render(
            <RootLayout>
                <div data-testid="child">Child Content</div>
            </RootLayout>
        )

        // 验证导航链接是否存在且 href 属性正确
        expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
        expect(screen.getByRole('link', { name: 'Blog' })).toHaveAttribute('href', '/blog')
        expect(screen.getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/contact')
        expect(screen.getByRole('link', { name: 'Login' })).toHaveAttribute('href', '/login')

        // getByTestId: 通过 data-testid 属性查找元素
        // 常用于查找那些难以通过 role 或 text 唯一定位的元素
        expect(screen.getByTestId('child')).toBeInTheDocument()
    })
})
