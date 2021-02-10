exports.seed = function(knex, Promise){
    return knex('type').insert([
        {type: 'Admin'},
        {type: 'Customer'}
    ])
}