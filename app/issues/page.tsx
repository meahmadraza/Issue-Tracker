import { Link as RadixLink, Table } from "@radix-ui/themes";
import Link from 'next/link';
import { prisma } from '../../prisma/client';
import IssueStatusBadge from '../components/IssueStatusBadge';
import IssuesActionBar from './IssuesActionBar';
import { IssueStatus } from "../generated/prisma";

interface Props {
    searchParams: { status: IssueStatus }
}

const IssuePage = async ({ searchParams }: Props) => {
    const params = await searchParams
    console.log(params.status);

    //Validate Status
    const statuses = Object.values(IssueStatus)
    const status = statuses.includes(params.status) ? params.status : undefined


    const issues = await prisma.issue.findMany({
        where: {
            status: status
        }
    });

    return (
        <div className="p-4">
            <IssuesActionBar />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created At</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Link href={`/issues/${issue.id}`} passHref legacyBehavior>
                                    <RadixLink>{issue.title}</RadixLink>
                                </Link>
                                <div className='block md:hidden'><IssueStatusBadge status={issue.status} /></div>
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'><IssueStatusBadge status={issue.status} /></Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export const dynamic = 'force-dynamic';
export default IssuePage
