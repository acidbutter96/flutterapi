'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')
const Env = use('Env')


class Image extends Model {
    content() {
        this.belongsTo('App/Models/Content')
    }

    static getUrl( path ) {
        return `${Env.get('APP_URL')}/${path}`
    }
}

module.exports = Image
