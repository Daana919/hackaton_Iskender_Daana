//! add inputs connection
const addNameInp = document.querySelector("#add-name-inp");
const addSurnameInp = document.querySelector("#add-surname-inp");
const addPhoneNumberInp = document.querySelector("#add-phone-number-inp");
const addWeekKpiInp = document.querySelector("#add-week-kpi-inp");
const addMounthKpiInp = document.querySelector("#add-mounth-kpi-inp");
const addStudentImgInp = document.querySelector("#add-img-inp");
const searchInp = document.querySelector("#search-inp");
const studentsList = document.querySelector("#students-list");
const addStudentBtn = document.querySelector("#add-student-btn");
const saveStudentBtn = document.querySelector("#save-student-btn");
const STUDENTS_API = "http://localhost:8000/students";

//! pagination
let currentPage = 1;
let search = "";
//! pagination

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
//! add student scripts end.

//! render students on page scripts
async function render() {
  studentsList.innerHTML = "";
  let requestAPI = `${STUDENTS_API}?q=${search}&_page=${currentPage}&_limit=4`;

  let req = await fetch(requestAPI);
  let students = await req.json();
  students.forEach((i) => {
    studentsList.innerHTML += `
      <div class="card m-5" style="width: 18rem;">
        <img src="${i.photo}" class="card-img-top" alt="error">
          <div class="card-body">
              <h5 class="card-title">${i.name} ${i.surname}</h5>
              <p class="card-text"><b>Number: </b>${i.phone_number}</p>
              <p class="card-text"><b>WEEK KPI: </b>${i.week_KPI}</p>
              <p class="card-text"><b>MOUNTH KPI: </b>${i.mounth_KPI}</p>
              <a href="#" class="btn btn-outline-light edit-btn" data-bs-toggle="modal" data-bs-target="#staticBackdrop" id="edit-${i.id}">Edit</a>
              <a href="#" class="btn btn-secondary delete-btn" id="del-${i.id}">Delete</a>



              <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
              aria-labelledby="staticBackdropLabel" aria-hidden="true">
              <div class="modal-dialog">
                  <div class="modal-content">
                      <div class="modal-header">
                          <h5 class="modal-title" id="staticBackdropLabel">STUDENT INFO</h5>
                          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
                      </div>
                      <div class="modal-body">
                          <div class="d-flex flex-column w-100 align-items-center" id="addStudent-block">
                              <input type="text" id="edit-name-inp" placeholder="Student name"
                                  class="mb-2 w-100 form-control">
                              <input type="text" id="edit-surname-inp" placeholder="Student surname"
                                  class="mb-2 w-100 form-control">
                              <input type="text" id="edit-phone-number-inp" placeholder="Phone number"
                                  class="mb-2 w-100 form-control">
                              <input type="text" id="edit-week-kpi-inp" placeholder="Week KPI"
                                  class="mb-2 w-100 form-control">
                              <input type="text" id="edit-mounth-kpi-inp" placeholder="Mounth KPI"
                                  class="mb-2 w-100 form-control">
      
                              <input type="text" id="edit-img-inp" placeholder="Student photo Url"
                                  class="mb-2 w-100 form-control">
      
                          </div>
                          <div class="modal-footer  w-100 d-flex  justify-content-center">
                              <button type="button" class="btn btn-outline-dark" id="save-student-btn">Save changes</button>
                          </div>
          </div>
      </div>
      `;
  });

  if (students.lenth === 0) return;
  addDeleteEvent();
  addEditEvent();
}
render();
//! render scripts end.

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
//! delete student scripts end.

