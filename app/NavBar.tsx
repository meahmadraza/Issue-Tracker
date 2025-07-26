import Link from 'next/link'
import React from 'react'
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
    const links = [
        { href: '/', label: 'Dashboard' },
        { href: '/issues', label: 'Issues' }
    ];
    return (
        <nav className='flex space-x-5 items-center border-b mb-5 px-5 h-14 '>
            <Link href="/"><AiFillBug /></Link>
            <ul className='flex space-x-5'>
                {links.map(link =>
                    <Link href={link.href} key={link.href} className='text-zinc-600 hover:text-zinc-900 transition-colors'>{link.label}</Link>
                )}
            </ul>
        </nav>
    )
}

export default NavBar
