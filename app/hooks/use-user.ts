import { useState, useCallback } from "react"
import { apiGetUsers } from '../api/getUsers'
import { apiUpdateUser } from '../api/editUsers'
import { apiAddUser } from '../api/addUser'
import { apiDeleteUser } from '../api/deleteUser'

interface User {
  id: string
  username: string
  email: string
  first_name: string
  last_name: string
  is_active: boolean
  is_staff: boolean
}

interface UserToken {
    accessToken: string;
}

function getTokens(): string {
    const user = localStorage.getItem('user');
    if (user) {
        const userJSON: UserToken = JSON.parse(user);
        return userJSON.accessToken;
    }
    return '';
}

export function useUser() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])

  const getUsers = useCallback(async () => {
    setLoading(true)
    const token = getTokens();
    const response = await apiGetUsers(token)

    if (response) {
        const mockUsers: User[] = response.map((user: any) => {
            return {
                id: user.id,
                username: user.username,
                email: user.email,
                first_name: user.first_name,
                last_name: user.last_name,
                is_active: user.is_active,
                is_staff: user.is_staff
            }
        });
        setUsers(mockUsers)
        setLoading(false)
    }
  }, [])

  const addUser = useCallback(async (userData: Omit<User, 'id'>) => {
    const token = getTokens();
    await apiAddUser(token, userData)
    console.log("Adding user:", userData)
    const newUser = { ...userData, id: Date.now().toString() }
    setUsers(prevUsers => [...prevUsers, newUser])
  }, [])

  const updateUser = useCallback(async (id: string, userData: Partial<User>) => {
    console.log(id);
    const token = getTokens();
    const updatedUser = await apiUpdateUser(token, id, userData)

    console.log("Updating user:", id, userData)
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === id ? updatedUser : user
      )
    )
  }, [])

  const deleteUser = useCallback(async (id: string) => {
    console.log(id);
    const token = getTokens();
    await apiDeleteUser(token, id)
    console.log("Deleting user:", id)
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id))
  }, [])

  return { loading, users, getUsers, addUser, updateUser, deleteUser }
}