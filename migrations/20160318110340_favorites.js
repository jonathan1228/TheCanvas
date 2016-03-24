
exports.up = function(knex, Promise) {
  return knex.schema.createTable('favorites', function(table){
  	table.increments();
  	table.string('media');
  	table.string('favoriteid');
  	table.string('userid')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('favorites');
};