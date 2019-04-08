const create = (params, credentials, post) => {
  return fetch("/api/buyposts/new/" + params.userId, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Bearer " + credentials.t
    },
    body: post
  })
    .then(response => {
      return response.json();
    })

    .catch(err => {
      console.log(err);
    });
};

const listBuyFeed = (params, credentials) => {
  return fetch("/api/buyposts/feed/" + params.userId, {
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
    .catch(err => console.log(err));
};

const remove = (params, credentials) => {
  return fetch("/api/buyposts/" + params.postId, {
    method: "DELETE",
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

export { create, listBuyFeed, remove };
