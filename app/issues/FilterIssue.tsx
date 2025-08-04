'use client'

import { Select } from '@radix-ui/themes'
import React from 'react'
import { IssueStatus } from '../generated/prisma'
import { useRouter, useSearchParams } from 'next/navigation'

const statuses: { label: string, value?: IssueStatus | 'All' }[] = [
    { label: "All", value: "All" },
    { label: "Open", value: "OPEN" },
    { label: "In Progress", value: "IN_PROGRESS" },
    { label: "Close", value: "CLOSED" }
]

const FilterIssue = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    return (
        <Select.Root
            onValueChange={(status: string) => {
                const params = new URLSearchParams(searchParams.toString());

                if (status === 'All') {
                    params.delete('status');
                } else {
                    params.set('status', status);
                }
                params.set('page', '1');

                router.push(`/issues?${params.toString()}`);
            }}
            defaultValue={searchParams.get('status') || 'All'}
        >
            <Select.Trigger placeholder='Filter Issues...' />
            <Select.Content>
                {statuses.map(status => (
                    <Select.Item key={status.label} value={status.value ?? 'All'}>
                        {status.label}
                    </Select.Item>
                ))}
            </Select.Content>
        </Select.Root>
    );
};

export default FilterIssue;
