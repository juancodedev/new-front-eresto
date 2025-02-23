const BASE_URL = 'http://127.0.0.1:8000/api'

export async function loginApi(username, password) {
    try {
        const url = `${BASE_URL}/auth/login/`
        const params = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': username,
                'password': password
            })
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