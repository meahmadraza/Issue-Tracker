import { Link as RadixLink, Table } from "@radix-ui/themes";
import Link from 'next/link';
import { prisma } from '../../prisma/client';
import IssueStatusBadge from '../components/IssueStatusBadge';
import IssuesActionBar from './IssuesActionBar';
import { IssueStatus } from "../generated/prisma";
import Pagination from "../components/Pagination";
import { Metadata } from "next";

interface Props {
    searchParams: { status: IssueStatus, page: string }
}

const IssuePage = async ({ searchParams }: Props) => {
    const params = await searchParams
    console.log(params.status);

    //Validate Status
    const statusParam = searchParams.status;
    const validStatuses = Object.values(IssueStatus);
    const status = validStatuses.includes(statusParam) ? statusParam : undefined;



    const page = parseInt(searchParams.page) || 1
    const pageSize = 6

    const issues = await prisma.issue.findMany({
        where: {
            status: status
        },
        skip: (page - 1) * pageSize,
        take: pageSize

    });

    const issueCount = await prisma.issue.count({ where: { status } })

    return (
        <div className="flex flex-col p-4 gap-3">
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
            <Pagination pageSize={pageSize} itemCount={issueCount} currentPage={page} />
        </div>
    )
}

export const dynamic = 'force-dynamic';
export default IssuePage
export const metadata: Metadata = {
    title: 'Issue Tracker - Issues',
    description: 'Browse and manage all project issues by status, including open, in-progress, and closed. Filter, track, and prioritize issues for efficient project management.'
}
