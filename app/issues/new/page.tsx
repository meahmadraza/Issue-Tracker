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
import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";

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
    const [Submitting, setSubmitting] = useState(false);

    const Submit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            await axios.post("/api/issues", data)
            router.push("/issues");

        } catch {
            setSubmitting(false);
            setError("An unexpected error occurred.");
        }
    })

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
            <form className='space-y-4' onSubmit={Submit}>
                <Box>
                    <TextField.Root size="2" placeholder='Title' {...register("title")} />
                    <ErrorMessage>
                        {errors.title?.message}
                    </ErrorMessage>
                </Box>
                <Controller
                    name="description"
                    control={control}
                    render={({ field }) => <SimpleMDE placeholder="Add Description..." {...field} />}
                />
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                <Button disabled={Submitting} >{Submitting ? <Spinner /> : "Submit new Issue"}</Button>
            </form >
        </div>
    )
}

export default NewIssuePage
