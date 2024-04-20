document.addEventListener("DOMContentLoaded", function() {
    const totalCoursesElement = document.getElementById("totalCourses");
    const completedCoursesElement = document.getElementById("completedCourses");
    const checklist = document.getElementById("checklist");
    let totalCourses = 0;
    let completedCourses = 0;

    // Array of course objects with name and cover art path
    const courses = [
        { name: "Understand the basic principles of DevOps.", coverArt: "https://www.qiminfo.ch/wp-content/uploads/2023/05/The-DevOps-Lifecycle-1024x576.jpg" },
        { name: "Learn about version control systems like Git.", coverArt: "https://miro.medium.com/v2/resize:fit:1400/1*8IFGdEbbNOw-N7CCmEyysw.png" },
        { name: "Continuous Integration (CI) & Continuous Deployment (CD) practices.", coverArt: "https://www.servicenow.com/content/dam/servicenow-assets/public/en-us/images/company-library/what-is-pages/what-is-cicd.jpg.thumb.320.320.png" },
        { name: "Explore containerization with Docker.", coverArt: "https://d1.awsstatic.com/acs/characters/Logos/Docker-Logo_Horizontel_279x131.b8a5c41e56b77706656d61080f6a0217a3ba356d.png" },
        { name: "Learn about infrastructure as code (IaC) using tools like Terraform.", coverArt: "https://www.stonebranch.com/integration-hub/media/e9/06/de/1656341332/Terraform_Product_Vendor_Logo.svg" },
        { name: "Understand configuration management with tools like Ansible or Chef.", coverArt: "https://www.freecodecamp.org/news/content/images/2021/09/ansble.png" },
        { name: "Explore monitoring and logging solutions.", coverArt: "https://framr.tv/wp-content/uploads/2022/07/was-ist-monitoring.jpg" },
        { name: "Practice collaboration and communication within DevOps teams.", coverArt: "https://media.licdn.com/dms/image/D4D12AQFr7TrIiWCAfQ/article-cover_image-shrink_600_2000/0/1687974612505?e=2147483647&v=beta&t=9tiIKlXNUvP7hGPTS2tk-pvbwBW9_qeMd3lWnWIO3TU" }
    ];

   // Function to create course item
   function createCourseItem(course) {
    const listItem = document.createElement("li");
    const checkboxId = "check" + (totalCourses + 1);
    listItem.innerHTML = `
        <input type="checkbox" id="${checkboxId}">
        <label for="${checkboxId}">
            <img src="${course.coverArt}" alt="${course.name}" class="cover-art">
            ${course.name}
        </label>
    `;
    checklist.appendChild(listItem);
    totalCourses++;
    totalCoursesElement.textContent = totalCourses;
}

// Create course items from the array
courses.forEach(course => {
    createCourseItem(course);
});

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
