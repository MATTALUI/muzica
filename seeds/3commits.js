
exports.seed = function(knex, Promise) {
  return knex('commits')
  .del()
    .then(function () {
      return knex('commits').insert([{
        id: 1,
        project_id: 1,
        submitted_by: 1,
        widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/zoeybloons/jump-to-lightspeed',
        is_master: false,
        commit_comment: 'Listen to this clip of what it sounds like to go to warp speed!'
      },
    {
      id: 2,
      project_id: 1,
      submitted_by: 1,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/jahseh-onfroy/garettes-revenge-produced',
      is_master: false,
      commit_comment: 'This song is even cooler.'
    },
    {
      id: 3,
      project_id: 1,
      submitted_by: 2,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/tee-grizzley/from-the-d-to-the-a-feat-lil-yachty',
      is_master: true,
      commit_comment: 'The OG-official master track of this project!'
    },
    {
      id: 4,
      project_id: 2,
      submitted_by: 2,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/tee-grizzley/from-the-d-to-the-a-feat-lil-yachty',
      is_master: true,
      commit_comment: 'lil yachty is my homie!1!!1'
    },
    {
      id: 5,
      project_id: 5,
      submitted_by: 1,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/mattalui/space-cats',
      is_master: true,
      commit_comment: 'This is the master. I want the project to capture this essence.'
    },
    // https://soundcloud.com/mattalui/catswithcowbell
    {
      id: 6,
      project_id: 5,
      submitted_by: 2,
      widget_url: 'https://w.soundcloud.com/player/?url=//soundcloud.com/mattalui/catswithcowbell',
      is_master: false,
      commit_comment: 'I was digging your vibes, so I added some cowbell!'
    },
    {
      id: 7,
      project_id: 5,
      submitted_by: 1,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/mattalui/space-cats',
      is_master: false,
      commit_comment: 'The cowbell sounded horrible, so I took I back out.'
    },
    {
      id: 8,
      project_id: 5,
      submitted_by: 4,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/cashmerecat/forevercashmere',
      is_master: false,
      commit_comment: 'Maybe we could sample from this?'
    }]);
    }).then(function(){
      return knex.raw("SELECT setval('commits_id_seq', (SELECT MAX(id) FROM commits));");
    });
};
