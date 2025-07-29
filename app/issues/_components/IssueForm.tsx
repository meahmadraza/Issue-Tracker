"use client"

import ErrorMessage from "@/app/components/ErrorMessage";
import Spinner from "@/app/components/Spinner";
import { Issue } from "@/app/generated/prisma";
import { IssueSchema } from "@/app/validationSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Box, Button, Callout, TextField } from '@radix-ui/themes';
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import SimpleMDE from 'react-simplemde-editor';


type IssueFormData = z.infer<typeof IssueSchema>


const IssueForm = ({ issue }: { issue?: Issue }) => {
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(IssueSchema)
    })
    const router = useRouter();
    const [error, setError] = useState('')
    const [Submitting, setSubmitting] = useState(false);

    const Submit = handleSubmit(async (data) => {
        try {
            setSubmitting(true);
            if (issue)
                axios.patch(`/api/issues/${issue.id}`, data)
            else
                await axios.post("/api/issues", data)
            router.push("/issues");
            router.refresh()

        } catch {
            setSubmitting(false);
            setError("An unexpected error occurred.");
        }
    })

    return (
        <div className="max-w-4xl p-4">
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
                    <TextField.Root size="2" defaultValue={issue?.title} placeholder='Title' {...register("title")} />
                    <ErrorMessage>
                        {errors.title?.message}
                    </ErrorMessage>
                </Box>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) => <SimpleMDE placeholder="Add Description..." {...field} />}
                />
                <ErrorMessage>
                    {errors.description?.message}
                </ErrorMessage>
                <Button disabled={Submitting} >{Submitting ? (<Spinner />) : (issue ? 'Update Issue' : 'Submit new Issue')}</Button>
            </form >
        </div>
    )
}

export default IssueForm
