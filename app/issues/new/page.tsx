import { Metadata } from 'next'
import React from 'react'
import NewIssuePage from './NewIssuePage'

const page = () => {
    return <NewIssuePage />
}

export default page
export const metadata: Metadata = {
    title: 'Issue Tracker - Create New Issue',
    description: 'Add a new issue to the tracker with relevant details like title, description, priority, and status to streamline your project workflow.'
}
