document.addEventListener("DOMContentLoaded", function () {
    let projectsData = [];

    function displayProjects(filter = "") {
        const dataDisplay = document.getElementById("projectsList");
        dataDisplay.innerHTML = "";

        const filteredProjects = projectsData.filter(project => 
            project.name.toLowerCase().includes(filter.toLowerCase()) || 
            project.description.toLowerCase().includes(filter.toLowerCase()) || 
            project.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
        );

        filteredProjects.forEach(project => {
            const projectBox = document.createElement("div");
            projectBox.classList.add("project-box");

            projectBox.addEventListener("click", () => {
                window.open(project.link, '_blank');
            });

            const nameElement = document.createElement("h3");
            nameElement.textContent = project.name;

            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = project.description;

            const tagsElement = document.createElement("p");
            tagsElement.classList.add("tags");
            tagsElement.textContent = project.tags.map(tag => '#' + tag).join(", ");

            projectBox.appendChild(nameElement);
            projectBox.appendChild(descriptionElement);
            projectBox.appendChild(tagsElement);

            dataDisplay.appendChild(projectBox);
        });
    }

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            projectsData = data;
            displayProjects();
        })
        .catch(error => console.error("Error fetching JSON data:", error));

    const searchBox = document.getElementById("search-box");
    searchBox.addEventListener("input", (event) => {
        const searchTerm = event.target.value;
        displayProjects(searchTerm);
    });

    const gotoTopButton = document.getElementById("gotoTop");
    window.addEventListener("scroll", function () {
        if (window.scrollY > 200) {
            gotoTopButton.style.display = "block";
        } else {
            gotoTopButton.style.display = "none";
        }
    });

    gotoTopButton.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});

function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function showProjectsOnScroll() {
    const projects = document.querySelectorAll('.project-box');
    projects.forEach(project => {
        if (isInViewport(project)) {
            project.classList.add('show-project');
        }
    });
}

window.addEventListener('scroll', showProjectsOnScroll);
showProjectsOnScroll();

document.addEventListener("DOMContentLoaded", function () {
    const placeholderOptions = [
        "Search for one of my projects",
        "Type here to search my projects",
        "Looking for something specific? Search here",
        "Explore my projects by searching here",
        "Find what you're looking for by searching here",
        "Enter keywords to search my projects",
        "Discover my projects with a quick search",
        "Search through my projects easily here",
        "Looking for inspiration? Search my projects",
        "Find projects tailored to your interests",
        "Get started by searching my projects",
        "Search my portfolio for exciting projects",
        "Explore my work by searching here",
        "Find the perfect project with a quick search",
        "Start your journey through my projects by searching here"
    ];

    function getRandomPlaceholder() {
        return placeholderOptions[Math.floor(Math.random() * placeholderOptions.length)];
    }

    const searchBox = document.getElementById("search-box");
    searchBox.setAttribute("placeholder", getRandomPlaceholder());
});