//! edit student scripts
async function addStudentInfoToForm(e) {
  let studentId = e.target.id.split("-")[1];

  let req = await fetch(`${STUDENTS_API}/${studentId}`);
  let studentObj = await req.json();

  //! edit inputs connection
  const editSurnameInp = document.querySelector("#edit-surname-inp");
  const editNameInp = document.querySelector("#edit-name-inp");
  const editPhoneNumberInp = document.querySelector("#edit-phone-number-inp");
  const editWeekKpiInp = document.querySelector("#edit-week-kpi-inp");
  const editMounthKpiInp = document.querySelector("#edit-mounth-kpi-inp");
  const editStudentImgInp = document.querySelector("#edit-img-inp");

  //   console.log(
  //     editNameInp,
  //     editSurnameInp,
  //     editPhoneNumberInp,
  //     editWeekKpiInp,
  //     editMounthKpiInp,
  //     editStudentImgInp
  //   );

  editStudentImgInp.value = studentObj.photo;
  editNameInp.value = studentObj.name;
  editSurnameInp.value = studentObj.surname;
  editPhoneNumberInp.value = studentObj.phone_number;
  editWeekKpiInp.value = studentObj.week_KPI;
  editMounthKpiInp.value = studentObj.mounth_KPI;

  let saveChangesBtn = document.querySelector("#save-student-btn");
  saveChangesBtn.setAttribute("id", studentObj.id);

  async function saveChanges(e) {
    let updatedStudentObj = {
      id: e.target.id,
      photo: editStudentImgInp.value,
      name: editNameInp.value,
      surname: editSurnameInp.value,
      phone_number: editPhoneNumberInp.value,
      week_KPI: editWeekKpiInp.value,
      mounth_KPI: editMounthKpiInp.value,
    };

    if (
      !editStudentImgInp.value.trim() ||
      !editNameInp.value.trim() ||
      !editSurnameInp.value.trim() ||
      !editPhoneNumberInp.value.trim() ||
      !editWeekKpiInp.value.trim() ||
      !editMounthKpiInp.value.trim()
    ) {
      alert("Some inputs are empty");
      return;
    }

    await fetch(`${STUDENTS_API}/${e.target.id}`, {
      method: "PUT",
      body: JSON.stringify(updatedStudentObj),
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
    });

    //! edit inputs clear
    editPhoneNumberInp.value = "";
    editNameInp.value = "";
    editSurnameInp.value = "";
    editPhoneNumberInp.value = "";
    editWeekKpiInp.value = "";
    editMounthKpiInp.value = "";

    saveChangesBtn.removeAttribute("id");
    let btnClose = document.querySelector(".btn-close");
    btnClose.click();
    render();
  }
  saveChangesBtn.addEventListener("click", saveChanges);
}

function addEditEvent() {
  let editBtn = document.querySelectorAll(".edit-btn");
  editBtn.forEach((i) => i.addEventListener("click", addStudentInfoToForm));
}
//! edit student scripts end.
//! search logic
searchInp.addEventListener("input", () => {
  search = searchInp.value;
  currentPage = 1;
  render();
});
//! search logic end
//! pagination logic
let prevPageBtn = document.querySelector("#prev-page-btn");
let nextPageBtn = document.querySelector("#next-page-btn");

async function getPagesCount() {
  let res = await fetch(`${STUDENTS_API}`);
  let products = await res.json();
  let pagesCount = Math.ceil(products.length / 4);
  return pagesCount;
}
async function checkPages() {
  let maxPagesNum = await getPagesCount();
  if (currentPage === 1) {
    prevPageBtn.setAttribute("style", "display: none");
    nextPageBtn.setAttribute("style", "display: block");
  } else if (currentPage === maxPagesNum) {
    prevPageBtn.setAttribute("style", "display: block");
    nextPageBtn.setAttribute("style", "display: none");
  } else {
    prevPageBtn.setAttribute("style", "display: block");
    nextPageBtn.setAttribute("style", "display: block");
  }
}
checkPages();

prevPageBtn.addEventListener("click", () => {
  currentPage--;
  checkPages();
  render();
});
nextPageBtn.addEventListener("click", () => {
  currentPage++;
  checkPages();
  render();
});
//* pagination logic end
//! product logic end
