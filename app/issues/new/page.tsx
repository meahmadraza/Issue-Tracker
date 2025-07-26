"use client"

import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import React from 'react'
import axios from "axios";
import { TextField, Box, Button } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from "next/navigation";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
});

interface IssueForm {
    title: string;
    description: string;
}


const NewIssuePage = () => {
    const { register, control, handleSubmit } = useForm<IssueForm>()
    const router = useRouter();
    return (
        <form className='p-4 space-y-4' onSubmit={handleSubmit(async (data) => {
            await axios.post("/api/issues", data)
            router.push("/issues");
        })}>
            <Box className='max-w-xl'>
                <TextField.Root size="2" placeholder='Title' {...register("title")} />
            </Box>
            <Controller
                name="description"
                control={control}
                render={({ field }) => <SimpleMDE className='max-w-xl' placeholder="Add Description..." {...field} />}
            />
            <Button>Submit new Issue</Button>

        </form >
    )
}

export default NewIssuePage
