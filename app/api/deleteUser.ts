const BASE_URL = 'http://127.0.0.1:8000/api'

export async function apiDeleteUser(token: string, id: string, ): Promise<any> {
    try {
        const url = `${BASE_URL}/users/${id}/`
        const params = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        }

        const response = await fetch(url, params)
        if (response.status != 200){
            throw new Error('Usuario o contraseña incorrectos')
        } 
        const result = await response.json()
        return result
    } catch (error) {
        return null
    }
    
}