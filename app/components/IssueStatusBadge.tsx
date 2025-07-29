import { Badge } from '@radix-ui/themes'
import React from 'react'
import { IssueStatus } from '../generated/prisma'

const statusRecord: Record<IssueStatus, { label: string, color: 'red' | 'green' | 'violet' }> = {
    OPEN: { label: 'Open', color: 'red' },
    IN_PROGRESS: { label: 'In Progress', color: 'violet' },
    CLOSED: { label: 'Closed', color: 'green' }
}

const IssueStatusBadge = ({ status }: { status: IssueStatus }) => {
    return (
        <Badge color={statusRecord[status].color}>
            {statusRecord[status].label}
        </Badge>
    )
}

export default IssueStatusBadge
