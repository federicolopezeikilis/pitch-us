import { validateStringNotEmptyNoSpaces, validateStringNotEmptyOrBlank } from 'validators'
import Apium from '../vendor/Apium'
import { context } from './context'

export async function retrieveInterpretationFromSong(songName, artistName, interpretationId) {
    validateStringNotEmptyOrBlank(songName)
    validateStringNotEmptyOrBlank(artistName)
    validateStringNotEmptyNoSpaces(interpretationId)

    const api = new Apium(context.API_URL)

    const { status, payload } = await api.get(
        `songs/${songName}/artists/${artistName}/interpretations/${interpretationId}`)
        
    const data = JSON.parse(payload)

    if (status === 200) return data

    else if (status >= 400 && status < 500) throw new Error(data.error)

    else if (status >= 500) throw new Error('server error')
}