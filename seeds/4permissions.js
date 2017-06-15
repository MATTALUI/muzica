
exports.seed = function(knex, Promise) {
  return knex('permissions')
  .del()
    .then(function () {
      return knex('permissions').insert([
        {
          project_id: 4,
          allowed_user: 1,
        },
        {
          project_id: 4,
          allowed_user: 2,
        },
        {
          project_id: 4,
          allowed_user: 4,
        },
        {
          project_id: 3,
          allowed_user: 1,
        }
      ]);

  })
  .then(function(){
      return knex.raw("SELECT setval('permissions_id_seq', (SELECT MAX(id) FROM permissions));");
    });
};
