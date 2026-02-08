console.log("hellow");

const students = [
  {
    name: " Pranav",
    rollno: " 101",
    erpid: " 4342",
  },
  {
    name: " Abhimanyu",
    rollno: " 102",
    erpid: " 6432",
  },
  {
    name: " Divyansh",
    rollno: " 103",
    erpid: " 9635",
  },
  {
    name: " Adhyan",
    rollno: " 104",
    erpid: " 1352",
  },
];

const list = document.getElementById("studentlist");
list.innerHTML = "";

students.forEach((student) => {
  const card = document.createElement("div");
  card.className = "box";

  card.innerHTML = `
    <p>Name:${student.name}</p>
    <p>Rollno:${student.rollno}</p>
    <p>Erpid:${student.erpid}</p>`;

  list.appendChild(card);
});

// download button

// Exel
// document.querySelector("button").addEventListener("click",()=>{

//     let csv = "Name,Roll,Erpid\n";
//     students.forEach(s=>{
//         csv += `${s.name},${s.rollno},${s.erpid}\n`;
//     });

//     const blob = new Blob([csv],{type:"text/csv"});
//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");
//     a.href = url;
//     a.download = "attendance.csv";
//     a.click();
// });

//Pdf
document.querySelector("button").addEventListener("click", () => {
  const { jsPDF } = window.jspdf;
  const doc = new jsPDF();

  doc.text("Attendence Report", 15, 20);

  doc.autoTable({
    head: [["Name", "Rollno", "Erpid"]],
    body: students.map((s) => [s.name, s.rollno, s.erpid]),
  });

  doc.save("attendance.pdf");
});


// clock 
function updateClock(){
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