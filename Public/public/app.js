async function addPerson() {
  const nameInput = document.getElementById('personName');
  const result = document.getElementById('addResult');

  const name = nameInput.value.trim();

  if (!name) {
    result.textContent = 'Please enter a name.';
    return;
  }

  try {
    const response = await fetch('/api/people', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name })
    });

    const data = await response.json();

    if (!response.ok) {
      result.textContent = data.error || 'Failed to add person.';
      return;
    }

    result.textContent = `${name} added successfully!`;
    nameInput.value = '';

  } catch (error) {
    console.error(error);
    result.textContent = 'Could not connect to the server.';
  }
}


async function createConnection() {
  const person1Input = document.getElementById('person1');
  const person2Input = document.getElementById('person2');
  const result = document.getElementById('connectionResult');

  const person1Name = person1Input.value.trim();
  const person2Name = person2Input.value.trim();

  if (!person1Name || !person2Name) {
    result.textContent = 'Please enter both names.';
    return;
  }

  try {
    const response = await fetch('/api/people/relationship', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        person1Name,
        person2Name
      })
    });

    const data = await response.json();

    if (!response.ok) {
      result.textContent =
        data.error || 'Failed to create connection.';
      return;
    }

    result.textContent =
      `${person1Name} now knows ${person2Name}!`;

    person1Input.value = '';
    person2Input.value = '';

  } catch (error) {
    console.error(error);
    result.textContent = 'Could not connect to the server.';
  }
}


async function findConnections() {
  const searchInput = document.getElementById('searchName');
  const result = document.getElementById('connectionsResult');

  const name = searchInput.value.trim();

  if (!name) {
    result.textContent = 'Please enter a name.';
    return;
  }

  try {
    const response = await fetch(
      `/api/people/connections?name=${encodeURIComponent(name)}`
    );

    const data = await response.json();

    if (!response.ok) {
      result.textContent =
        data.error || 'Failed to find connections.';
      return;
    }

    result.innerHTML = '';

    if (data.connections.length === 0) {
      result.textContent = `${name} has no connections yet.`;
      return;
    }

    data.connections.forEach(person => {
      const connection = document.createElement('div');

      connection.className = 'connection';
      connection.textContent = person.name;

      result.appendChild(connection);
    });

  } catch (error) {
    console.error(error);
    result.textContent = 'Could not connect to the server.';
  }
}