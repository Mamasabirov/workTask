const formData = document.querySelector(".button");
const inpName = document.querySelector(".inp_name");
const inpPhoneNumber = document.querySelector(".inp_phone");
const inpPassword = document.querySelector(".inp_password");
const inpPasswordSecond = document.querySelector(".inp_password_second");
const resultElem = document.querySelector('.result');

const setDataLS = newData => {
  const lsData = JSON.parse(localStorage.getItem("to-do"));
  if (!lsData) {
    localStorage.setItem("to-do", JSON.stringify([]));
  } else if (newData) {
    const dataArr = JSON.parse(localStorage.getItem("to-do"));
    dataArr.push(newData);
    localStorage.setItem("to-do", JSON.stringify(dataArr));
  }
};

const setData = () => {
  if (
    !inpName.value.trim("") ||
    !inpPhoneNumber.value.trim("") ||
    !inpPassword.value.trim("") ||
    !inpPasswordSecond.value.trim("") ||
    inpPassword.value !== inpPasswordSecond.value
  ) {
    alert("Error");
  } else {
    const newData = {
      name: inpName.value,
      phone: inpPhoneNumber.value,
      password: inpPassword.value,
      passwordSecond: inpPasswordSecond.value,
    };
    setDataLS(newData);
    inpName.value = '';
    inpPhoneNumber.value = '';
    inpPassword.value = '';
    inpPasswordSecond.value = '';
    getDateLS();
  }
};

const loadLocalStorage = () => {
  const savedData = JSON.parse(localStorage.getItem('to-do'));
  if (savedData) {
    inpName.value = savedData[0].name;
    inpPhoneNumber.value = savedData[0].phone;
    inpPassword.value = savedData[0].password;
    inpPasswordSecond.value = savedData[0].passwordSecond;
  } else {
    alert("Нет сохраненных данных");
  }
};

const clearLocalStorage = () => {
  localStorage.removeItem('to-do');
  inpName.value = '';
  inpPhoneNumber.value = '';
  inpPassword.value = '';
  inpPasswordSecond.value = '';
  getDateLS();
};

const getDateLS = () => {
  const data = JSON.parse(localStorage.getItem('to-do'));
  resultElem.innerHTML = "";
  if (data) {
    data.forEach((item, index) => {
      resultElem.innerHTML += `
        <div class="card" style="width: 18rem;">
          <div class="card-body">
            <h5 class="card-title">${item.name}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">${item.phone}</h6>
            <p class="card-text">${item.password}</p>
            <a href="#" class="delited_obj" onclick="deleteItem(${index})">DELETE</a>
            <a href="#" class="edited" onclick="loadLocalStorage()">EDIT</a>
          </div>
        </div>`;
    });
  }
};

const deleteItem = index => {
  const dataArr = JSON.parse(localStorage.getItem("to-do"));
  dataArr.splice(index, 1);
  localStorage.setItem("to-do", JSON.stringify(dataArr));
  getDateLS();
};

if (formData) {
  formData.addEventListener("click", setData);
}

if (document.querySelector('.edited')) {
  document.querySelector('.edited').addEventListener('click', loadLocalStorage);
}

if (document.querySelector('.delited_obj')) {
  document.querySelector('.delited_obj').addEventListener('click', clearLocalStorage);
}

getDateLS();
