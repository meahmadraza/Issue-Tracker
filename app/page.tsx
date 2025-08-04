import React from 'react'
import IssueSummary from './IssueSummary'
import { prisma } from '@/prisma/client'
import IssueChart from './IssueChart'
import { Flex, Grid } from '@radix-ui/themes'
import LatestIssues from './LatestIssues'
import { Metadata } from 'next'

const page = async () => {
  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const close = await prisma.issue.count({ where: { status: 'CLOSED' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })
  return (
    <div className='p-5'>
      <Grid columns={{ initial: '1', md: '2' }} gap='5'>
        <Flex direction='column' gap='5'>
          <IssueSummary open={open} closed={close} inProgress={inProgress} />
          <IssueChart open={open} closed={close} inProgress={inProgress} />
        </Flex>
        <LatestIssues />
      </Grid>
    </div>
  )
}



export default page

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'View a comprehensive dashboard summarizing open, in-progress, and closed issues to monitor project progress and team workload effectively.'
}

