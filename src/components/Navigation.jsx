'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Navigation() {
    const pathname = usePathname() || ''

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/blog', label: 'Blog' },
        { href: '/contact', label: 'Contact' },
        { href: '/demos', label: 'Demos' },
    ]

    const isLoginActive = pathname === '/login' || pathname.startsWith('/login')

    return (
        <nav className="nav">
            <div className="nav-center">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href ||
                        (link.href !== '/' && pathname.startsWith(link.href))

                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={isActive ? 'active' : ''}
                        >
                            {link.label}
                        </Link>
                    )
                })}
            </div>
            <div className="nav-right">
                <Link
                    href="/login"
                    className={isLoginActive ? 'active' : ''}
                >
                    Login
                </Link>
            </div>
        </nav>
    )
}

