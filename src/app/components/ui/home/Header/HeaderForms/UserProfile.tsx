import React from 'react'

interface User {
    id: string;
    email: string;
    firstname: string;
    lastname: string;
    role: string;
    isVerified: boolean;
    verificationToken: string | null;
    createdAt: string;
  }

  interface UserProfileProps {
    user: User | null;
  }

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    return (
        <div>{user ? `${user.firstname}` : 'Guest'}</div>
    )
}

export default UserProfile