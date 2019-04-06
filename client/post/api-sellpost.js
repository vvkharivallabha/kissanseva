const create = (params, credentials, post) => {
  return fetch("/api/sellposts/new/" + params.userId, {
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

const listSellFeed = (params, credentials) => {
  return fetch("/api/sellposts/feed/" + params.userId, {
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

const listItems = () => {
  return fetch("/api/items/", {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

const remove = (params, credentials) => {
  return fetch("/api/sellposts/" + params.postId, {
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

export { create, remove, listSellFeed, listItems };
