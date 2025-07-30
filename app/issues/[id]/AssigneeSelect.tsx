'use client'
import { User } from '@/app/generated/prisma'
import { Box, Select, Skeleton } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

const AssigneeSelect = () => {
    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: async () => {
            const { data } = await axios.get('/api/users');
            return data;
        },
        staleTime: 1000 * 60 * 2, // 2 minutes,
        retry: 2,
    })

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

    //This is the method to fetch users using useState and useEffect but have some limitations like error handling cache data
    // const [users, setUsers] = useState<User[]>([])
    // useEffect(() => {
    //     const fetchUsers = async () => {
    //         const { data } = await axios.get('/api/users');
    //         setUsers(data);
    //     }

    //     fetchUsers();
    // }, [])

    return (
        <Select.Root>
            <Select.Trigger placeholder='Assign Issues' />
            <Select.Content>
                <Select.Group>
                    <Select.Label>Suggestions</Select.Label>
                    {users?.map(user => <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>)}
                </Select.Group>
            </Select.Content>
        </Select.Root>
    )
}

export default AssigneeSelect
