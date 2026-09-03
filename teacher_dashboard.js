const list = document.getElementById("studentlist");
const totalText = document.querySelector("h2");

let students = [];

async function loadAttendance() {
  try {
    const response = await fetch("http://localhost:3000/attendance");
    const data = await response.json();

    students = data;

    list.innerHTML = "";

    totalText.innerHTML = `Present: ${students.length} / 60`;

    students.forEach((student) => {
      const card = document.createElement("div");
      card.className = "box";

      card.innerHTML = `
        <p>Name: ${student.name}</p>
        <p>Roll No: ${student.roll_no}</p>
        <p>Date: ${new Date(student.date).toLocaleDateString()}</p>
        <p>Status: ${student.status}</p>
        <button class="remove-btn" data-roll="${student.roll_no}">Remove</button>
      `;

      card.querySelector(".remove-btn").addEventListener("click", async () => {
        const confirmDelete = confirm(`Remove ${student.name}'s attendance?`);
        if (!confirmDelete) return;

        try {
          const res = await fetch(`http://localhost:3000/delete/${student.roll_no}`, {
            method: "DELETE",
          });
          const result = await res.json();
          alert(result.message);
          loadAttendance();
        } catch (err) {
          console.error(err);
          alert("Failed to remove attendance");
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


document.addEventListener("DOMContentLoaded", () => {

  const downloadBtn = document.getElementById("downloadBtn");

  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const { jsPDF } = window.jspdf;

      if (!jsPDF) {
        alert("jsPDF not loaded!");
        return;
      }

      const doc = new jsPDF();

      doc.text("Attendance Report", 15, 20);

      doc.autoTable({
        head: [["Name", "Roll No", "Date", "Status"]],
        body: (students || []).map((s) => [
          s.name,
          s.roll_no,
          s.date,
          s.status
        ]),
      });

      doc.save("attendance.pdf");
    });
  }

});


// ✅ Logout
const logout = document.getElementById("A");
logout.addEventListener("click", () => {
  alert("Have a great day!");
});


// ✅ Clock
function updateClock() {
  const now = new Date();

  let hours = now.getHours();
  let minutes = now.getMinutes();
  let seconds = now.getSeconds();

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  document.getElementById("clock").textContent = `${hours}:${minutes}:${seconds}`;
}

updateClock();
setInterval(updateClock, 1000);