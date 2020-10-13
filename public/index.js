const title = document.querySelectorAll(".i-title");
const content = document.querySelectorAll(".i-content");

for (let i = 0; i < title.length; i++) {
  title[i].addEventListener("change", (e) => {
    let newTitle = e.target.value;
    fetch(`edit/${newTitle}`, {
      method: "POST",
      body: JSON.stringify(newTitle),
    });
  });
}

for (let i = 0; i < content.length; i++) {
  content[i].addEventListener("change", (e) => {
    let newContent = e.target.value;
  });
}
