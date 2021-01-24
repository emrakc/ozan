const router = require('express').Router();
let Jop = require('../../models/jop.model');

router.route('/').get((req, res) => {
    Jop.find()
        .then(jops => res.json(jops))
        .catch(err => res.status(400).json('err:' + err))
})

router.route('/:id').get((req, res) => {
    const { id } = req.params;
    Jop.findById(id)
        .then(jop => res.json(jop))
        .catch(err => res.status(400).json('err:' + err))
})

router.route('/:id').delete((req, res) => {
    const { id } = req.params;
    Jop.findByIdAndDelete(id)
        .then(jop => res.json({ success: true }))
        .catch(err => res.status(400).json('err:' + err))
})

router.route('/update').post((req, res) => { 
    const { id, priority} = req.body;
    Jop.findById(id)
        .then(jop => {
            jop.priority = priority;
            jop.save()
                .then(() => res.json({ success: true }))
                .catch(err => res.status(400).json('err:' + err))
        })
        .catch(err => res.status(400).json('err:' + err))
})

router.route('/add').post((req, res) => {
    console.log(req.body)
    const { jop } = req.body;
    const newJop = new Jop(jop)
    newJop.save()
        .then(() => res.json({ success: true }))
        .catch(err => res.status(400).json('err:' + err))
})

module.exports = router;