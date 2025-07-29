"use client"
import React from 'react'
import dynamic from 'next/dynamic'
import NewIssueLoadingPage from './loading'

const IssueForm = dynamic(() => import("../_components/IssueForm"), {
    loading: () => <NewIssueLoadingPage />,
    ssr: false
})

const NewIssuePage = () => {
    return (
        <IssueForm />
    )
}

export default NewIssuePage
