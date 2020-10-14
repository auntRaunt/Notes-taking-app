function sayHi(e) {
  const returnId = e.id;
  const returnIdStr = returnId.split("-");
  const neededId = returnIdStr[0];
  //   console.log(neededId);
  const neededTitle = document.getElementById(`${neededId}-title`).value;
  const neededContent = document.getElementById(`${neededId}-content`).value;
  //   console.log(neededTitle);
  //   console.log(neededContent);
  const data = { title: neededTitle, content: neededContent };
  //send post request to edit the route
  $.ajax({
    type: "POST",
    url: `http://localhost:8080/note/update/${neededId}`,
    data: data,
    success: function (res) {
      console.log(res);
    },
    error: function () {
      console.log("error");
    },
  }).done(() => {
    console.log("sent data to update route");
  });
}
