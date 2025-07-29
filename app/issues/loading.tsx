import { Table, Skeleton } from '@radix-ui/themes';
import IssueActionBar from './IssuesActionBar';

const IssueTableSkeleton = () => {
    const issues = [1, 2, 3, 4, 5];
    return (
        <div className="p-4">
            <IssueActionBar />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created At</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map(issue => (
                        <Table.Row key={issue}>
                            <Table.Cell>
                                <Skeleton className="h-4 w-[70%]" />
                                <div className='block md:hidden mt-1'>
                                    <Skeleton className="h-3 w-20" />
                                </div>
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>
                                <Skeleton className="h-3 w-20" />
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>
                                <Skeleton className="h-3 w-24" />
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </div>
    );
};

export default IssueTableSkeleton;
