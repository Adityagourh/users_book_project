
exports.seed = function(knex) {
  return knex('users').del()
    .then(function () {
      return knex('users').insert([
        {name: 'Aditya',email: '123',password:"123"},
        {name: 'aditya',email: '123',password:"123"},
        {name: 'aditya1',email: '123',password:"123"}
      ]);
    });
};
