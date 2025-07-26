"use client"
import React from 'react'
import { TextField, Box, TextArea, Button } from '@radix-ui/themes'

const newIssuePage = () => {
    return (
        <div className='p-4 space-y-4'>
            <Box className='max-w-xl'>
                <TextField.Root size="1" placeholder='Title' />
            </Box>
            <TextArea className='max-w-xl' placeholder="Add Description..." />
            <Button>Submit new Issue</Button>

        </div >
    )
}

export default newIssuePage
