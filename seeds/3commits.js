
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
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/asherpaulroth/05-more-cowbell-prod-blended',
      is_master: true,
      commit_comment: 'Just some cowbell for yuh!'
    },
    {
      id: 4,
      project_id: 2,
      submitted_by: 2,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/tevin-beckles/no-role-modelz-yl-ft-jcole',
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
    },
    {
      id: 9,
      project_id: 4,
      submitted_by: 4,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/tony-neuhoff/biggie-smalls-feat-thomas-the',
      is_master: true,
      commit_comment: 'Biggie is my hero!'
    },
    {
      id: 10,
      project_id: 6,
      submitted_by: 5,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/alextrainormusic/the-ballad-of-eddy-mcbones-1',
      is_master: true,
      commit_comment: 'Music is cool!'
    },
    {
      id: 11,
      project_id: 6,
      submitted_by: 5,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/alextrainormusic/nasty-reputation',
      is_master: false,
      commit_comment: 'Music is cool!'
    },{
      id: 12,
      project_id: 6,
      submitted_by: 5,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/alextrainormusic/real',
      is_master: false,
      commit_comment: 'Music is cool!'
    },{
      id: 13,
      project_id: 6,
      submitted_by: 5,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/alextrainormusic/life-and-marvelous-times',
      is_master: false,
      commit_comment: 'Music is cool!'
    },{
      id: 14,
      project_id: 6,
      submitted_by: 5,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/alextrainormusic/camirillo-brillo-cover-frank',
      is_master: false,
      commit_comment: 'Music is cool!'
    },{
      id: 15,
      project_id: 6,
      submitted_by: 5,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/alextrainormusic/one-night-only-featuring-todd',
      is_master: false,
      commit_comment: 'Music is cool!'
    },{
      id: 16,
      project_id: 7,
      submitted_by: 6,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/childish-gambino/redbone',
      is_master: false,
      commit_comment: 'Music is cool!'
    },{
      id: 17,
      project_id: 8,
      submitted_by: 7,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/futurevevo22/kodak-black-tunnel-vision',
      is_master: false,
      commit_comment: 'Music is cool!'
    },{
      id: 18,
      project_id: 8,
      submitted_by: 7,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/sandpeoplecologne/cloud-9?in=chillhopdotcom/sets/lofihiphop',
      is_master: false,
      commit_comment: 'Music is cool!'
    },{
      id: 19,
      project_id: 3,
      submitted_by: 2,
      widget_url: 'https://w.soundcloud.com/player/?url=https://soundcloud.com/coolioofficial/gangstas-paradise-feat-l-v',
      is_master: true,
      commit_comment: 'Music is cool!'
    }]);
    }).then(function(){
      return knex.raw("SELECT setval('commits_id_seq', (SELECT MAX(id) FROM commits));");
    });
};
