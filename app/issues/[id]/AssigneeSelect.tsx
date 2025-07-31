'use client'
import { Issue, User } from '@/app/generated/prisma'
import { Box, Select, Skeleton } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const AssigneeSelect = ({ issue }: { issue: Issue }) => {
    const { data: users, error, isLoading } = fetchUsers()

    if (isLoading)
        return (
            <Box className="space-y-2">
                <Skeleton className="h-9 w-40 rounded-md" />
                <Skeleton className="h-6 w-28 rounded" />
                <Skeleton className="h-8 w-full rounded" />
                <Skeleton className="h-8 w-full rounded" />
                <Skeleton className="h-8 w-full rounded" />
            </Box>
        )

    if (error) return null;

    const AssignIssue = async (UserId: string) => {
        try {
            const assignedToUserId = UserId === 'none' ? null : UserId;
            await axios.patch(`/api/issues/${issue.id}`, { assignedToUserId })
            toast.success('Issue Assigned')
        } catch (error) {
            console.error('Error assigning issue:', error);
            toast.error('Could not Assign Issue');
        }
    }

    return (
        <>
            <Select.Root defaultValue={issue.assignedToUserId || "none"} onValueChange={AssignIssue}>
                <Select.Trigger placeholder='Assign Issues' />
                <Select.Content>
                    <Select.Group>
                        <Select.Label>Suggestions</Select.Label>
                        <Select.Item value="none">None</Select.Item>
                        {users?.map(user => <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}
                    </Select.Group>
                </Select.Content>
            </Select.Root>
            <Toaster />
        </>
    )
}

const fetchUsers = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: async () => {
        const { data } = await axios.get('/api/users');
        return data;
    },
    staleTime: 1000 * 60 * 5, // 5 minutes,
    retry: 2,
});

//This is the method to fetch users using useState and useEffect but have some limitations like error handling cache data
// const [users, setUsers] = useState<User[]>([])
// useEffect(() => {
//     const fetchUsers = async () => {
//         const { data } = await axios.get('/api/users');
//         setUsers(data);
//     }

//     fetchUsers();
// }, [])

export default AssigneeSelect
