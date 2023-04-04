var x = document.getElementById("myBtn");
x.addEventListener("click", myFunction);
x.addEventListener("click", someOtherFunction);

function myFunction() {
  alert ("Congratulations on making your first home ownership step.");
}

function someOtherFunction() {
  alert ("Conduct due diligence before making any transactions!");
}
const checkboxes = document.querySelectorAll('input[type="checkbox"]');

checkboxes.forEach(function(checkbox) {
  checkbox.addEventListener('click', function() {
    if (this.checked) {
      checkboxes.forEach(function(otherCheckbox) {
        if (otherCheckbox !== checkbox) {
          otherCheckbox.checked = false;
        }
      });
    }
  });
});

// get table rows
const rows = document.querySelectorAll('#rooms tr');

// add click event listener to Add Room buttons
rows.forEach(row => {
  const addBtn = row.querySelector('#add-room');
  if (addBtn) {
    addBtn.addEventListener('click', () => {
      const length = row.querySelector('[name=length]').value;
      const width = row.querySelector('[name=width]').value;
      const area = length * width;
      const areaInput = row.querySelector('[name=area]');
      areaInput.value = area;
    });
  }
  
  const deleteBtn = row.querySelector('.delete-room');
  if (deleteBtn) {
    deleteBtn.addEventListener('click', () => {
      row.querySelector('[name=length]').value = '';
      row.querySelector('[name=width]').value = '';
      row.querySelector('[name=area]').value = '';
    });
  }
});

const calculateBtn = document.querySelector('#calculate-rooms');
calculateBtn.addEventListener('click', () => {
  let totalArea = 0;
  const areaInputs = document.querySelectorAll('#rooms [name=area]');
  areaInputs.forEach(areaInput => {
    totalArea += Number(areaInput.value);
  });
  const totalAreaSpan = document.querySelector('#total-area');
  totalAreaSpan.textContent = totalArea.toFixed(2);
});