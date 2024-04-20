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
        totalCourses++; // Increment total courses count
        totalCoursesElement.textContent = totalCourses; // Update total courses count display
    }

    function completeCourse(courseId) {
        const courseCheckbox = document.getElementById(courseId);
        if (courseCheckbox) {
            courseCheckbox.checked = true;
            completedCourses++;
            updateCourseCount();
        } else {
            console.error(`Course checkbox with ID "${courseId}" not found.`);
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
    const addCourseBtn = document.getElementById("addCourseBtn");
    if (addCourseBtn) {
        addCourseBtn.addEventListener("click", function() {
            const courseName = prompt("Enter the name of the course:");
            if (courseName) {
                createCourseItem(courseName);
            }
        });
    } else {
        console.error("Add Course button not found.");
    }

    // Complete Course button event listener
    const completeCourseBtn = document.getElementById("completeCourseBtn");
    if (completeCourseBtn) {
        completeCourseBtn.addEventListener("click", function() {
            const courseId = prompt("Enter the ID of the course to mark as completed:");
            if (courseId) {
                completeCourse(courseId);
            }
        });
    } else {
        console.error("Complete Course button not found.");
    }

    // Reset button event listener
    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) {
        resetBtn.addEventListener("click", function() {
            if (confirm("Are you sure you want to reset the checklist?")) {
                resetChecklist();
            }
        });
    } else {
        console.error("Reset button not found.");
    }
});
