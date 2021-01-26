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
  async index () {
    const contents = await Content.all()

    return contents
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
  async store ({ request, response }) {
    const data = request.only(["title","subtitle","type","likes","content"])

    const contents = await Content.create(data)

    return response.json({
      error: false,
      request: contents
    })
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
  async show ({ params }) {
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
  async update ({ params, request, response }) {
  }

  /**
   * Delete a content with id.
   * DELETE contents/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy ({ params, request, response }) {
  }
}

module.exports = ContentController
