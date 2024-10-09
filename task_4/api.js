const API_BASE_URL = 'https://test-share.shub.edu.vn/api/intern-test';

export async function fetchData() {
  const response = await fetch(`${API_BASE_URL}/input`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.json();
}

export async function sendResults(results, token) {
  const response = await fetch(`${API_BASE_URL}/output`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(results)
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
}