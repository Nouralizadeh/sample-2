import { UserType } from './UserContext'
import { Box, Title, Text } from '@mantine/core'

function User({ user }: { user?: UserType }) {
    return (
        <div>
            {user &&
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: '16px',
                        padding: '16px',
                    }}
                >
                    <img
                        alt="avatar"
                        height={200}
                        src={user.avatar ?? "./profile.jpg"}
                        style={{ borderRadius: '50%' }}
                    />
                    <Box sx={{ textAlign: 'center' }}>
                        <Title>{user.name}</Title>
                        <Text>&quot;{user.email?? "email@aaaa.com"}&quot;</Text>
                        <Text>{user.year};</Text>
                    </Box>
                </Box>}
        </div>
    )
}

export default User