
exports.up = function(knex) {
    return knex.schema.createTable('users', tbl=>{
        tbl.increments('id');
        tbl.string('name',128).notNullable();
        tbl.string('email').notNullable();
        tbl.integer('phone').notNullable();
        tbl.integer('zipcode').notNullable();
        tbl.boolean('alive')

    })
  
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('users')
};
