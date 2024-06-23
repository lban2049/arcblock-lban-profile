// save user
export async function saveUser(user) {
  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Add favourite API error', error);
  }
}

// get user
export async function getUser(id) {
  try {
    const response = await fetch(`/api/users/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('Add favourite API error', error);
  }
}
