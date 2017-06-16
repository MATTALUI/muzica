
exports.seed = function(knex, Promise) {
  return knex('projects')
  .del()
    .then(function () {
      return knex('projects').insert([{
        project_owner: 1,
        project_title: 'Cowbell Plus',
        project_description: 'A project exploring just HOW MUCH cowbell you can actually put into a single song.'
      },
      {
        project_owner: 1,
        project_title: 'What is a Popsicle?',
        project_description: 'A song to listen to while you contemplate some of life\'s deeper questions...'
      }, {
        project_owner: 2,
        project_title: 'AtomBomb',
        project_description: 'The name says it all...'
      },
      {
        project_owner: 3,
        project_title: 'A True collaboration',
        project_description: 'A project to test the potential of Muzica\'s collaboration powers!'
      },
      {
        project_owner: 1,
        project_title: 'Space Cats',
        project_description: 'Project for g49.'
      },
      {
        project_owner: 5,
        project_title: 'Alex Trainor Experience',
        project_description: 'Shred City'
      },{
        project_owner: 6,
        project_title: 'Redbone',
        project_description: 'Fire!'
      },{
        project_owner: 7,
        project_title: 'World Star Hip Hop',
        project_description: 'Fire!'
      }]);

    }).then(function(){
      return knex.raw("SELECT setval('projects_id_seq', (SELECT MAX(id) FROM projects));");
    });
};
