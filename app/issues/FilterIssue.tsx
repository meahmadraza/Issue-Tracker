'use client'

import { Select } from '@radix-ui/themes'
import React from 'react'
import { IssueStatus } from '../generated/prisma'
import { useRouter } from 'next/navigation'

const statuses: { label: string, value?: IssueStatus | 'All' }[] = [
    { label: "All", value: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Close", value: "CLOSED" }
]

const FilterIssue = () => {
    const router = useRouter();
    return (
        <Select.Root onValueChange={(status: string) => {
            const query = status !== 'All' ? `?status=${status}` : '';
            router.push(`/issues${query}`);
        }}>
            <Select.Trigger placeholder='Filter Issues...' />
            <Select.Content>
                {statuses.map(status => (
                    <Select.Item key={status.label} value={status.value ?? 'All'}>
                        {status.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    )
}

export default FilterIssue
