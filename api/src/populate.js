const { connect, disconnect } = require('mongoose')
const { User, Artist, Song, Interpretation, Rank } = require('./models')
const { laRazonContent1, laRazonContent2, demasiadoContent1, sinSenalContent1, ojosAsiContent1, aTuLadoContent1 } = require('./populateSources')

;(async () => {
        try {
            await connect('mongodb://localhost:27017/pitch-us')

            await Promise.all([
                User.deleteMany(),
                Artist.deleteMany(),
                Song.deleteMany(),
                Interpretation.deleteMany()
            ])

            /* CREATE USERS */

            const userPepito = await User.create({ email: 'pepitogrillo@pitch-us.com', username: 'pepigri', password: 'Passw0rd' })
            const userWendy = await User.create({ email: 'wendybread@pitch-us.com', username: 'wendy', password: 'Passw0rd' })
            const userJohn = await User.create({ email: 'johndoed@pitch-us.com', username: 'john', password: 'Passw0rd' })

            /* CREATE ARTISTS */

            const artistLaRenga = await Artist.create({ name: 'La Renga', genres: [Artist.ROCK], country: 'AR' })
            const artistBandalosChinos = await Artist.create({ name: 'Bandalos Chinos', genres: [Artist.ROCK], country: 'AR' })
            const artistShakira = await Artist.create({ name: 'Shakira', genres: [Artist.POP], country: 'CO' })
            const artistNathyPeluso = await Artist.create({ name: 'Nathy Peluso', genres: [Artist.POP, Artist.TRAP], country: 'AR' })
            const artistPtazeta = await Artist.create({ name: 'Ptazeta', genres: [Artist.TRAP, Artist.HIP_HOP], country: 'ES' })

            /* CREATE RANKS */

            const rank4FromPepito = new Rank({
                user: userPepito._id.toString(), amount: 4
            })

            const rank4fromWendy = new Rank({
                user: userWendy._id.toString(), amount: 4
            })

            const rank3FromWendy = new Rank({
                user: userWendy._id.toString(), amout: 3
            })

            const rank1FromJohn = new Rank({
                user: userJohn._id.toString(), amount: 1
            })

            /* CREATE INTERPRETATIONS */

            const interpretationLaRazon1 = new Interpretation({
                user: userPepito._id.toString(), content: laRazonContent1, ranks: [rank1FromJohn, rank4fromWendy]
            })

            const interpretationLaRazon2 = new Interpretation({
                user: userWendy._id.toString(), content: laRazonContent2, ranks: [rank4FromPepito]
            })

            const interpretationATuLado1 = new Interpretation({
                user: userJohn._id.toString(), content: aTuLadoContent1, ranks: [rank4FromPepito]
            })

            const interpretationDemasiado1 = new Interpretation({
                user: userPepito._id.toString(), content: demasiadoContent1
            })

            const interpretationSinSenal1 = new Interpretation({
                user: userPepito._id.toString(), content: sinSenalContent1
            })

            const interpretationOjosAsi1 = new Interpretation({
                user: userJohn._id.toString(), content: ojosAsiContent1
            })

            /* CREATE SONGS */

            const songLaRazon = await Song.create({ artist: artistLaRenga._id.toString(), name: 'La razón que te demora', genres: [Song.ROCK], interpretations: [interpretationLaRazon1, interpretationLaRazon2] })
            const songATuLado = await Song.create({ artist: artistLaRenga._id.toString(), name: 'A tu lado', genres: [Song.ROCK], interpretations: [interpretationATuLado1] })
            const songLaBalada = await Song.create({ artist: artistLaRenga._id.toString(), name: 'La balada del diablo y la muerte', genres: [Song.ROCK] })

            const songDemasiado = await Song.create({ artist: artistBandalosChinos._id.toString(), name: 'Demasiado', genres: [Song.INDIE], interpretations: [interpretationDemasiado1] })
            const songLosPuntos = await Song.create({ artist: artistBandalosChinos._id.toString(), name: 'Los Puntos', genres: [Song.INDIE] })
            const songVamonosDeViaje = await Song.create({ artist: artistBandalosChinos._id.toString(), name: 'Vamonos de viaje', genres: [Song.INDIE] })
            const songSinSenal = await Song.create({ artist: artistBandalosChinos._id.toString(), name: 'Sin Señal', genres: [Song.INDIE], interpretations: [interpretationSinSenal1] })


            const songOjosAsi = await Song.create({ artist: artistShakira._id.toString(), name: 'Ojos asi', genres: [Song.POP], interpretations: [interpretationOjosAsi1] })
            const songCreo = await Song.create({ artist: artistShakira._id.toString(), name: 'Creo', genres: [Song.POP] })
            const songCiegaSordomuda = await Song.create({ artist: artistShakira._id.toString(), name: 'Ciega sordomuda', genres: [Song.POP] })

            const songCorashe = await Song.create({ artist: artistNathyPeluso._id.toString(), name: 'Corashe', genres: [Song.TRAP] })
            const songBuenosAires = await Song.create({ artist: artistNathyPeluso._id.toString(), name: 'Buenos Aires', genres: [Song.POP] })
            const songBusinessWoman = await Song.create({ artist: artistNathyPeluso._id.toString(), name: 'Business Woman', genres: [Song.POP] })

            const songCriminal = await Song.create({ artist: artistPtazeta._id.toString(), name: 'Criminal', genres: [Song.TRAP] })



            await disconnect()
        } catch (error) {
            console.error(error)
        }
    })()