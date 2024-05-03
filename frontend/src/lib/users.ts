export async function getUser(userId: string): Promise<User> {
    const res = await fetch(`${import.meta.env.VITE_BACKEND_ORIGIN}/users/${userId}/`);
    return res.json() as Promise<User>;
}