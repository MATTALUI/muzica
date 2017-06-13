exports.up = function(knex, Promise) {
  return knex.schema.createTable("commits", function (table) {
  table.increments('id');
  table.integer('project_id').index().references('projects.id').notNullable();
  table.integer('submitted_by').index().references('users.id').notNullable();
  table.string('widget_url').notNullable().default('https://w.soundcloud.com/player/?url=https://soundcloud.com/zoeybloons/jump-to-lightspeed');
});

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("commits");
};
