
exports.seed = function(knex, Promise) {
  return knex('users')
  .del()
    .then(function () {
      return knex('users').insert([{
        id: 1,
        first_name: 'Matt',
        last_name: 'Hummer',
        email: 'cats@cats.com',
        hashed_password: '$2a$08$TQJ7CdZsvefbM/.E/TM4ce779YFog/4YwJLrKP3zz2Hr1OVx8Q0aW',
        sc_username: 'mattalui'
      },
    {
      id: 2,
      first_name: 'Adam',
      last_name: 'Smith',
      email: 'adam@adam.com',
      hashed_password: '$2a$08$TQJ7CdZsvefbM/.E/TM4ce779YFog/4YwJLrKP3zz2Hr1OVx8Q0aW',
      sc_username: 'smitty14'
    },
    {
      id: 3,
      first_name: 'Creative',
      last_name: 'Cad',
      email: 'cad@cad.com',
      hashed_password: '$2a$08$TQJ7CdZsvefbM/.E/TM4ce779YFog/4YwJLrKP3zz2Hr1OVx8Q0aW',
      sc_username: 'helloworldhello'
    },
    {
      id: 4,
      first_name: 'Filler',
      last_name: 'Frank',
      email: 'frank@frank.com',
      hashed_password: '$2a$08$TQJ7CdZsvefbM/.E/TM4ce779YFog/4YwJLrKP3zz2Hr1OVx8Q0aW',
      sc_username: 'fillerfrank'
    }]);

  })
  .then(function(){
      return knex.raw("SELECT setval('users_id_seq', (SELECT MAX(id) FROM users));");
    });
};
