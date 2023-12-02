const getUrl = 'https://jsonplaceholder.typicode.com/users'
const tableBody = document.querySelector('#myTable tbody');
const searchInput = document.querySelector('#search');
const paginationContainer = document.querySelector('#pagination');
const entryCountInput = document.querySelector('#entry');
const entriesInfoDiv = document.querySelector('#showingentriesofTotalEntries');
let currentPage = 1;
let entriesPerPage = 5;

const upName = document.getElementById("upName")
const downName = document.getElementById("downName")
const upMail = document.getElementById("upMail")
const downMail = document.getElementById("downMail")
const upCompany = document.getElementById("upCompany")
const downCompany = document.getElementById("downCompany")
const upCity = document.getElementById("upCity")
const downCity = document.getElementById("downCity")


// Fetch data from an API
async function fetchData() {

  try {
    const response = await fetch(getUrl);
    if (response.ok) {
      const data = await response.json();


      // Sorting Headers
      // Sort the data alphabetically by name
      upName.addEventListener("click", () => {
        // console.log(data);
        data.sort((a, b) => a.name.localeCompare(b.name))
        displayData(data);
      })
      downName.addEventListener("click", () => {
        data.sort((a, b) => b.name.localeCompare(a.name))
        displayData(data);
      })
      // Sort Mail Datas
      upMail.addEventListener("click", () => {
        // console.log(data);
        data.sort((a, b) => a.email.localeCompare(b.email))
        displayData(data);
      })
      downMail.addEventListener("click", () => {
        data.sort((a, b) => b.email.localeCompare(a.email))
        displayData(data);
      })

      // Sort Company Datas
      upCompany.addEventListener("click", () => {
        // console.log(data);
        data.sort((a, b) => a.company.name.localeCompare(b.company.name))
        displayData(data);
      })
      downCompany.addEventListener("click", () => {
        data.sort((a, b) => b.company.name.localeCompare(a.company.name))
        displayData(data);
      })

      // Sort City Datas
      upCity.addEventListener("click", () => {
        // console.log(data);
        data.sort((a, b) => a.address.city.localeCompare(b.address.city))
        displayData(data);
      })
      downCity.addEventListener("click", () => {
        data.sort((a, b) => b.address.city.localeCompare(a.address.city))
        displayData(data);
      })
      displayData(data);
      displayPagination(data)
      displayEntriesInfo(data.length);
      // console.log(data[0].company.name);
      // console.log(data[0]);
    } else {
      throw new Error("failed to fetch post");
    }
  } catch (error) {
    console.log(error)
  }

}

// Display data in the table
function displayData(data) {
  const startIndex = (currentPage - 1) * entriesPerPage;
  const endIndex = startIndex + entriesPerPage;
  const paginatedData = data.slice(startIndex, endIndex);
  if (currentPage === 2) {
    entriesInfoDiv.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${data.length} entries`;
  }
  else {
    entriesInfoDiv.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${data.length} entries`;
  }

  tableBody.innerHTML = '';
  paginatedData.forEach((item) => {
    console.log(item);
    const row = document.createElement('tr');
    row.setAttribute('class', 'table-light')
    row.innerHTML = `
      <td class="table-info d-flex align-items-center gap-1"> <ion-icon name="add-circle" class="add-circle"></ion-icon> ${item.name}</td>
      <td class="dis">${item.email}</td>
      <td class="">${item.company.name}</td>
      <td class="discity ">${item.address.city}</td>
      <td class="disphone ">${item.phone}</td>
    `;
    tableBody.appendChild(row);
  });

  entryCountInput.value = paginatedData.length;
}

// Display pagination
function displayPagination(data) {
  const totalPages = Math.ceil(data.length / entriesPerPage);
  paginationContainer.innerHTML = '';

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement('button');
    button.textContent = i;
    button.addEventListener('click', () => {
      currentPage = i;
      displayData(data);
    });
    paginationContainer.appendChild(button);

  }
}

// Display entries information
function displayEntriesInfo(totalEntries) {
  const startIndex = (currentPage - 1) * entriesPerPage + 1;
  const endIndex = Math.min((currentPage * entriesPerPage), totalEntries);
  console.log(endIndex);
  entriesInfoDiv.textContent = `Showing ${startIndex} to ${endIndex} of ${totalEntries} entries`;
}

// Filter table based on search input
function filterTable() {
  const searchText = searchInput.value.toLowerCase();
  const rows = tableBody.querySelectorAll('tr');

  rows.forEach(row => {
    const text = row.innerText.toLowerCase();
    row.style.display = text.includes(searchText) ? '' : 'none';
  });
  //   displayEntriesInfo(rows.length);
}

// Initialize the table
fetchData();


// info Input.value manage
const entriesPerPageInput = document.querySelector('#entry');

// Update the entriesPerPage when the input changes
entriesPerPageInput.addEventListener('input', function () {
  const newEntriesPerPage = parseInt(this.value);
  if (!isNaN(newEntriesPerPage) && newEntriesPerPage > 0) {
    entriesPerPage = newEntriesPerPage;
    // console.log(entriesPerPage);
    currentPage = 1; // Reset the current page to the first page
    fetchData(); // Fetch and display data based on the new entriesPerPage
  }
});
