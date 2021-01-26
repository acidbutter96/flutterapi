'use strict'

const Image = use("App/Models/Image")
const Content = use("App/Models/Content")
const Helpers = use('Helpers')

class ImageController {
    async store({ params, request, response }) {
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
}

module.exports = ImageController
