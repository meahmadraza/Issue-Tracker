import { prisma } from '@/prisma/client'
import { Flex, Table, Link as RadixLink, Avatar, Card, Heading } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'
import IssueStatusBadge from './components/IssueStatusBadge'

const LatestIssues = async () => {
    const latesIssues = await prisma.issue.findMany({
        orderBy: {
            createdAt: 'desc'
        },
        take: 5,
        include: {
            assignedToUser: true
        }
    })
    return (
        <Card>
            <Heading mb='3'>Latest Issues</Heading>
            <Table.Root>
                <Table.Body>
                    {latesIssues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Flex justify='between'>
                                    <Flex direction='column' gap='2' align='start'>
                                        <Link href={`/issues/${issue.id}`} passHref legacyBehavior>
                                            <RadixLink>{issue.title}</RadixLink>
                                        </Link>
                                        <IssueStatusBadge status={issue.status} />
                                    </Flex>
                                    {issue.assignedToUser && (
                                        <Avatar src={issue.assignedToUser.image!} fallback='?' size='2' radius='full' className='cursor-pointer'></Avatar>

                                    )}
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>
    )
}

export default LatestIssues
