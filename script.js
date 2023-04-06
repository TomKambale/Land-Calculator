const myButton = document.getElementById("myBtn");

const myFunction = () => {
  alert("Congratulation on making the first step towards home ownership");
};

const someOtherFunction = () => {
  alert("Conduct due deligence before making any transactions!");
};

myButton.addEventListener("click", myFunction);
myButton.addEventListener("click", someOtherFunction);
// Get all the checkboxes and add a click event listener to each of them
const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(function (checkbox) {
  checkbox.addEventListener("click", function () {
    // If the current checkbox is checked, uncheck all other checkboxes
    if (this.checked) {
      checkboxes.forEach(function (otherCheckbox) {
        if (otherCheckbox !== checkbox) {
          otherCheckbox.checked = false;
        }
      });
      // Get the value of the selected checkbox
      const selectedSize = checkbox.value;
      // Use fetch to retrieve data from db.json for the selected checkbox value
      fetch(`https://land-calculator.onrender.com/land-sizes?size=${selectedSize}`, {
        method: "GET",
      })
        // parse the response data as JSON
        .then((response) => response.json())
        // once the data is parsed, do something with it
        .then((data) => {
          // select the <ul> element where we will display the data
         
            const availableLocations = document.querySelector(
              "#available-locations"
            );
            // clear any previously displayed data from the <ul> element

            availableLocations.innerHTML = data.eigth.location;
          

          // loop over each property in the data object
          data.forEach((property) => {
            // create a new <li> element to display the property data
            const listItem = document.createElement("li");
            // set the text content of the <li> element to include the property location and land size
            listItem.textContent = `${property.location} (${property.size} acres)`;
            // add the <li> element to the <ul> element for display
            availableLocations.appendChild(listItem);
          });
        })
        // if an error occurs during the fetch or data processing, log it to the console
        .catch((error) => console.log(error));
    }
  });
});

// Get all the rows of the table
const rows = document.querySelectorAll("#rooms tr");

// Add click event listeners to the Add Room and Delete Room buttons in each row
rows.forEach((row) => {
  // Add Room button
  const addBtn = row.querySelector("#add-room");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      // Calculate the area of the room and display it in the appropriate input field
      const length = row.querySelector("[name=length]").value;
      const width = row.querySelector("[name=width]").value;
      const area = length * width;
      const areaInput = row.querySelector("[name=area]");
      areaInput.value = area;
    });
  }

  // Delete Room button
  const deleteBtn = row.querySelector(".delete-room");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", () => {
      // Clear the input fields for the length, width, and area of the room
      row.querySelector("[name=length]").value = "";
      row.querySelector("[name=width]").value = "";
      row.querySelector("[name=area]").value = "";
    });
  }
});

// Add a click event listener to the Calculate Rooms button
const calculateBtn = document.querySelector("#calculate-rooms");
calculateBtn.addEventListener("click", () => {
  // Calculate the total area of all the rooms and display it to the user
  let totalArea = 0;
  const areaInputs = document.querySelectorAll("#rooms [name=area]");
  areaInputs.forEach((areaInput) => {
    totalArea += Number(areaInput.value);
  });
  const totalAreaSpan = document.querySelector("#total-area");
  totalAreaSpan.textContent = totalArea.toFixed(0);
});

// Define the checkbox values in an object
const landSizes = {
  "1/8 Acre": 505.8575,
  "1/4 Acre": 1011.715,
  "1/2 Acre": 2023.43,
  "1 Acre": 4046.86,
  "1.25 Acres": 5068.57,
  "1.5 Acres": 6072.87,
  "1.75 Acres": 7077.165,
  "2 Acres": 8093.72
};
// Add a click event listener to the Calculate Land button
const calculateLandBtn = document.querySelector("#calculate-land");
calculateBtn.addEventListener("click", () => {
  // Get the selected checkbox value
  const landSizeInputs = document.querySelectorAll("[name=land_size]");
  let selectedValue;
  landSizeInputs.forEach((landSizeInput) => {
    if (landSizeInput.checked) {
      selectedValue = Number(landSizeInput.value);
    }
  });
  
  // Calculate the land space left
  const totalAreaSpan = document.querySelector("#total-area");
  const totalArea = Number(totalAreaSpan.textContent);
  const landSpaceLeft = selectedValue - totalArea;
  
  // Display the land space left to the user
  const landSpaceLeftSpan = document.querySelector("#land-space-left");
  landSpaceLeftSpan.textContent = landSpaceLeft.toFixed(0);
});

let area_sqm = landSizes["1/4 Acre"];

const availableLocations = document.getElementById("available-locations");

const landSizeSelect = document.getElementById("land-size-select");
landSizeSelect.addEventListener("change", event => {
  const selectedSize = event.target.value;
  area_sqm = landSizes[selectedSize];

  // Clear existing list items
  availableLocations.innerHTML = "";

  fetch("https://land-calculator.onrender.com/land-sizes")
    .then(response => response.json())
    .then(data => {
      for (let location of data) {
        if (location.area_sqm === area_sqm) {
          const listItem = document.createElement("li");
          listItem.textContent = `${location.name} (${selectedSize})`;
          availableLocations.appendChild(listItem);
        }
      }
    })
    .catch(error => console.error(error));
});