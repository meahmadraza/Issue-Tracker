import { Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'
import React, { Suspense } from 'react'
import FilterIssue from './FilterIssue'

const IssuesActionBar = () => {
    return (
        <Flex mb='5' justify='between'>
            <Suspense fallback={<div>Loading filters...</div>}>
                <FilterIssue />
            </Suspense>
            <div>
                <Button><Link href="/issues/new">New Issue</Link></Button>
            </div>
        </Flex>
    )
}

export default IssuesActionBar
