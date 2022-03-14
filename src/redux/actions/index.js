const getTypesArray = type => [`${type}_REQUEST`, type, `${type}_FAIL`];

export function getRequest(url, type) {
  return {
    types: getTypesArray(type),
    payload: {
      request: {
        method: 'GET',
        url,
        withCredentials: true,
        credentials: 'same-origin',
      },
    }
  };
}

export function postRequest(apiUrl, data = {}, type) {
  return {
    types: getTypesArray(type),
    payload: {
      request: {
        method: 'post',
        url: apiUrl,
        data: { ...data },
        withCredentials: true,
        credentials: 'same-origin',
      }
    }
  };
}


export function putRequest(apiUrl, data, type) {
  return {
    types: getTypesArray(type),
    payload: {
      request: {
        method: 'put',
        url: apiUrl,
        data,
        withCredentials: true,
        credentials: 'same-origin',
      }
    }
  };
}
