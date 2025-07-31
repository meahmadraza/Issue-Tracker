import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import FilterIssue from './FilterIssue'

const IssuesActionBar = () => {
    return (
        <Flex mb='5' justify='between'>
            <FilterIssue />
            <div>
                <Button><Link href="/issues/new">New Issue</Link></Button>
            </div>
        </Flex>
    )
}

export default IssuesActionBar
