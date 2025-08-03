import React from 'react'
import { IssueStatus } from './generated/prisma'
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link'

interface Props {
    open: number,
    inProgress: number,
    closed: number
}

const IssueSummary = ({ open, inProgress, closed }: Props) => {
    const statuses: { label: string, value: number, status: IssueStatus }[] = [
        { label: 'Open Issues', value: open, status: 'OPEN' },
        { label: 'In Progress Issues', value: inProgress, status: 'IN_PROGRESS' },
        { label: 'Closed Issues', value: closed, status: 'CLOSED' }
    ]

    return (
        <Flex gap='3'>
            {statuses.map(item => (
                <Card key={item.label}>
                    <Flex direction='column' gap='1'>
                        <Link href={`/issues?status=${item.status}`}>{item.status}</Link>
                        <Text size='5' weight='bold'>{item.value}</Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    )
}

export default IssueSummary
