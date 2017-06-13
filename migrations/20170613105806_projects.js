exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", function (table) {
  table.increments('id');
  table.integer('project_owner').index().references('users.id').notNullable();
  table.string('project_title').notNullable().defaultTo('');
});

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("projects");
};
