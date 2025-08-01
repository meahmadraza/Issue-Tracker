'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { PropsWithChildren } from 'react';

const ClientQueryProvider = ({ children }: PropsWithChildren) => {
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
}

export default ClientQueryProvider
