const BASE_URL = 'http://127.0.0.1:8000/api'

interface User {
    id: string
    username: string
    email: string
    first_name: string
    last_name: string
    is_active: boolean
    is_staff: boolean
    }

export async function apiUpdateUser(token: string, id: string, userData: Partial<User>): Promise<User> {
    console.log(userData)
    try {
        const url = `${BASE_URL}/users/${id}/`
        const params = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        }
        console.log(params)
        const response = await fetch(url, params)
        console.log(response)
        if (response.status != 200){
            throw new Error('Error al actualizar el usuario')
        } 
        const result = await response.json()
        console.log('lalala')
        console.log(result)
        return result
    } catch (error) {
        console.error('Error:', error)
        throw error
    }
    
}