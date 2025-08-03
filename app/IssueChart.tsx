'use client'

import { Card } from '@radix-ui/themes'
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts'
import React from 'react'

interface Props {
    open: number,
    inProgress: number,
    closed: number
}

const IssueChart = ({ open, inProgress, closed }: Props) => {
    const data = [
        { label: 'Open Issues', value: open },
        { label: 'In Progress Issues', value: inProgress },
        { label: 'Closed Issues', value: closed }
    ]
    return (
        <Card>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={data}>
                    <XAxis dataKey='label' />
                    <YAxis />
                    <Bar dataKey='value' barSize={55} fill='#6e56cf' />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default IssueChart
