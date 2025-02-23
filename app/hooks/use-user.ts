import { useState, useCallback } from "react"
import { apiGetUsers } from '../api/getUsers'

interface User {
  id: string
  username: string
  email: string
  first_name: string
  last_name: string
  is_active: boolean
  is_staff: boolean
}

interface User {
    accessToken: string;
}

function getTokens(): string {
    const user = localStorage.getItem('user');
    if (user) {
        const userJSON: User = JSON.parse(user);
        return userJSON.accessToken;
    }
    return '';
}

export function useUser() {
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState<User[]>([])
  const mockUsers: User[] = []

  const getUsers = useCallback(async () => {
    setLoading(true)
    // Here you would typically fetch users from an API
    // For now, we'll use mock data
    const token = getTokens();
    const response = await apiGetUsers(token)

    console.log(response);

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
    // const mockUsers: User[] = [
    //   { id: "1", username: "john_doe", email: "john@example.com", first_name: "John", last_name: "Doe", is_active: true, is_staff: false },
    //   { id: "2", username: "jane_smith", email: "jane@example.com", first_name: "Jane", last_name: "Smith", is_active: true, is_staff: true },
    // ]

  }, [])

  const addUser = useCallback(async (userData: Omit<User, 'id'>) => {
    // Here you would typically call an API to add the user
    console.log("Adding user:", userData)
    const newUser = { ...userData, id: Date.now().toString() }
    setUsers(prevUsers => [...prevUsers, newUser])
  }, [])

  const updateUser = useCallback(async (id: string, userData: Partial<User>) => {
    // Here you would typically call an API to update the user
    console.log("Updating user:", id, userData)
    setUsers(prevUsers => 
      prevUsers.map(user => 
        user.id === id ? { ...user, ...userData } : user
      )
    )
  }, [])

  const deleteUser = useCallback(async (id: string) => {
    // Here you would typically call an API to delete the user
    console.log("Deleting user:", id)
    setUsers(prevUsers => prevUsers.filter(user => user.id !== id))
  }, [])

  return { loading, users, getUsers, addUser, updateUser, deleteUser }
}