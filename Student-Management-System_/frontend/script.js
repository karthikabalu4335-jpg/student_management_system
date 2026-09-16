const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");

const API_URL = "http://127.0.0.1:8000/api/students/";


function loadStudents() {

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {

            studentList.innerHTML = "";

            data.forEach(student => {

                const row = document.createElement("tr");

                row.innerHTML = `
                    <td>${student.name}</td>
                    <td>${student.register_number}</td>
                    <td>${student.email}</td>
                    <td>${student.department}</td>
                    <td>${student.year}</td>
                    <td>
                        <button onclick="deleteStudent(${student.id})">
                            Delete
                        </button>
                    </td>
                `;

                studentList.appendChild(row);

            });

        })
        .catch(error => {
            console.error("Error loading students:", error);
        });
}


form.addEventListener("submit", function(event) {

    event.preventDefault();

    const student = {

        name: document.getElementById("name").value,

        register_number:
            document.getElementById("register_number").value,

        email:
            document.getElementById("email").value,

        department:
            document.getElementById("department").value,

        year:
            Number(document.getElementById("year").value)
    };


    fetch(API_URL, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(student)

    })

    .then(response => {

        if (!response.ok) {
            throw new Error("Failed to add student");
        }

        return response.json();

    })

    .then(data => {

        alert("Student added successfully!");

        form.reset();

        loadStudents();

    })

    .catch(error => {

        console.error("Error:", error);

        alert("Something went wrong!");

    });

});


function deleteStudent(id) {

    fetch(`${API_URL}${id}/`, {

        method: "DELETE"

    })

    .then(response => {

        if (response.ok) {

            alert("Student deleted successfully!");

            loadStudents();

        } else {

            alert("Delete failed!");

        }

    })

    .catch(error => {

        console.error("Error:", error);

    });
}


// Load students when page opens
loadStudents();