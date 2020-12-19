const router = require('express').Router()
const { User, Portal } = require('../../models')

/**
* Find all users inside given portal
* @param  {body: portal_id}
* @return {id, name, points, portal_id}
*/
router.get('/', async (req, res) => {
  try {
    const portal = await Portal.findOne({
      include: [
        { model: Portal }
      ],
      attributes: ['id', 'name', 'points'],
      where: { id: req.body.portal_id }
    })

    if(!portal) {
        res.json({ message: 'Could not find that portal!' })
    }

    const userData = await portal.getUsers()

    res.json({ users: userData })

  } catch (err) {

    res.status(400).json(err)

  }
})

/**
* Create a user inside given portal
* @param  {body: name, portal_id}
* @return {id, name, points, portal_id}
*/
router.post('/', async (req, res) => {
  try {
    const portalData = await Portal.findOne({
      where: { id: req.body.portal_id }
    })

    if(!portalData) {
        res.json({ message: 'Could not find that portal!' })
    }

    const userData = await User.create(req.body, {
      include: [
        { model: Portal }
      ],
      attributes: ['id', 'name', 'points'],
    })

    res.json(userData)

  } catch (err) {

    res.status(400).json(err)

  }
})

/**
* Find a user given the id
* @param  {id}
* @return {id, name, points, portal_id}
*/
router.get('/:id', async (req, res) => {
  try {
    const userData = await User.findOne({
      include: [
        { model: Portal }
      ],
      attributes: ['id', 'name', 'points'],
      where: { id: req.params.id }
    })

    if (!userData) {
      res.status(400).json({ message: 'Could not find that user!' })
      return
    }

    res.json(userData)

  } catch (err) {

    res.status(400).json(err)

  }
})

/**
* Find a user given the id
* @param  {id}
* @param  {body: name &|| points}
* @return {id, name, points, portal_id}
*/
router.put('/:id', async (req, res) => {
  try {
    let userData = await User.findOne({
      include: [
        { model: Portal }
      ],
      attributes: ['id', 'name', 'points'],
      where: { id: req.params.id }
    })

    if (!userData) {
      res.status(400).json({ message: 'Could not find that user!' })
      return
    }

    if (req.body.name) {
      userData = await userData.update({
        name: req.body.name
      })
    }

    if (req.body.points) {
      userData = await userData.update({
        points: req.body.points
      })
    }

    res.json(userData)

  } catch (err) {

    res.status(400).json(err)

  }
})

/**
* Delete a user
* @param  {id}
* @return {id, code, round}
*/
router.delete('/:id', async (req, res) => {
  try {
    const userData = await User.destroy({
      where: { id: req.body.id }
    })

    if (!userData) {
      res.status(404).json({ message: 'Could not find that user!' })
      return
    }

    res.status(200).json(userData)

  } catch (err) {

    res.status(500).json(err)

  }
})

module.exports = router
