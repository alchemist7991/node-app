const db = require('../../utils/db');
const UserDTO = require('../../dto/user.dto');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await db.select().from('users')
        return res.json(users)
    } catch (e) {
        console.log(`Unable to fetch user details, with error ${e}`);
        return res.status(404).send(`Unable to fetch data`);
    }
};

exports.getUserById = async (req, res) => {
    const id = req.params.id;
    try {
        const userById = await db.select().from('users').where('id', id);
        return res.json(userById);
    } catch (e) {
        console.log(`Unable to fetch user details with id: ${id},  with error ${e}`);
        return res.status(404).send(`No matching Id: ${id}`);
    }
};

exports.createUser = async (req, res) => {
    const { name, email, password, phone } = req.body;
    try {
        const newUser = new UserDTO(name, email, password, phone);
        await db('users').insert({ name, email, password, phone });
        return res.sendStatus(200);
    } catch (e) {
        console.log('Exception while creating new user', e);
        return res.status(500).send('Failed to create user');
    }
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
