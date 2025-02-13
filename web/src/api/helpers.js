const apiUrl = import.meta.env.VITE_API_URL;

export async function get(url) {
  const token = localStorage.getItem('token');
  const headers = new Headers();
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`);
  const options = {
    method: 'GET',
    headers
  }

  const response = await fetch(`${apiUrl}${url}`, options);
  const data = await response.json();
  return { status: response.status, data };
}

export async function post(url, body) {
  const token = localStorage.getItem('token');
  const headers = new Headers();
  headers.set('Content-Type', 'application/json')
  headers.set('Accept', 'application/json')
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const options = {
    method: 'POST',
    headers,
    body: JSON.stringify(body)
  }
  const response = await fetch(`${apiUrl}${url}`, options);
  const data = await response.json();

  return { status: response.status, data };
}