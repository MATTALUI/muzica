exports.up = function(knex, Promise) {
  return knex.schema.createTable("projects", function (table) {
  table.increments('id');
  table.integer('project_owner').index().references('users.id').notNullable().onDelete('cascade');
  table.string('project_title').notNullable().defaultTo('');
  table.text('project_description').notNullable().defaultTo('A muzica project');

});

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("projects");
};
