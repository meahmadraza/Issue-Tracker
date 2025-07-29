import { prisma } from '@/prisma/client'
import { notFound } from 'next/navigation';
import React from 'react'
import { ObjectId } from "mongodb";

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
        <div>
            <h1>Issue Detail Page</h1>
            <p>{issue.title}</p>
            <p>{issue.status}</p>
            <p>{issue.description}</p>
            <p>{issue.createdAt.toDateString()}</p>

        </div>
    )
}

export default IssueDetailPage
