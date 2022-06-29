import Cookies from 'cookies'
import Apium from '../vendor/Apium'
import { context } from '../logic'

export async function verifyTokenWithAPICall(req, res) {
    const cookies = new Cookies(req, res)

    const token = cookies.get('token')
    console.log(token || 'no hay token')
    if (token) {
        console.log('line 11')
        function callApi() {
            const api = new Apium(context.API_URL)

            const { status, payload } = await api.get('users/auth', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
    
            if (status === 200) {
                console.log('line 21')
                if (req.url.includes('/login') || req.url.includes('/register')) {
                    console.log('line 23')
                    res.writeHead(307, { Location: '/' })
                    res.end()
                } else {
                    console.log('line 27')
    
                    const { userId } = JSON.parse(payload)
    
                    return { token, userId }
                }
            } else if (status === 401) {
                console.log('line 34')
                
                cookies.set('token')
    
                if (req.url.includes('/profile/settings')
                    || req.url.includes('/profile/edit')
                    || req.url.includes('/profile/change-password')
                    || req.url.includes('/profile/delete-account')
                    || req.url.includes('/create-interpretation')) {
    
                    console.log('line 44')
    
                    res.writeHead(307, { Location: '/login' })
                    res.end()
                    return
                }
            } else if (status === 404) {
                callApi()
            }
        }
    }

    if (req.url.includes('/profile/settings')
        || req.url.includes('/profile/edit')
        || req.url.includes('/profile/change-password')
        || req.url.includes('/profile/delete-account')
        || req.url.includes('/create-interpretation')) {

            console.log('line 59')


        res.writeHead(307, { Location: '/login' })
        res.end()

        return
    }
    console.log('line 67')
}