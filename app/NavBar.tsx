'use client'
import { Avatar, Box, DropdownMenu, Flex, Skeleton, Text } from '@radix-ui/themes';
import classNames from 'classnames';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {

    return (
        <nav className='border-b mb-5 px-5 py-3'>
            <Flex justify='between'>
                <Flex align='center' gap='4'>
                    <Link href="/"><AiFillBug /></Link>
                    <NavLinks />
                </Flex>
                <NavAuthStatus />
            </Flex>


        </nav>
    )
}

const NavAuthStatus = () => {
    const { status, data: session } = useSession()

    if (status === 'loading') return <Skeleton className="py-3 h-9 w-20 rounded" />;

    if (status === 'unauthenticated')
        return <Link href='/api/auth/signin'>Login</Link>

    return (
        <Box>
            <DropdownMenu.Root >
                <DropdownMenu.Trigger>
                    <Avatar src={session!.user!.image!} fallback='?' size='2' radius='full' className='cursor-pointer'></Avatar>
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                    <DropdownMenu.Label>
                        <Text size='2'>
                            {session!.user!.email}
                        </Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item>
                        <Link href='/api/auth/signout'>Logout</Link>
                    </DropdownMenu.Item>
                </DropdownMenu.Content>
            </DropdownMenu.Root>
        </Box>
    )
}

const NavLinks = () => {
    const currentPath = usePathname()

    const links = [
        { href: '/', label: 'Dashboard' },
        { href: '/issues', label: 'Issues' }
    ];
    return (
        <ul className='flex space-x-5'>
            {links.map(link =>
                <li key={link.href}>
                    <Link href={link.href}
                        className={classNames({
                            'text-zinc-900': currentPath === link.href,
                            'text-zinc-500': currentPath !== link.href,
                            'hover:text-zinc-900 transition-colors': true
                        })}>
                        {link.label}
                    </Link>
                </li>
            )}
        </ul>
    )
}

export default NavBar
