
exports.up = function(knex) {
    return knex.schema
        .createTable('type', tbl=>{
            tbl.increments();
            tbl.text('type',128).unique().notNullable();
        })
    
        .createTable('users', tbl=>{
        tbl.increments('id');
        tbl.string('name',128).notNullable();
        tbl.string('email').notNullable();
        tbl.integer('phone').notNullable();
        tbl.integer('zipcode').notNullable();
        tbl.boolean('alive');
        tbl.integer('otp');
        tbl.integer('type_id')
            .unsigned()
            .notNullable()
            .references('id')
            .inTable('type')
            .onDelete('CASCADE')
            .onUpdate('CASCADE');

    })
  
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('type')
    .dropTableIfExists('users')
};
