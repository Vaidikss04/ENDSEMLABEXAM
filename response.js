
let students = JSON.parse(localStorage.getItem("students")) || [];

document.getElementById("resultForm").onsubmit = function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value;
    let roll = document.getElementById("roll").value;

    if(students.some(s => s.roll === roll)) {
        alert("Roll number already exists!");
        return;
    }

    let marks = ["m1","m2","m3","m4","m5"]
        .map(id => Number(document.getElementById(id).value));

    if(marks.some(m => m < 0 || m > 100)) {
        alert("Marks must be between 0 and 100");
        return;
    }

    let total = marks.reduce((a,b) => a+b, 0);
    let percentage = total / 5;
    let pass = marks.every(m => m >= 35);

    let grade = percentage >= 90 ? "A+" :
                percentage >= 80 ? "A" :
                percentage >= 70 ? "B" :
                percentage >= 60 ? "C" :
                percentage >= 50 ? "D" : "F";

    students.push({
        name, roll, total,
        percentage: percentage.toFixed(2),
        grade,
        status: pass ? "Pass" : "Fail"
    });

    localStorage.setItem("students", JSON.stringify(students));
    this.reset();
    display();
};

function display() {
    let search = document.getElementById("search").value.toLowerCase();

    let filtered = students.filter(s =>
        s.name.toLowerCase().includes(search) ||
        s.roll.toLowerCase().includes(search)
    );

    document.getElementById("records").innerHTML =
        filtered.map(s => `
        <tr>
            <td>${s.name}</td>
            <td>${s.roll}</td>
            <td>${s.total}/500</td>
            <td>${s.percentage}%</td>
            <td>${s.grade}</td>
            <td>${s.status}</td>
            <td><button onclick="removeStudent('${s.roll}')">Delete</button></td>
        </tr>`).join("");

    document.getElementById("total").innerText = students.length;
    document.getElementById("passed").innerText =
        students.filter(s => s.status === "Pass").length;
    document.getElementById("failed").innerText =
        students.filter(s => s.status === "Fail").length;
}

function removeStudent(roll) {
    students = students.filter(s => s.roll !== roll);
    localStorage.setItem("students", JSON.stringify(students));
    display();
}

display();
