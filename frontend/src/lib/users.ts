export async function getUser(userId: string): Promise<User> {
    const res = await fetch(`/api/users/${userId}/`);
    return res.json() as Promise<User>;
}

export async function unfollowUser(userId: string, profileId: string): Promise<User> {
    const data = {
        profileId: profileId
    }
    const res = await fetch(`/api/users/${userId}/unfollow`,{
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
    const res = await fetch(`/api/users/${userId}/follow`,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    return res.json() as Promise<User>;
}

export async function getUserFollows(accessToken: string): Promise<User[]> {
    const res = await fetch(`/api/users/follows`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    });
    return res.json() as Promise<User[]>;
}
