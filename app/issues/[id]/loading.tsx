// app/issues/[id]/loading.tsx
import { Card, Flex, Skeleton } from "@radix-ui/themes";

export default function IssueDetailLoadingPage() {
    return (
        <div className="p-4">
            <Skeleton className="h-7 w-2/5" />
            <Flex gap="4" my="4" align="center">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-4 w-36" />
            </Flex>

            <Card mt="6" className="prose">
                <div className="space-y-3 py-3">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[92%]" />
                    <Skeleton className="h-4 w-[85%]" />
                    <Skeleton className="h-4 w-[88%]" />
                    <Skeleton className="h-4 w-[70%]" />
                </div>
            </Card>
        </div>
    );
}
