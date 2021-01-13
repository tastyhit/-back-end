
exports.seed = function(knex) {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Victor', phone: 323783212, email:'victor@gmail.com', zipcode:90280, alive:true},
        {id: 2,  name: 'Candy', phone: 3236371112, email:'top@gmail.com', zipcode:90001, alive:true},
   
      ]);
};
