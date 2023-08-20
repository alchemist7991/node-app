const db = require('../utils/db');

(async () => {
  try {
    await db.schema.dropTableIfExists('users')
    await db.schema.withSchema('public').createTable('users', (table) => {
      table.increments().primary()
      table.string('name').notNullable()
      table.string('email').unique()
      table.string('password').notNullable()
      table.string('phone')
      table.timestamps(true, true)
    })
    console.log('Created users table!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})();
