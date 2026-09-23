const driver = require('./src/db/cognodb');

async function testConnection() {
  try {
    const session = driver.session();

    await session.run('RETURN 1');

    console.log('Connected to CognoDB successfully!');

    await session.close();
    await driver.close();
  } catch (error) {
    console.error('Connection failed:');
    console.error(error.message);
  }
}

testConnection();