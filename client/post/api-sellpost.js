const create = (params, credentials, post) => {
  console.log(params);
  console.log(credentials);
  console.log(JSON.stringify(post));
  return fetch("/api/sellposts/new/" + params.userId, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: JSON.stringify(post)
  })
    .then(response => {
      return response.json();
    })

    .catch(err => {
      console.log(err);
    });
};

const sellPostByID = (params, credentials) => {
  
  return fetch("/api/sellposts/get/" + params.userId, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + credentials.t
    }
  })
    .then(response => {
      return response.json();
    })

    .catch(err => {
      console.log(err);
    });
};

export { create,sellPostByID };
