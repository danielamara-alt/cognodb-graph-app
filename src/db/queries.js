const driver = require('./cognodb');

async function createPerson(name) {
  const session = driver.session();

  try {
    const result = await session.run(
      'MERGE (p:Person {name: $name}) RETURN p',
      { name }
    );

    return result.records[0].get('p');
  } finally {
    await session.close();
  }
}

async function findPerson(name) {
  const session = driver.session();

  try {
    const result = await session.run(
      'MATCH (p:Person) WHERE p.name = $name RETURN p',
      { name }
    );

    return result.records.map(record => record.get('p'));
  } finally {
    await session.close();
  }
}

async function createRelationship(person1Name, person2Name) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (a:Person {name: $person1Name})
      MATCH (b:Person {name: $person2Name})
      MERGE (a)-[:KNOWS]->(b)
      RETURN a, b
      `,
      {
        person1Name,
        person2Name
      }
    );

    return result.records[0];
  } finally {
    await session.close();
  }
}

async function findConnections(personName) {
  const session = driver.session();

  try {
    const result = await session.run(
      `
      MATCH (a:Person {name: $personName})-[:KNOWS]->(b:Person)
      RETURN b
      `,
      {
        personName
      }
    );

    return result.records.map(record => {
      const person = record.get('b');

      return {
        name: person.properties.name
      };
    });
  } finally {
    await session.close();
  }
}

module.exports = {
  createPerson,
  findPerson,
  createRelationship,
  findConnections
};