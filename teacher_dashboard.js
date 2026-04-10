const BASE_URL = "https://attendance-system-production-1bc7.up.railway.app";

const list = document.getElementById("studentlist");
const totalText = document.querySelector("h2");

let students = [];

async function loadAttendance() {
  try {
    const response = await fetch("http://localhost:3000/attendance");
    // const response = await fetch("https://attendance-system-production-1bc7.up.railway.app/");
    const data = await response.json();

    students = data;

    list.innerHTML = "";

    totalText.innerHTML = `Present:${students.length} / 60`;

    students.forEach((student) => {
      const card = document.createElement("div");
      card.className = "box";

      card.innerHTML = `
      <p>Name: ${student.name}</p>
      <p>Rollno: ${student.roll}</p>
      <p>Erpid: ${student.erp}</p>`
      list.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    list.innerHTML = "<p>server error</p>";
  }
}

loadAttendance();

// download button

// Exel
document.querySelector("button").addEventListener("click", () => {

  let csv = "Name,Roll,Erpid\n";
  students.forEach(s => {
    csv += `${s.name},${s.roll},${s.erp}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "attendance.csv";
  a.click();
});

//Pdf
document.querySelector("button").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Attendence Report", 15, 20);

  doc.autoTable({
    head: [["Name", "Rollno", "Erpid"]],
    body: students.map((s) => [s.name, s.roll, s.erp]),
  });

  doc.save("attendance.pdf");
});

const logout = document.getElementById("A");
logout.addEventListener("click", () => {
  alert("Have a great day!");
});

// clock
function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById("clock").textContent =
    `${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);


