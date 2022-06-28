import Cookies from 'cookies'
import Apium from '../vendor/Apium'
import { context } from '../logic'

export async function verifyTokenWithAPICall(req, res) {
    const cookies = new Cookies(req, res)

    const token = cookies.get('token')

    if (token) {
        const api = new Apium(context.API_URL)

        const { status, payload } = await api.get('users/auth', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })

        if (status === 200) {
            if (req.url.includes('/login') || req.url.includes('/register')) {

                res.writeHead(307, { Location: '/' })
                res.end()
            } else {
                const { userId } = JSON.parse(payload)

                return { token, userId }
            }
        } else {
            cookies.set('token')

            if (req.url.includes('/profile/settings')
                || req.url.includes('/profile/edit')
                || req.url.includes('/profile/change-password')
                || req.url.includes('/profile/delete-account')
                || req.url.includes('/create-interpretation')) {

                res.writeHead(307, { Location: '/login' })
                res.end()
                return
            }
        }
    }

    if (req.url.includes('/profile/settings')
        || req.url.includes('/profile/edit')
        || req.url.includes('/profile/change-password')
        || req.url.includes('/profile/delete-account')
        || req.url.includes('/create-interpretation')) {

        res.writeHead(307, { Location: '/login' })
        res.end()

        return
    }
}