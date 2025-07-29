import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation';
import React from 'react'
import { ObjectId } from "mongodb";
import { Box, Button, Card, Flex, Heading, Text } from '@radix-ui/themes';
import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import ReactMarkdown from 'react-markdown';
import { Pencil2Icon } from '@radix-ui/react-icons';
import Link from 'next/link';

interface Props {
    params: {
        id: string;
    }
}

const IssueDetailPage = async ({ params }: Props) => {

    if (!ObjectId.isValid(params.id)) {
        notFound();
    }

    const issue = await prisma.issue.findUnique({
        where: {
            id: params.id
        }
    });

    if (!issue)
        notFound();
    return (
        <Box className='p-4'>
            <Heading>{issue.title}</Heading>
            <Flex gap='4' my='4'>
                <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card mt='6' className='prose'>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
            <Button mt='4'>
                <Pencil2Icon />
                <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
            </Button>
        </Box>
    )
}

export default IssueDetailPage
