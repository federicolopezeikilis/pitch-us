import { validateJWT, validateStringNotEmptyNoSpaces, validateRank } from 'validators'
import Apium from '../vendor/Apium'
import { context } from './context'

export async function toggleOrUpdateRankToInterpretation(token, songId, interpretationId, amount) {
    validateJWT(token)
    validateStringNotEmptyNoSpaces(songId)
    validateStringNotEmptyNoSpaces(interpretationId)
    validateRank(amount)

    const api = new Apium(context.API_URL)

    const { status, payload } = await api.post(
        `/rank/songs/${songId}/interpretations/${interpretationId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ amount })
        })

    if (status === 201) return

    else if (status >= 400 && status < 500) {
        const data = JSON.parse(payload)

        throw new Error(data.error)

    } else
        throw new Error('server error')
}