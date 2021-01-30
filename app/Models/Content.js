'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Content extends Model {

    images (){
        return this.hasMany("App/Models/Image")
    }

}

module.exports = Content
