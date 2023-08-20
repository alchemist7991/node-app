const db = require('../utils/db');
const UserDTO = require('../dto/user.dto');

(async () => {
  const dummyUser = new UserDTO('DummyUser', 'abcd@gmail.com', 'password', '9876543210')
  try {
    await db('users').insert(dummyUser)
    console.log('Added dummy users!')
    process.exit(0)
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
})();
