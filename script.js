document.addEventListener("DOMContentLoaded", function() {
    const totalCoursesElement = document.getElementById("totalCourses");
    const completedCoursesElement = document.getElementById("completedCourses");
    const checklist = document.getElementById("checklist");
    let totalCourses = 0;
    let completedCourses = 0;

    function updateCourseCount() {
        totalCoursesElement.textContent = totalCourses;
        completedCoursesElement.textContent = completedCourses;
    }

    function createCourseItem(courseName) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <input type="checkbox" id="course${totalCourses}" data-course="${courseName}">
            <label for="course${totalCourses}">${courseName}</label>
        `;
        checklist.appendChild(listItem);
        totalCourses++;
        updateCourseCount();
    }

    function completeCourse(courseId) {
        const courseCheckbox = document.getElementById(courseId);
        if (courseCheckbox) {
            courseCheckbox.checked = true;
            completedCourses++;
            updateCourseCount();
        }
    }

    function resetChecklist() {
        const courseCheckboxes = checklist.querySelectorAll("input[type='checkbox']");
        courseCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        completedCourses = 0;
        updateCourseCount();
    }

    // Add Course button event listener
    document.getElementById("addCourseBtn").addEventListener("click", function() {
        const courseName = prompt("Enter the name of the course:");
        if (courseName) {
            createCourseItem(courseName);
        }
    });

    // Complete Course button event listener
    document.getElementById("completeCourseBtn").addEventListener("click", function() {
        const courseId = prompt("Enter the ID of the course to mark as completed:");
        if (courseId) {
            completeCourse(courseId);
        }
    });

    // Reset button event listener
    document.getElementById("resetBtn").addEventListener("click", function() {
        if (confirm("Are you sure you want to reset the checklist?")) {
            resetChecklist();
        }
    });
});
