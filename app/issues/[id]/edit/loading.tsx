import { Card, Flex, Skeleton } from "@radix-ui/themes";

export default function EditIssueLoadingPage() {
    return (
        <div className="max-w-4xl p-4 space-y-4">

            <div>
                <Skeleton className="h-9 w-full" />
            </div>

            <Card>
                <div className="space-y-3 py-3">
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-[95%]" />
                    <Skeleton className="h-4 w-[92%]" />
                    <Skeleton className="h-4 w-[90%]" />
                    <Skeleton className="h-4 w-[85%]" />
                    <Skeleton className="h-48 w-full" />
                </div>
            </Card>
            <Flex>
                <Skeleton className="h-9 w-44" />
            </Flex>
        </div>
    );
}
