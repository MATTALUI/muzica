
exports.seed = function(knex, Promise) {
  return knex('commits')
  .del()
    .then(function () {
      return knex('commits').insert([{
        id: 1,
        project_id: 1,
        submitted_by: 1,
        widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/zoeybloons/jump-to-lightspeed'
      },
    {
      id: 2,
      project_id: 1,
      submitted_by: 1,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/jahseh-onfroy/garettes-revenge-produced'
    }]);
    })
    .then(function(){
      return knex.raw("SELECT setval('commits_id_seq', (SELECT MAX(id) FROM users));");
    });
};
