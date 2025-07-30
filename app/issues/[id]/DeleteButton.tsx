'use client'
import { Issue } from '@/app/generated/prisma'
import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import React from 'react'
import { useRouter } from 'next/navigation'

const DeleteButton = ({ issue }: { issue: Issue }) => {

    const Router = useRouter();

    const deleteIssue = async () => {
        await axios.delete(`/api/issues/${issue.id}`);
        Router.push("/issues");
        Router.refresh();
    }

    return (
        <AlertDialog.Root>
            <AlertDialog.Trigger>
                <Button color='red'>
                    <TrashIcon />
                    Delete Issue
                </Button>
            </AlertDialog.Trigger>
            <AlertDialog.Content>
                <AlertDialog.Title>Delete Issue</AlertDialog.Title>
                <AlertDialog.Description>
                    Are you sure you want to delete this issue?
                </AlertDialog.Description>
                <Flex gap='4' mt='4'>
                    <AlertDialog.Cancel>
                        <Button variant='soft' color='gray'>Cancel</Button>
                    </AlertDialog.Cancel>
                    <AlertDialog.Action>
                        <Button color='red' onClick={deleteIssue}>Delete</Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteButton
