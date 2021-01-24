const router = require('express').Router();
let priorityEnum = require('../../models/priority.enum')

router.route('/').get((req, res) => { 
    res.json(Object.entries(priorityEnum).map(item => { return { key: item[0], value: item[1] } }))
})

module.exports = router;