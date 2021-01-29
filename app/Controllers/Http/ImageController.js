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

            await imageUploaded.move(Helpers.publicPath('uploads/contents'), {
                name: name,
                overwrite: true
            })
            const path = `tmp/uploads/contents/${name}`

            if (!imageUploaded.moved()) {
                return response.status(400).json({
                    error: true,
                    message: imageUploaded.error()
                })
            }

            const imgDb = await Image.create({ path: path })
            if (imgDb) {
                return response.json({
                    error: false,
                    message: 'Image uploaded!',
                    imgDb:imgDb
                })
            }

            return response.send(imgDb)
        }
        /* const content = await Content.findOrFail(params.id)

        const image = request.file("image", {
            types: ["image"],
            size: "10mb"
        })

        const name = `${Date.now()}-${params.id}`
        
        await image.move(Helpers.tmpPath("uploads"), {
            name: name
        })

        if (!image.moved()) {
            return images.errors()
        }

        if(image.moved()){
            const upload = content.image().create({ path: image.fileName, })
            return response.json({error: false, upload: upload})
        }

        return response.json({
            error: false
        }) */
    }

    async show({params,response}){
        const path = params.filename
        return response.download(Helpers.publicPath(`uploads/contents/${path}`))
    }
}

module.exports = ImageController
