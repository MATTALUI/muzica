
exports.seed = function(knex, Promise) {
  return knex('projects')
  .del()
    .then(function () {
      return knex('projects').insert([{
        project_owner: 1,
        project_title: 'Cowbell Plus'
      },
      {
        project_owner: 1,
        project_title: 'What is a Popsicle?'
      }, {
        project_owner: 2,
        project_title: 'AtomBomb'
      }]);

    }).then(function(){
      return knex.raw("SELECT setval('projects_id_seq', (SELECT MAX(id) FROM users));");
    });
};
