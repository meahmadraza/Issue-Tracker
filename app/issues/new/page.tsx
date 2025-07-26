"use client"

import dynamic from "next/dynamic";
import "easymde/dist/easymde.min.css";
import React, { useState } from 'react'
import axios from "axios";
import { TextField, Box, Button, Callout, Text } from '@radix-ui/themes'
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { useForm, Controller } from 'react-hook-form';
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from 'zod';
import { IssueSchema } from "@/app/validationSchema";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
    ssr: false,
});

type IssueForm = z.infer<typeof IssueSchema>


const NewIssuePage = () => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(IssueSchema)
    })
    const router = useRouter();
    const [error, setError] = useState('')
    return (
        <div className="max-w-2xl p-4">
            {error && <Callout.Root className="mb-4" color="red">
                <Callout.Icon>
                    <InfoCircledIcon />
                </Callout.Icon>
                <Callout.Text>
                    {error}
                </Callout.Text>
            </Callout.Root>}
            <form className='space-y-4' onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post("/api/issues", data)
                    router.push("/issues");

                } catch {
                    setError("An unexpected error occurred.");
                }
            })}>
                <Box>
                    <TextField.Root size="2" placeholder='Title' {...register("title")} />
                    {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}
                </Box>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Add Description..." {...field} />}
                />
                {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}
                <Button>Submit new Issue</Button>
            </form >
        </div>
    )
}

export default NewIssuePage
