'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Content = use('App/Models/Content')

/**
 * Resourceful controller for interacting with contents
 */
class ContentController {
  /**
   * Show a list of all contents.
   * GET contents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({params, response}) {
    if(params.type == null){
      const contents = await Content.all()
      return response.json({
        error: false,
        content: contents
      })
    }

    console.log(params.content)

    const contents = await Content.query()
      .where('type', params.type)
      .fetch()

    return response.json({
      error: false,
      content: contents
    })
  }

  /**
   * Render a form to be used for creating a new content.
   * GET contents/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Create/save a new content.
   * POST contents
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, response, auth }) {
    const data = request.only(["title", "subtitle", "type", "likes", "content"])

    const contents = await Content.create(data)

    return response.json({
      error: false,
      request: contents
    })
    /* else{
      return response.status(401).json({
        error: true
      })
    } */
  }

  /**
   * Display a single content.
   * GET contents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params }) {
    const contents = await Content.findOrFail(params.id)
    await contents.load("images")

    return contents
  }

  /**
   * Render a form to update an existing content.
   * GET contents/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Update content details.
   * PUT or PATCH contents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */

  async update({ params, request, response }) {
    const content = await Content.findOrFail(params.id)

    if (content) {
      const contentMerged = content.merge(request.body)

      if (await content.save()) {
        return response.json({
          error: false
        })
      }

      return response.status(400).json({
        error: true,
        message: 'You must change any field'
      })

    }

    return response.status(400).json({
      error: true,
      message: 'You solicitation was not completed'
    })



  }



  /**
   * Delete a content with id.
   * DELETE contents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, request, response }) {

  }

  async index_img({ request, response, params }) {
    const oneID = params.id || false

    if (oneID) {
      const content = await Content.query()
        .with('images')
        .where('id', params.id)
        .fetch()
      if(content){
        return response.json({
          error: false,
          data: content
        })
      }

      return response.status(400).json({
        error: true,
        message: 'Not founded images related to this content id'
      })
    } else {
      return response.send('falsiane')
    }
  }
}

module.exports = ContentController
