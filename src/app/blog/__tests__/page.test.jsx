// 引入必要的测试库
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import Page from '../page'

describe('Blog Page', () => {
    it('renders the header', () => {
        render(<Page />)
        const heading = screen.getByRole('heading', { level: 1 })
        expect(heading).toHaveTextContent('Latest Updates')
    })

    it('renders a list of blog posts', () => {
        render(<Page />)

        // We expect 3 posts based on the hardcoded data
        // getAllByRole: 类似于 getByRole，但这里用于查找多个匹配的元素并返回一个数组
        // 如果没有找到元素，getByRole 会报错，queryByRole 会返回 null
        // 我们预期有多个 h2 标题（每个文章卡片一个）
        const titles = screen.getAllByRole('heading', { level: 2 })
        // toHaveLength: 断言数组的长度
        // 这里的 3 是基于我们 mock 数据中写死的文章数量
        expect(titles).toHaveLength(3)
    })

    it('renders the correct title for the first post', () => {
        render(<Page />)
        // getByText: 通过纯文本内容查找元素
        // 这对于查找具体的文章标题非常有用
        expect(screen.getByText('震惊，台风来了还下班')).toBeInTheDocument()
    })
})
