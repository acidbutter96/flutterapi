'use strict'

const Image = use("App/Models/Image")
const Content = use("App/Models/Content")
const Helpers = use('Helpers')
const fs = require('fs')

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
        return response.download(Helpers.publicPath(`uploads/contents/${path}`))
    }

    async destroy({ params, response }) {
        const path = params.filename
        const imgId = await Image.query()
            .where('path', path)
            .delete()

        console.log(imgId == 1)
        if (imgId == 1) {
            fs.unlink(Helpers.publicPath(`uploads/contents/${path}`), (err) => {
                if (err) {
                    return response.status(400).send(err)
                }
            })
            return response.json({
                error: false,
                message: 'Image was deleted'
            })
        }

        return response.status(400).json({
            error: true,
            message: 'Image can not be deleted at the moment, try again in few minutes'
        })
    }

    async searchNdestroy({ params, response }) {
        const contentId = params.id
        const relatedImg = await Image.query()
            .where('content_id', contentId)
            .fetch()

        var responsed = []
        var notResponsed = []

        relatedImg.toJSON().map(async (item) => {
            fs.unlink(Helpers.publicPath(`uploads/contents/${item.path}`), (err) => {
                return response.status(400).json({
                    error: true,
                    message: `Error deleting the ${item.path} file, try again in few minutes`
                })
            })

            const deletedImg = await Image.query()
                .where('path', item.path)
                .delete()

            if (deletedImg == 1) {
                responsed.push(item.path)
            } else {
                notResponsed.push(item.path)
            }
        })

        if (notResponsed.length != 0) {
            return response.json({
                error: true,
                message: 'Not all files are removed',
                errFiles: notResponsed
            })
        }
        return response.json({
            error: false,
            message: 'All files are successfully removed'
        })
    }

    async update({ request, params, response }) {
        const imageID = params.id
        const findImg = await Image.query()
            .where('id', params.id)
            .fetch()

        const originalPath = findImg.toJSON()[0].path

        if (typeof originalPath == 'string') {
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

            const imgDb = await Image.query()
                .where('id', params.id)
                .update({ path: path })

            if (imgDb == 1) {
                fs.unlink(Helpers.publicPath(`uploads/contents/${originalPath}`), async (err) => {
                    if (err) {
                        const rePut = await Image.query()
                            .where('id', params.id)
                            .update({ path: originalPath })
                        return response.status(400).send(err)
                    }
                })

                return response.json({
                    error: false,
                    message: 'Image updated!',
                    imgDb: imgDb
                })
            }

            if (imgDb) {

            }

            return response.send(imgDb)
        }
    }
}

module.exports = ImageController
