const BASE_URL = 'http://127.0.0.1:8000/api'

export async function apiAddUser(token: string, userData: Partial<User>): Promise<any> {
    console.log(token)
    try {
        const url = `${BASE_URL}/users/`
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(userData)
        }

        const response = await fetch(url, params)
        if (response.status != 200){
            throw new Error('Usuario no creado')
        } 
        const result = await response.json()
        return result
    } catch (error) {
        return null
    }
    
}