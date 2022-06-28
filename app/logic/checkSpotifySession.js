import { validateJWT } from 'validators'
import Apium from '../vendor/Apium'
import { context } from './context'

export async function checkSpotifySession(token, code) {
    validateJWT(token)
    //TODO VALIDATE CODE

    const api = new Apium(context.API_URL)

    let url = 'spotify/auth'

    if (code)
        url += `?code=${code}`

    const { status, payload } = await api.post(
        url,
        {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })

    const data = JSON.parse(payload)

    if (status === 200) return data.isSessionActive

    else if (status >= 400 && status < 500) throw new Error(data.error)

    else if (status >= 500) throw new Error('server error')
}