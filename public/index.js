function sayHi(e) {
  const returnId = e.id;
  const returnIdStr = returnId.split("-");
  const neededId = returnIdStr[0]; //15
  //   console.log(neededId);
  const neededTitle = document.getElementById(`${neededId}-title`).value;
  const neededContent = document.getElementById(`${neededId}-content`).value;
  //   console.log(neededTitle);
  //   console.log(neededContent);
  const neededUser = document.getElementById("noteUser").value;
  const data = { title: neededTitle, content: neededContent };
  //send post request to edit the route
  $.ajax({
    type: "POST",
    url: `http://localhost:8080/note/${neededUser}/update/${neededId}`,
    data: data,
    success: function (res) {
      console.log(res);
    },
  }).done(() => {
    console.log("sent data to update route");
  });
}
