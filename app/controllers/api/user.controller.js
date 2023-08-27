const db = require('../../utils/db');
const UserDTO = require('../../dto/user.dto');
const client = require('../../utils/redisClient');
const redisConstants = require('../../constants/redis');

exports.getAllUsers = async (req, res) => {
    let users;
    try {
        users = await db.select().from('users')
        await client.setex(redisConstants.keys.ALL_USERS, 1000, JSON.stringify(users));
    } catch (e) {
        console.log(`Unable to fetch user details, with error ${e}`);
        return res.status(404).send(`Unable to fetch data`);
    }
    return res.json(users);
};

exports.getUserById = async (req, res) => {
    const id = req.params.id;
    let userById;
    try {
        userById = await db.select().from('users').where('id', id);

        // hset with expiry of 1 min
        await client.hset(redisConstants.keys.USER_SET, id, JSON.stringify(userById));
        await client.expire(redisConstants.keys.USER_SET, 60);
    } catch (e) {
        console.log(`Unable to fetch user details with id: ${id},  with error ${e}`);
        return res.status(404).send(`No matching Id: ${id}`);
    }
    return res.json(userById);
};

exports.createUser = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const newUser = new UserDTO(name, email, password, phone);
        await db('users').insert(newUser);
        
        // invalidate ALL_USERS cache
        await client.del(redisConstants.keys.ALL_USERS);
    } catch (e) {
        console.log('Exception while creating new user', e);
        return res.status(500).send('Failed to create user');
    }
    return res.sendStatus(200);
};

exports.updateById = async (req, res) => {
    const id = req.params.id;
    const payload = req.body;
    try {
        await db('users').where('id', id).update(payload)
        res.status(200).send('Updated');
    } catch (e) {
        console.log(`Exception while updating user with error:${e}`);
        res.sendStatus(500);
    }
};

exports.updateMultiple = async (req, res) => {
    const payload = req.body;
    let updatedCount = 1;
    Object.keys(payload).forEach(async (id) => {
        await db('users').where('id', id).update(payload[id]);
        updatedCount += 1;
    })
    res.status(200).json({updatedCount});
};

exports.deleteUserById = async (req, res) => {
    const id = req.params.id;
    try {
        await db('users').where('id', id).del();
        res.status(200).send('User removed');
    } catch (e) {
        console.log(`Unable to remove user, with error ${e}`);
        res.sendStatus(500)
    }
};
