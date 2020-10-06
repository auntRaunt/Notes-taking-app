function deleteItem() {
  return fetch("/delete")
    .then((res) => {
      let result = res.json();
      return result;
    })
    .then((res) => {
      console.log(res);
    })
    .catch((err) => {
      console.log(err);
    });
}
