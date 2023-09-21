
//   const firebaseConfig = {
//     apiKey: "AIzaSyDjGS97WEm6Y3B-YDAsyCO650DdMiSoLbA",
//     authDomain: "ku-cse-fest-23.firebaseapp.com",
//     databaseURL: "https://ku-cse-fest-23-default-rtdb.firebaseio.com",
//     projectId: "ku-cse-fest-23",
//     storageBucket: "ku-cse-fest-23.appspot.com",
//     messagingSenderId: "680079040681",
//     appId: "1:680079040681:web:42d1efb5c1f8ba022889b8",
//     measurementId: "G-G1P8H08P8C"
//   };


//  app.initializeApp(firebaseConfig);
//  constapp.database().ref('')



const firebaseConfig = {
    
    
        apiKey: "AIzaSyDjGS97WEm6Y3B-YDAsyCO650DdMiSoLbA",
        authDomain: "ku-cse-fest-23.firebaseapp.com",
        databaseURL: "https://ku-cse-fest-23-default-rtdb.firebaseio.com",
        projectId: "ku-cse-fest-23",
        storageBucket: "ku-cse-fest-23.appspot.com",
        messagingSenderId: "680079040681",
        appId: "1:680079040681:web:42d1efb5c1f8ba022889b8",
        measurementId: "G-G1P8H08P8C"
    


  };
  firebase.initializeApp(firebaseConfig);

        var registrationDB = firebase.database().ref("registrationForm");

        document.getElementById("registration-form").addEventListener("submit", submitForm);

        function submitForm(e) {
            e.preventDefault();

            var teamName = getElementVal("team_name");
            var universityName = getElementVal("university_name");
            var studentNames = getStudentNames();
            var studentRolls = getStudentRolls();
            var studentTshirtSizes = getStudentTshirtSizes();

            saveRegistration(teamName, universityName, studentNames, studentRolls, studentTshirtSizes);

            document.querySelector(".alert").style.display = "block";

            // Remove the alert after 3 seconds
            setTimeout(() => {
                document.querySelector(".alert").style.display = "none";
            }, 3000);

            // Reset the form
            document.getElementById("registration-form").reset();
        }

        const saveRegistration = (teamName, universityName, studentNames, studentRolls, studentTshirtSizes) => {
            var newRegistration = registrationDB.push();

            newRegistration.set({
                teamName: teamName,
                universityName: universityName,
                studentNames: studentNames,
                studentRolls: studentRolls,
                studentTshirtSizes: studentTshirtSizes
            });
        }

        const getElementVal = (id) => {
            return document.querySelector(`[name="${id}"]`).value;
        };

        function getStudentNames() {
            var studentNameInputs = document.querySelectorAll('[name^="student_name"]');
            return Array.from(studentNameInputs).map(input => input.value);
        }

        function getStudentRolls() {
            var studentRollInputs = document.querySelectorAll('[name^="student_roll"]');
            return Array.from(studentRollInputs).map(input => input.value);
        }

        function getStudentTshirtSizes() {
            var studentTshirtInputs = document.querySelectorAll('[name^="student_tshirt"]');
            return Array.from(studentTshirtInputs).map(input => input.value);
        }

        function addStudent() {
            var studentFields = document.getElementById('student-fields');
            var newStudentField = document.createElement('div');
            newStudentField.innerHTML = `
                <div class="student-input">
                    <input type="text" class="login-input" name="student_name[]" placeholder="Student Name" required />
                    <input type="text" class="login-input" name="student_roll[]" placeholder="Roll Number" required />
                    <input type="text" class="login-input" name="student_tshirt[]" placeholder="T-shirt Size" required />
                </div>
                <div class="add-remove-buttons">
                    <button type="button" onclick="addStudent()">Add</button>
                    <button type="button" onclick="removeStudent(this)">Remove</button>
                </div>
            `;
            studentFields.appendChild(newStudentField);
        }

        // JavaScript function to remove a student field
        function removeStudent(button) {
            var studentFields = document.getElementById('student-fields');
            studentFields.removeChild(button.parentNode.parentNode);
        }