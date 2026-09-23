const { createPerson, findPerson } = require('./src/db/queries');

async function test() {
  try {
    await createPerson('Daniel');

    const people = await findPerson('Daniel');

    console.log('People found:');
    console.log(people);
  } catch (error) {
    console.error('Error:');
    console.error(error.message);
  }
}

test();