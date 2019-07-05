
/* global BACKEND_URL */
function getFullUrl(url) {
  return `${BACKEND_URL}/${url}`;
}

const methodsWithBody = [
  'POST', 'PUT', 'DELETE', 'PATCH',
]

function prepareBody(body, method) {
  if (!methodsWithBody.includes(method)) {
    return;
  }

  return JSON.stringify({ ...body });
}

export default function request(url, props = {}) {
  const {
    method = 'GET',
    headers = {},
    isFullUrl = false,
    body = {},
    ...otherOptions
  } = props;

  const fullUrl = isFullUrl ?
    url :
    getFullUrl(url);

  const options = {
    headers: new Headers({ ...headers }),
    body: prepareBody(body, method),
    mode: 'cors',    
    method,
    ...otherOptions,
  }

  return fetch(fullUrl, options)
    .then(res => res.json())
    .catch(e => {
      return Promise.reject({
        message: 'Cannot parse the response',
      })
    })
}
