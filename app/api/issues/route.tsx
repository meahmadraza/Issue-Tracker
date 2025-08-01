import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '../../../prisma/client';
import { IssueSchema } from '../../validationSchema';


export async function POST(request: NextRequest) {
    const body = await request.json()
    const validation = IssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error, { status: 400 });

    const newIssue = await prisma.issue.create({
        data: {
            title: body.title,
            description: body.description
        }
    })

    return NextResponse.json(newIssue, { status: 201 });
}