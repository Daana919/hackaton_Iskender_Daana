// add
const addNameInp = document.querySelector("#add-name-inp");
const addSurnameInp = document.querySelector("#add-surname-inp");
const addPhoneNumberInp = document.querySelector("#add-phone-number-inp");
const addWeekKpiInp = document.querySelector("#add-week-kpi-inp");
const addMounthKpiInp = document.querySelector("#add-mounth-kpi-inp");
const addStudentImgInp = document.querySelector("#add-img-inp");

const studentsList = document.querySelector("#students-list");
const addStudentBtn = document.querySelector("#add-student-btn");
const saveStudentBtn = document.querySelector("#save-student-btn");
// console.log(addNameInp,addSurnameInp, addPhoneNumberInp,addWeekKpiInp,addMounthKpiInp, studentsList);
console.log(addStudentBtn);

const STUDENTS_API = "http://localhost:8000/students";

//! add student scripts start
async function addStudentToDB() {
  if (
    !addStudentImgInp.value.trim() ||
    !addNameInp.value.trim() ||
    !addSurnameInp.value.trim() ||
    !addPhoneNumberInp.value.trim() ||
    !addWeekKpiInp.value.trim() ||
    !addMounthKpiInp.value.trim()
  ) {
    alert("Some inputs are empty");
    return;
  }

  let studentObj = {
    photo: addStudentImgInp.value,
    name: addNameInp.value,
    surname: addSurnameInp.value,
    phone_number: addPhoneNumberInp.value,
    week_KPI: addWeekKpiInp.value,
    mounth_KPI: addMounthKpiInp.value,
  };
  await fetch(STUDENTS_API, {
    method: "POST",
    body: JSON.stringify(studentObj),
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });
  addStudentImgInp.value = "";
  addNameInp.value = "";
  addSurnameInp.value = "";
  addPhoneNumberInp.value = "";
  addWeekKpiInp.value = "";
  addMounthKpiInp.value = "";
  render();
}

addStudentBtn.addEventListener("click", addStudentToDB);
//! add student scripts end

//! render students on page scripts
async function render() {
  studentsList.innerHTML = "";
  let req = await fetch(STUDENTS_API);
  let students = await req.json();
  students.forEach((i) => {
    studentsList.innerHTML += `
      <div class="card m-5" style="width: 18rem;">
        <img src="${i.photo}" class="card-img-top" alt="error">
          <div class="card-body">
              <h5 class="card-title">${i.name}</h5>
              <p class="card-text">${i.description} ${i.surname}</p>
              <p class="card-text">${i.phone_number}</p>
              <p class="card-text">${i.week_KPI}</p>
              <p class="card-text">${i.mounth_KPI}</p>
              
              <a href="#" class="btn btn-outline-dark edit-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="edit-${i.id}">Edit</a>
              <a href="#" class="btn btn-outline-danger delete-btn " id="del-${i.id}">Delete</a>
          </div>
      </div>
      `;
  });

  if (students.lenth === 0) return;
  addDeleteEvent();
}
render();
//! render scripts end

//! delete student scripts
async function deleteStudent(e) {
  let studentId = e.target.id.split("-")[1];
  await fetch(`${STUDENTS_API}/${studentId}`, {
    method: "DELETE",
  });
  render();
}

function addDeleteEvent() {
  let deleteStudentBtn = document.querySelectorAll(".delete-btn");
  deleteStudentBtn.forEach((i) => i.addEventListener("click", deleteStudent));
}
//! delete student scripts end

