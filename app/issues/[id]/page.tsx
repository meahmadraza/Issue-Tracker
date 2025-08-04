import IssueStatusBadge from '@/app/components/IssueStatusBadge';
import { prisma } from '@/prisma/client';
import { Pencil2Icon } from '@radix-ui/react-icons';
import { Box, Button, Card, Flex, Heading, Text } from '@radix-ui/themes';
import { ObjectId } from "mongodb";
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import DeleteButton from './DeleteButton';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';
import AssigneeSelect from './AssigneeSelect';
import { Description } from '@radix-ui/themes/components/alert-dialog';

interface Props {
    params: {
        id: string;
    }
}

const IssueDetailPage = async ({ params }: Props) => {
    const session = await getServerSession(authOptions)

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
        <Box className='p-4 w-full  lg:w-[70%] xl:w-[50%]'>
            <Heading>{issue.title}</Heading>
            <Flex gap='4' my='4'>
                <IssueStatusBadge status={issue.status}></IssueStatusBadge>
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card mt='6' className='prose max-w-none'>
                <ReactMarkdown>{issue.description}</ReactMarkdown>
            </Card>
            <Flex justify='between' mt='6'>
                {session && <Flex gap='2' direction='column' className='w-[40%] md:w-[20%]'>
                    <Button>
                        <Pencil2Icon />
                        <Link href={`/issues/${issue.id}/edit`}>Edit Issue</Link>
                    </Button>
                    <DeleteButton issue={issue} />
                </Flex>}
                <AssigneeSelect issue={issue} />
            </Flex>
        </Box >
    )
}

export default IssueDetailPage

export async function generateMetadata({ params }: Props) {
    const issue = await prisma.issue.findUnique({ where: { id: params.id } })

    return {
        title: `Issue Tracker - ${issue?.title}`,
        Description: 'Explore detailed information about a specific issue, including its status, description, timeline, and related updates to stay informed and take action efficiently.'
    }
}
