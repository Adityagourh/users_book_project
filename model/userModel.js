const { Model } = require('objection');
const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

Model.knex(db);

class User extends Model {
  static get tableName() {
    return 'users';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' }
      }
    };
  }

  static get relationMappings() {
    const Book = require('./booksModel'); 
    return {
      books: {
        relation: Model.HasManyRelation,
        modelClass: Book,
        join: {
          from: 'users.id', 
          to: 'books.user_id'
        }
      }
    };
  }
}

module.exports = User;
