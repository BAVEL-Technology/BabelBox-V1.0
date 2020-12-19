const router = require('express').Router()
const { Portal, User, Round } = require('../../models')

/**
* Create a new portal
* @param  {body: code}
* @return {id, code, round}
*/
router.post('/', async (req, res) => {
  try {
    const portalData = await Portal.create(req.body, {
      include: [
        { model: Round },
        { model: User }
      ],
      attributes: ['id', 'code', 'round'],
    })

    res.json(portalData)

  } catch (err) {

    res.status(400).json(err)

  }
})

/**
* Find a portal
* @param  {id}
* @return {id, code, round}
*/
router.get('/:id', async (req, res) => {
  try {
    const portalData = await Portal.findOne({
      include: [
        { model: Round },
        { model: User }
      ],
      attributes: ['id', 'code', 'round'],
      where: { id: req.params.id }
    })

    if (!portalData) {
      res.status(400).json({ message: 'Could not find that portal!' })
      return
    }

    res.json(portalData)

  } catch (err) {

    res.status(400).json(err)

  }
})

/**
* Update a portal
* @param  {id}
* @param  {body: round}
* @return {id, code, round}
*/
router.put('/:id', async (req, res) => {
  try {
    let portalData = await Portal.findOne({
      include: [
        { model: Round },
        { model: User }
      ],
      attributes: ['id', 'code', 'round'],
      where: { id: req.params.id }
    })

    if (!portalData) {
      res.status(400).json({ message: 'Could not find that portal!' })
      return
    }

    portalData = await portalData.update({
      round: req.body.round
    })

    res.json(portalData)

  } catch (err) {

    res.status(400).json(err)

  }
})

/**
* Delete a portal
* @param  {id}
* @return {id, code, round}
*/
router.delete('/:id', async (req, res) => {
  try {
    const portalData = await Portal.destroy({
      where: { id: req.body.id }
    })

    if (!portalData) {
      res.status(404).json({ message: 'Could not find that portal!' })
      return
    }

    res.status(200).json(portalData)

  } catch (err) {

    res.status(500).json(err)

  }
})

module.exports = router
