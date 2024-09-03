const fetchCategory = async () => {
  await fetch("/category", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      // Access the array of categories
      const categories = data;

      // Get the ul element where you want to insert the categories
      const categoryList = document.getElementById("categoryList");

      // Iterate over the categories and create list items
      categories.forEach((category) => {
        const listItem = document.createElement("li");
        listItem.className = "list-group-item clearfix";

        const link = document.createElement("a");
        link.href = `/product/filter/${category.cate_name}`;
        link.setAttribute("data-category", category.cate_name);
        link.className = "category-link";
        link.textContent = category.cate_name;

        listItem.appendChild(link);
        categoryList.appendChild(listItem);
      });
    })
    .catch((error) => {
      console.log("Error:", error);
    });
};
