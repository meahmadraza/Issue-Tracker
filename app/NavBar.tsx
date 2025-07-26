'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation';
import React from 'react'
import { AiFillBug } from "react-icons/ai";
import classNames from 'classnames';

const NavBar = () => {
    const currentPath = usePathname()
    const links = [
        { href: '/', label: 'Dashboard' },
        { href: '/issues', label: 'Issues' }
    ];
    return (
        <nav className='flex space-x-5 items-center border-b mb-5 px-5 h-14 '>
            <Link href="/"><AiFillBug /></Link>
            <ul className='flex space-x-5'>
                {links.map(link =>
                    <Link href={link.href} key={link.href}
                        className={classNames({
                            'text-zinc-900': currentPath === link.href,
                            'text-zinc-500': currentPath !== link.href,
                            'hover:text-zinc-900 transition-colors': true
                        })}>
                        {link.label}
                    </Link>
                )}
            </ul>
        </nav>
    )
}

export default NavBar
