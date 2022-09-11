const Router = require("express").Router;
const User = require("../models/user");
const {ensureLoggedIn, ensureCorrectUser} = require("../middleware/auth");

const router = new Router();


/** get list of users.
 *
 * => {users: [{username, first_name, last_name, phone}, ...]}
 *
 **/

router.get("/", ensureLoggedIn, async (req, res, next) => {
    try {
        const results = await User.all();
        return res.json({results});
    } catch(e) {
        return next(e);
    }
})

/** get detail of users.
 *
 * => {user: {username, first_name, last_name, phone, join_at, last_login_at}}
 *
 **/

router.get("/:username", ensureCorrectUser, async(req, res, next) => {
    try {
        let username = req.params.username;
        const results = await User.get(username);
        return res.json({results})
    } catch(e) {
        return next(e);
    }
})


/** get messages to user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 from_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

router.get("/:username/to", ensureCorrectUser, async (req, res, next) => {
    try {
        let username = req.params.username;
        const results = await User.messagesTo(username);
        return res.json({results})
    } catch(e) {
        return next(e);
    }
})



/** get messages from user
 *
 * => {messages: [{id,
 *                 body,
 *                 sent_at,
 *                 read_at,
 *                 to_user: {username, first_name, last_name, phone}}, ...]}
 *
 **/

 router.get("/:username/from", ensureCorrectUser, async (req, res, next) => {
    try {
        let username = req.params.username;
        const results = await User.messagesFrom(username);
        return res.json({results})
    } catch(e) {
        return next(e);
    }
})



module.exports = router;