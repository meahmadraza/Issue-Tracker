import React from 'react'
import IssueForm from '../../_components/IssueForm'
import { ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';
import { prisma } from '@/prisma/client';

interface Props {
    params: {
        id: string;
    }
}

const EditIssuePage = async ({ params }: Props) => {

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

        <IssueForm issue={issue} />
    )
}

export default EditIssuePage
