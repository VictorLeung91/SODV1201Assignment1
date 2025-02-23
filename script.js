/*
* @name: Assignement1
* @Course Code: SODV1201
* @class: Software Development Diploma program.
* @author: Victor Leung
*/
$(document).ready(function() {

    //AJAX content loading.
    $("#navbar-js").load("navbar.html");
    $("#footer-js").load("footer.html", function() {
        // Update date.
            let currentYear = new Date().getFullYear();
            $("#footer-date").text(`© 2025 - ${currentYear} Victor Leung`);
        });

    //Index.html, show my picture description after 10secs
    setTimeout(function() {
        $("#pic-name").show();
    }, 10000);

    //Grade.html, coverter function
    $("#convert-btn").click(function() {
        const mark = $("#mark-input-box").val();
        MarkToGrade(mark);
    });
    
    function MarkToGrade(mark) {
        let message = $("#validation-message");
        let result = $("#grade-result");
        message.text("");
        result.text("");

            let numMark = parseInt(mark);
            if (isNaN(numMark)) {
                message.text("Please enter a valid number.");
            } else if (numMark < 0) {
                message.text("Mark cannot be negative.");
            } else if (numMark > 100) {
                message.text("Mark must be less than or equal to 100.");
            } else {
                if (numMark > 90) result.text("Grade: A");
                else if (numMark > 80) result.text("Grade: B");
                else if (numMark > 70) result.text("Grade: C");
                else if (numMark > 50) result.text("Grade: D");
                else result.text("Grade: F");
            }
    }

    // Staff.html, sort staff list
    let staffData = [];

    // Input staff.txt
    $.get("staff.txt", function(data) {
        eval(data);
        staffData = dataSet.map(item => ({
            name: item[0],
            position: item[1],
            placeOfBirth: item[2],
            staffNumber: item[3],
            hireDate: item[4],
            salary: parseFloat(item[5].replace(/[$,]/g, ''))
        }));
        
        //Display data
        displayStaff(staffData);
    }).fail(function() {
        console.log("Failed to load staff.txt");
    });

    function displayStaff(staff) {
        $("#staff-list").empty();
        $.each(staff, function(index, staff) {
            $("#staff-list").append(
                `<tr>
                <td>${staff.name}</td>
                <td>${staff.position}</td>
                <td>${staff.placeOfBirth}</td>
                <td>${staff.staffNumber}</td>
                <td>${staff.hireDate}</td>
                <td>$${staff.salary.toLocaleString()}</td>
                </tr>`
            );
        });
    }

    //Sort button function
    $("#sort-name-btnAZ").click(function() {
        staffData.sort((a, b) => a.name.localeCompare(b.name));
        displayStaff(staffData);
    });

    $("#sort-name-btnZA").click(function() {
        staffData.sort((a, b) => b.name.localeCompare(a.name));
        displayStaff(staffData);
    });

    $("#sort-salary-btnAS").click(function() {
        staffData.sort((a, b) => a.salary - b.salary);
        displayStaff(staffData);
    });

    $("#sort-salary-btnDES").click(function() {
        staffData.sort((a, b) => b.salary - a.salary);
        displayStaff(staffData);
    });


    // Named function for Celsius conversion
    $("#to-celsius-btn").click(function() {
        const fahrenheit = $("#temp-input").val();
        convertToCelsius(fahrenheit);
    });

    function convertToCelsius(fahrenheit) {
        let celsius = (parseFloat(fahrenheit) - 32) * 5 / 9;
        $("#temp-result").text(`Celsius: ${celsius.toFixed(2)} °C`);
    }

    
    // Anonymous function for Kelvin conversion
    $("#to-kelvin-btn").click(function() {
        let fahrenheit = parseFloat($("#temp-input").val());
        let celsius = (fahrenheit - 32) * 5 / 9;
        let kelvin = celsius + 273.15;
        $("#temp-result").text(`Kelvin: ${kelvin.toFixed(2)} K`);
    });
});