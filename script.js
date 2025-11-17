// async function getData() {
//   const response = await fetch("data.json");
//   const data = await response.json();

//   const table = document.querySelector(".table");

//   data.elements.forEach((eachObject) => {
//     const div = document.createElement("div");
//     div.classList.add("element");

//     div.innerHTML = `
//       <h3 id="symbol">${eachObject.symbol}</h3>
//       <p id="name">${eachObject.name}</p>
//       <p id="number">${eachObject.number}</p>
//     `;

//     div.style.gridColumn = eachObject.xpos;
//     div.style.gridRow = eachObject.ypos;

//     table.appendChild(div);

//     //classes based on categories
//     switch (eachObject.category) {
//       case "alkali metal":
//         div.classList.add("alkali-metal");
//         break;

//       case "alkaline earth metal":
//         div.classList.add("alkali-earth-metal");
//         break;

//       case "transition metal":
//         div.classList.add("transition-metal");
//         break;

//       case "metalloid":
//         div.classList.add("metalloid");
//         break;

//       case "post-transition metal":
//         div.classList.add("post-transition-metal");
//         break;

//       case "unknown":
//         div.classList.add("unknown");
//         break;

//       case "polyatomic nonmetal":
//         div.classList.add("polyatomic-nonmetal");
//         break;

//       case "noble gas":
//         div.classList.add("noble-gas");
//         break;

//       case "diatomic nonmetal":
//         div.classList.add("diatomic-nonmetal");
//         break;

//       case "lanthanide":
//         div.classList.add("lanthanide");
//         break;

//       case "actinide":
//         div.classList.add("actinide");
//         break;
//     }
//   });
// }

// getData();

async function fetchData() {
  const response = await fetch("data.json");
  const data = await response.json();
  data.elements.forEach(createElementDiv);
}

function createElementDiv(element) {
  const table = document.querySelector(".table");

  const div = document.createElement("div");
  div.classList.add("element");

  div.innerHTML = `
    <h3 id="symbol">${element.symbol}</h3>
    <p id="name">${element.name}</p>
    <p id="number">${element.number}</p>
  `;

  div.style.gridColumn = element.xpos;
  div.style.gridRow = element.ypos;

  applyCategoryClass(div, element.category);

  div.addEventListener("click", () => {
    openPopup(element);
  });
  table.appendChild(div);
}

function applyCategoryClass(div, category) {
  const categoryClassName = category.replaceAll(" ", "-");
  div.classList.add(categoryClassName);
}

function openPopup(element) {
  const popupContainer = document.querySelector(".popup-container");
  popupContainer.classList.add("show-popup");

  const closeButton = document.querySelector("#close-popup");
  closeButton.onclick = closePopup;

  popupContainer.onclick = (e) => {
    if (e.target === popupContainer) closePopup();
  };

  const categoryClass = element.category.replaceAll(" ", "-");

  const popup = document.querySelector(".popup");
  popup.className = "popup";
  popup.classList.add(categoryClass);

  const popupSymbol = document.querySelector(".popup-symbol");
  popupSymbol.className = "popup-symbol";
  popupSymbol.classList.add(categoryClass);

  closeButton.className = "";
  closeButton.id = "close-popup";
  closeButton.classList.add(categoryClass);

  const popupName = document.querySelector(".popup-name");
  popupName.innerHTML = `
      <p><strong>${element.name}</strong></p>
    `;
  popupSymbol.innerHTML = `
      <p><strong>${element.symbol}</strong></p>
    `;

  const popupContent = document.querySelector(".popup-content");

  const basicInfo = document.querySelector(".basic-info");

  const physicalProperties = document.querySelector(".physical-properties");
  const atomicProperties = document.querySelector(".atomic-properties");
  const otherInfo = document.querySelector(".other-info");

  basicInfo.innerHTML = `
  <h3 class="sub-headings">Basic Information</h3>
  <p><strong>Name:</strong> ${element.name}</p>
  <p><strong>Symbol:</strong> ${element.symbol}</p>
  <p><strong>Atomic Number:</strong> ${element.number}</p>
  <p><strong>Category:</strong> ${element.category}</p>
  <p><strong>Period:</strong> ${element.period}</p>
`;

  physicalProperties.innerHTML = `
  <h3 class="sub-headings">Physical Properties</h3>
  <p><strong>Phase at STP:</strong> ${element.phase}</p>
  <p><strong>Density:</strong> ${element.density || "N/A"}</p>
  <p><strong>Melting Point (K):</strong> ${element.melt || "N/A"}</p>
  <p><strong>Boiling Point (K):</strong> ${element.boil || "N/A"}</p>
  <p><strong>Appearance:</strong> ${element.appearance || "N/A"}</p>
`;

  atomicProperties.innerHTML = `
  <h3 class="sub-headings">Atomic Properties</h3>
  <p><strong>Atomic Mass:</strong> ${element.atomic_mass}</p>
  <p><strong>Electron Configuration:</strong> ${
    element.electron_configuration_semantic
  }</p>
  <p><strong>Electronegativity:</strong> ${
    element.electronegativity_pauling || "N/A"
  }</p>
  <p><strong>Ionization Energy (eV):</strong> ${
    element.ionization_energies ? element.ionization_energies[0] : "N/A"
  }</p>
`;

  otherInfo.innerHTML = `
  <h3 class="sub-headings">Other Information</h3>
  <p><strong>Discovered By:</strong> ${element.discovered_by || "Unknown"}</p>
  <p><strong>Named By:</strong> ${element.named_by || "Unknown"}</p>
  <p><strong>Summary:</strong> ${element.summary}</p>
`;
}

function closePopup() {
  document.querySelector(".popup-container").classList.remove("show-popup");
}

const buttons = document.querySelectorAll(".filter-buttons button");

buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const category = btn.dataset.category;
    const elements = document.querySelectorAll(".element");

    elements.forEach((el) => {
      if (category === "all") {
        el.style.opacity = "1";
        el.style.pointerEvents = "auto";
      } else if (el.classList.contains(category)) {
        el.style.opacity = "1";
        el.style.pointerEvents = "auto";
      } else {
        el.style.opacity = "0.2";
        el.style.pointerEvents = "none";
      }
    });
  });
});

fetchData();
