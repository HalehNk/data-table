const uploadTransactionBtn = document.querySelector(".primary__button");
const searchBox = document.querySelector(".search-box");
const tableContainer = document.querySelector(".table-container");
const tableBody = document.querySelector(".table-Body");
const tableHeadChevs = document.querySelectorAll(".cursor-pointer");

uploadTransactionBtn.addEventListener("click", () => {
  // console.log("clicky clicky");
  getData();
  searchBox.classList.remove("hidden");
  uploadTransactionBtn.classList.add("hidden");
  tableContainer.classList.remove("hidden");
});

async function getData() {
  const response = (await fetch("http://localhost:3000/transactions")).json();
  const data = await response;
  console.log(data);
  viewData(data);
}

function viewData(dataArr) {
  const tableData = dataArr.map((data) => {
    const rowClass = data.type.includes("افزایش") ? "increase" : "decrease";

    const timeInMs = data.date;
    const date = new Date(timeInMs);
    const formattedDate = date.toLocaleDateString("fa-IR");
    const formattedTime = date.toLocaleTimeString("fa-IR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const tableRow = `
      <tr class="table-row">
        <td>${data.id}</td>
        <td class="${rowClass}">${data.type}</td>
        <td>${data.price}</td>
        <td>${data.refId}</td>
        <td>${formattedDate} ساعت ${formattedTime}</td>
      </tr>
  `;
    // console.log(data.type);
    tableBody.innerHTML += tableRow;
  });
}

tableHeadChevs.forEach((chev) => {
  chev.addEventListener("click", () => {
    const chevronImg = chev.querySelector(".img-chevron");
    if (chevronImg) {
      chevronImg.classList.toggle("toggle-up");
    }
  });
});
