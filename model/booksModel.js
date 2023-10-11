const { Model } = require('objection');
const knex = require('knex');
const dbConfig = require('../knexfile');
const db = knex(dbConfig.development);

Model.knex(db);

class Book extends Model {
  static get tableName() {
    return 'books';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        title: { type: 'string' },
        auther: { type: 'string' },
        user_id: { type: 'integer' }
      }
    };
  }

  static get relationMappings() {
    const User = require('./userModel');
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'books.user_id',
          to: 'users.id' 
        }
      }
    };
  }
}

module.exports = Book;
