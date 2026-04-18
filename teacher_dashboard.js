const BASE_URL = "https://attendance-system-production-1bc7.up.railway.app";
const list = document.getElementById("studentlist");
const totalText = document.querySelector("h2");
let students = [];

async function loadAttendance() {
  try {
    const response = await fetch(`${BASE_URL}/attendance`);
    const data = await response.json();
    students = data;
    list.innerHTML = "";
    totalText.innerHTML = `Present: ${students.length} / 60`;

    students.forEach((student) => {
      const card = document.createElement("div");
      card.className = "box";
      card.innerHTML = `
        <p>Name: ${student.name}</p>
        <p>Rollno: ${student.roll}</p>
        <p>Erpid: ${student.erp}</p>
        <button class="remove-btn" data-roll="${student.roll}">Remove</button>
      `;

      card.querySelector(".remove-btn").addEventListener("click", async () => {
        const confirmDelete = confirm(`Remove ${student.name} from attendance?`);
        if (!confirmDelete) return;

        try {
          const res = await fetch(`${BASE_URL}/delete/${student.roll}`, {
            method: "DELETE"
          });
          const data = await res.json();
          alert(data.message);
          loadAttendance();
        } catch (err) {
          console.error(err);
          alert("Failed to remove student");
        }
      });

      list.appendChild(card);
    });

  } catch (err) {
    console.error(err);
    list.innerHTML = "<p>Server error</p>";
  }
}

loadAttendance();

// ✅ PDF DOWNLOAD BUTTON
document.getElementById("pdfBtn").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();
  doc.text("Attendance Report", 15, 20);
  doc.autoTable({
    head: [["Name", "Rollno", "Erpid"]],
    body: students.map((s) => [s.name, s.roll, s.erp]),
  });
  doc.save("attendance.pdf");
});

// ✅ LOGOUT
const logout = document.getElementById("A");
logout.addEventListener("click", () => {
  alert("Have a great day!");
});

// ✅ CLOCK
function updateClock() {
  const now = new Date();
  let hours = String(now.getHours()).padStart(2, "0");
  let minutes = String(now.getMinutes()).padStart(2, "0");
  let seconds = String(now.getSeconds()).padStart(2, "0");
  document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);
