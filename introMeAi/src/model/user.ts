export default interface User {
    id: string
    firstName: string
    lastName: string
    name: string
    email?: string
    phone?: string
    address?: string
    language?: string
    city: string
    dob: string
    userType: string
    gender: string
    givenName: string
}

export const onlineStatus = {
    online: "online",
    offline: "offline",
}

export const fullName = (user: User): string => {
    return `${user.firstName} ${user.lastName}`.trim()
}