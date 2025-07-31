import { patchIssueSchema } from '@/app/validationSchema';
import { prisma } from '@/prisma/client';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    const body = await request.json();
    const validation = patchIssueSchema.safeParse(body);
    if (!validation.success)
        return NextResponse.json(validation.error, { status: 400 });

    const { title, description, assignedToUserId } = body;
    if (assignedToUserId) {
        const user = await prisma.user.findUnique({
            where: { id: assignedToUserId }
        });
        if (!user)
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const issue = await prisma.issue.findUnique({
        where: { id: params.id }
    })
    if (!issue)
        return NextResponse.json({ error: 'Issue not found' }, { status: 404 });


    const updatedIssue = await prisma.issue.update({
        where: { id: params.id },
        data: {
            title,
            description,
            assignedToUserId
        }
    });
    return NextResponse.json(updatedIssue, { status: 200 });

}

export async function DELETE(request: NextRequest, params: { params: { id: string } }) {
    const issue = await prisma.issue.findUnique({
        where: { id: params.params.id }
    })
    if (!issue)
        return NextResponse.json({ error: 'Issue not found' }, { status: 404 });

    await prisma.issue.delete({
        where: { id: params.params.id }
    });
    return NextResponse.json({ message: 'Issue deleted successfully' }, { status: 200 });
}