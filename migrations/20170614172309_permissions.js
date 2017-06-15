exports.up = function(knex, Promise) {
  return knex.schema.createTable("permissions", function (table) {
  table.increments('id');
  table.integer('project_id').index().references('projects.id').notNullable().onDelete('cascade');
  table.integer('allowed_user').index().references('users.id').notNullable().onDelete('cascade');

});

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("permissions");
};
