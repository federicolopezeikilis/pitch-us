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

    const data = JSON.parse(payload)

    if (status === 200) return data

    else if (status >= 400 && status < 500) {

        throw new Error(data.error)

    } else
        throw new Error('server error')
}