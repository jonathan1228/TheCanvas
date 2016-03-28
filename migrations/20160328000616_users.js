exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', function(table){
  	table.increments();
  	table.string('userid');
  	table.string('username')
  	table.string('fullname');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
