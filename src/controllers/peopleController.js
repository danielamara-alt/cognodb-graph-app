const {
  createPerson,
  findPerson,
  createRelationship,
  findConnections
} = require('../db/queries');

async function createPersonController(req, res) {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        error: 'Name is required'
      });
    }

    const person = await createPerson(name);

    res.status(201).json({
      message: 'Person created successfully',
      person
    });
  } catch (error) {
    console.error('Error creating person:', error.message);

    res.status(500).json({
      error: 'Failed to create person'
    });
  }
}

async function findPersonController(req, res) {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        error: 'Name is required'
      });
    }

    const people = await findPerson(name);

    res.json({
      people
    });
  } catch (error) {
    console.error('Error finding person:', error.message);

    res.status(500).json({
      error: 'Failed to find person'
    });
  }
}
async function createRelationshipController(req, res) {
  try {
    const { person1Name, person2Name } = req.body;

    if (!person1Name || !person2Name) {
      return res.status(400).json({
        error: 'Both person names are required'
      });
    }

    const relationship = await createRelationship(
      person1Name,
      person2Name
    );

    res.status(201).json({
      message: 'Relationship created successfully',
      relationship
    });
  } catch (error) {
    console.error('Error creating relationship:', error.message);

    res.status(500).json({
      error: 'Failed to create relationship'
    });
  }
}
async function findConnectionsController(req, res) {
  try {
    const { name } = req.query;

    if (!name) {
      return res.status(400).json({
        error: 'Name is required'
      });
    }

    const connections = await findConnections(name);

    res.json({
      person: name,
      connections
    });
  } catch (error) {
    console.error('Error finding connections:', error.message);

    res.status(500).json({
      error: 'Failed to find connections'
    });
  }
}
module.exports = {
  createPersonController,
  findPersonController,
  createRelationshipController,
  findConnectionsController
};