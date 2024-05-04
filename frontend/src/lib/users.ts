export async function getUser(userId: string): Promise<User> {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/users/${userId}/`);
    return res.json() as Promise<User>;
}

export async function unfollowUser(userId: string, profileId: string): Promise<User> {
    const data = {
        profileId: profileId
    }
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/users/${userId}/unfollow`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return res.json() as Promise<User>;
}

export async function followUser(userId: string, profileId: string): Promise<User> {
    const data = {
        profileId: profileId
    }
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/users/${userId}/follow`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return res.json() as Promise<User>;
}