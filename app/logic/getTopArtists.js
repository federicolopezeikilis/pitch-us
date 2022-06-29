import { validateJWT } from 'validators'
import { context } from '.'
import Apium from '../vendor/Apium'

export async function getTopArtists(token) {
    validateJWT(token)

    const api = new Apium(context.API_URL)

    const { status, payload } = await api.post(
        'artists/top',
        {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })


    if (status === 200) {
        const data = JSON.parse(payload)

        return data
    } else if (status >= 400 && status < 500) {
        const data = JSON.parse(payload)

        throw new Error(data.error)
    } else
        throw new Error('server error')
}