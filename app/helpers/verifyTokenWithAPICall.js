import Cookies from 'cookies'
import Apium from '../vendor/Apium'
import { context } from '../logic'

export async function verifyTokenWithAPICall(req, res) {
    const errorHeroku = `<!DOCTYPE html>
	<html>
	  <head>
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta charset="utf-8">
		<title>No such app</title>
		<style media="screen">
		  html,body,iframe {
			margin: 0;
			padding: 0;
		  }
		  html,body {
			height: 100%;
			overflow: hidden;
		  }
		  iframe {
			width: 100%;
			height: 100%;
			border: 0;
		  }
		</style>
	  </head>
	  <body>
		<iframe src="//www.herokucdn.com/error-pages/no-such-app.html"></iframe>
	  </body>
	</html>`

    async function callApi() {
        const api = new Apium(context.API_URL)
        console.log('api call to do')
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
        } else if (status === 404 && payload === errorHeroku) {
            console.log('heroku error catch')
            
            callApi()

        } else if (status === 401 || status === 404) {
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
        }
    }

    const cookies = new Cookies(req, res)

    const token = cookies.get('token')
    console.log(token || 'no hay token')
    if (token) {
        console.log('line 11')

        callApi()
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