'use strict'

const Image = use("App/Models/Image")
const Content = use("App/Models/Content")
const Helpers = use('Helpers')

class ImageController {
    async store({ params, request, response }) {
        const content = await Content.findOrFail(params.id)

        if (content) {
            const imageUploaded = request.file('image', {
                types: ['image'],
                maxSize: '5mb'
            })

            const name = `${new Date().getTime()}_${Math.round((Math.random()) * 100)}.${imageUploaded.subtype}`

            await imageUploaded.move(Helpers.publicPath('uploads/contents/'), {
                name: name,
                overwrite: true
            })
            const path = `${name}`

            if (!imageUploaded.moved()) {
                return response.status(400).json({
                    error: true,
                    message: imageUploaded.error()
                })
            }

            const imgDb = await Image.create({
                path: path,
                content_id: params.id
            })
            if (imgDb) {
                return response.json({
                    error: false,
                    message: 'Image uploaded!',
                    imgDb: imgDb
                })
            }

            return response.send(imgDb)
        }
    }

    async show({ params, response }) {
        const path = params.filename
        console.log(Helpers.publicPath())
        return response.download(Helpers.publicPath(`uploads/contents/${path}`))
    }
}

module.exports = ImageController
