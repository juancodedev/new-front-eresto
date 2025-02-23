const BASE_URL = 'http://127.0.0.1:8000/api'

export async function apiGetUsers(token: string): Promise<any> {
    console.log(token)
    if (!token){
        return null // re direccionar a login
    }
    try {
        const url = `${BASE_URL}/users/`
        const params = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
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