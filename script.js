document.addEventListener("DOMContentLoaded", function() {
    const totalCoursesElement = document.getElementById("totalCourses");
    const completedCoursesElement = document.getElementById("completedCourses");
    const checklist = document.getElementById("checklist");
    const quizQuestionsContainer = document.getElementById("quizQuestions");
    let totalCourses = 0;
    let completedCourses = 0;
    let displayedQuestions = 2; // Number of questions initially displayed

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
        listItem.innerHTML = `
            <img src="${course.coverArt}" alt="${course.name}" class="cover-art">
            <span>${course.name}</span>
        `;
        checklist.appendChild(listItem);
        totalCourses++;
        totalCoursesElement.textContent = totalCourses;
    }

    // Create course items from the array
    courses.forEach(course => {
        createCourseItem(course);
    });

    // Function to fetch quiz questions from the Open Trivia Database API
    function fetchQuizQuestions() {
        const apiUrl = "https://opentdb.com/api.php?amount=10&type=multiple"; // Fetch 10 questions initially
        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                if (data.results) {
                    displayQuizQuestions(data.results.slice(0, displayedQuestions)); // Display only the first two questions initially
                } else {
                    console.error("Error: No results found.");
                }
            })
            .catch(error => console.error("Error fetching quiz questions:", error));
    }

    // Function to display quiz questions on the page
    function displayQuizQuestions(questions) {
        questions.forEach((question, index) => {
            const questionElement = document.createElement("div");
            questionElement.classList.add("question");
            questionElement.innerHTML = `
                <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
                <ul>
                    ${question.incorrect_answers.map(answer => `<li>${answer}</li>`).join("")}
                    <li>${question.correct_answer}</li>
                </ul>
            `;
            quizQuestionsContainer.appendChild(questionElement);
        });
    }

    // Fetch quiz questions when the page loads
    fetchQuizQuestions();

    // Load more questions when needed
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", function() {
            displayedQuestions += 2; // Increase the number of displayed questions by 2
            fetchQuizQuestions(); // Fetch more questions
        });
    }
});
