"use strict"

/** @type {import("@adonisjs/lucid/src/Schema")} */
const Schema = use("Schema")

class ContentSchema extends Schema {
  up () {
    this.create("contents", (table) => {
      table.increments()
      table.string("title").notNullable()
      table.string("subtitle").notNullable()
      table.string("type")
      table.integer("likes")
      table
        .string("content")
      table.timestamps()
    })
  }

  down () {
    this.drop("contents")
  }
}

module.exports = ContentSchema
