import { validateStringNotEmptyOrBlank } from 'validators'
import Apium from '../vendor/Apium'
import { context } from './context'

export async function retrieveInterpretationsFromSong(songName, artistName) {
    validateStringNotEmptyOrBlank(songName)
    validateStringNotEmptyOrBlank(artistName)

    const api = new Apium(context.API_URL)

    const { status, payload } = await api.get(
        `songs/${songName}/${artistName}/interpretations`)

    const data = JSON.parse(payload)

    if (status === 200) return data

    else if (status >= 400 && status < 500) throw new Error(data.error)

    else if (status >= 500) throw new Error('server error')
}