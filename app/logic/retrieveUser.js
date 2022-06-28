import { validateJWT } from 'validators'
import Apium from '../vendor/Apium'
import { context } from './context'

export async function retrieveUser(token) {
    validateJWT(token)

    const api = new Apium(context.API_URL)

    // const hola = await berreApium(
    //         'GET',
    //         'http://localhost:8080/api/users',
    //         {
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })

    const { status, payload } = await api.get(
        'users',
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
    
    const data = JSON.parse(payload)

    if (status === 200) return data

    else if (status >= 400 && status < 500) throw new Error(data.error)

    else if (status >= 500) throw new Error('server error')
}