
exports.seed = function(knex, Promise) {
  return knex('users')
  .del()
    .then(function () {
      return knex('users').insert([{
        id: 1,
        first_name: 'Matt',
        last_name: 'Hummer',
        email: 'cats@cats.com',
        hashed_password: '$2a$08$Kb7JzChJiBv9de6t9NB6V.QKi.w87WD/3gv3PxEH4iAKrNNhbLbjW',
        sc_username: 'mattalui'
      },
    {
      id: 2,
      first_name: 'Adam',
      last_name: 'Smith',
      email: 'asmith13194@gmail.com',
      hashed_password: '$2a$08$Kb7JzChJiBv9de6t9NB6V.QKi.w87WD/3gv3PxEH4iAKrNNhbLbjW',
      sc_username: 'smitty14'
    }]);

  })
  .then(function(){
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
    });
};
