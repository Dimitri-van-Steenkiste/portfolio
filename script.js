document.addEventListener("DOMContentLoaded", function () {
    let projectsData = [];

    function displayProjects(filter = "") {
        console.log("Displaying projects...");
        const dataDisplay = document.getElementById("projectsList");
        dataDisplay.innerHTML = ""; // Clear the previous list
    
        const filteredProjects = projectsData.filter(project => 
            project.name.toLowerCase().includes(filter.toLowerCase()) || 
            project.description.toLowerCase().includes(filter.toLowerCase()) || 
            project.tags.some(tag => tag.toLowerCase().includes(filter.toLowerCase()))
        );
    
        console.log("Filtered projects:", filteredProjects);
    
        filteredProjects.forEach(project => {
            const projectBox = document.createElement("div");
            projectBox.classList.add("project-box");
    
            projectBox.addEventListener("click", () => {
                window.open(project.link, '_blank');
            });
    
            // Add project image
            const projectImage = document.createElement("img");
            projectImage.classList.add("project-image");
            projectImage.src = project.image; // Add image path
            projectImage.alt = `${project.name} image`; // Alt text for accessibility
    
            const contentDiv = document.createElement("div");
            contentDiv.classList.add("content");
    
            const nameElement = document.createElement("h3");
            nameElement.textContent = project.name;
    
            const descriptionElement = document.createElement("p");
            descriptionElement.textContent = project.description;
    
            const tagsElement = document.createElement("p");
            tagsElement.classList.add("tags");
            tagsElement.textContent = project.tags.map(tag => '#' + tag).join(", ");
    
            contentDiv.appendChild(nameElement);
            contentDiv.appendChild(descriptionElement);
            contentDiv.appendChild(tagsElement);
    
            projectBox.appendChild(projectImage); // Append image
            projectBox.appendChild(contentDiv); // Append content (text)
    
            dataDisplay.appendChild(projectBox);
    
            setTimeout(() => {
                projectBox.classList.add("show-project");
            }, 100);
        });
    }
    
    

    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            projectsData = data;
            displayProjects();
        })
        .catch(error => {
            console.error("Error fetching JSON data:", error);
        });

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

    const placeholderOptions = {
        en: [
            "Search for one of my projects",
            "Type here to search my projects",
            "Looking for something specific? Search here",
            "Explore my projects by searching here",
            "Find what you're looking for by searching here",
            "Enter keywords to search my projects",
            "Discover my projects with a quick search",
            "Search through my projects easily here",
            "Search my portfolio for exciting projects",
            "Explore my work by searching here",
        ],
        fr: [
            "Rechercher l'un de mes projets",
            "Tapez ici pour chercher mes projets",
            "Vous cherchez quelque chose de spécifique ? Cherchez ici",
            "Entrez des mots-clés pour rechercher mes projets",
            "Découvrez mes projets avec une recherche rapide",
            "Recherchez facilement dans mes projets ici",
            "Parcourez mon portfolio à la recherche de projets passionnants",
            "Explorez mon travail en recherchant ici",
            "Trouvez le projet parfait avec une recherche rapide",
        ]
    };

    function getRandomPlaceholder(language) {
        const options = placeholderOptions[language];
        return options[Math.floor(Math.random() * options.length)];
    }

    function updatePlaceholder() {
        const currentLang = document.documentElement.lang || 'en';
        searchBox.setAttribute("placeholder", getRandomPlaceholder(currentLang));
    }

    updatePlaceholder();

    document.getElementById('language-switch').addEventListener('click', () => {
        const currentLang = document.documentElement.lang || 'en';
        const newLang = currentLang === 'en' ? 'fr' : 'en';
        document.documentElement.lang = newLang;

        const langButton = document.getElementById('language-switch');
        langButton.textContent = newLang === 'en' ? '🇫🇷' : '🇬🇧';

        if (newLang === 'fr') {
            document.querySelector('#resume').textContent = 'Curriculum Vitae';
            document.querySelector('#resume').href = 'resume_fr.html';
            document.querySelector('#bio p:nth-of-type(1)').textContent = 'Bonjour,';
            document.querySelector('#bio p:nth-of-type(2)').innerHTML = `
                Je m'appelle Dimitri van Steenkiste, je suis étudiant en BUT Informatique à l'<b><i>Université Polytechnique des Hauts-de-France</i></b>
                à Valenciennes, dans le Nord. Je suis passionné par le développement web, d'application et de jeux vidéo 🖥️. Je consacre mon énergie à divers projets,
                en particulier en Python 🐍. Quand je ne code pas, je fais aussi du jeux de rôle comme Donjons & Dragons 🎲, de l'impression 3D 🔧 et du soulever de poids 🏋🏻.
            `;
            document.querySelector('#bio p:nth-of-type(3)').innerHTML = 'Toujours à la recherche de nouveaux défis !';
            document.querySelector('#dataDisplay h2').textContent = 'Mes Projets';
        } else {
            document.querySelector('#resume').textContent = 'Resumé';
            document.querySelector('#resume').href = 'resume.html';
            document.querySelector('#bio p:nth-of-type(1)').textContent = 'Hello,';
            document.querySelector('#bio p:nth-of-type(2)').innerHTML = `
                I'm Dimitri van Steenkiste. I'm a Computer Science student 📚 at the <b><i>Université Polytechnique des Hauts-de-France</i></b>
                in Valencienne, France 🇫🇷. I'm passionate by web, app and video game developing 🖥️, I pour my energy into diverse projects, 
                particularly in Python 🐍. When I'm not coding, my other passions include immersing myself in tabletop roleplaying 
                games 🎲, tinkering with 3D printing 🔧, lifting iron at the gym 🏋🏻.
            `;
            document.querySelector('#bio p:nth-of-type(3)').innerHTML = 'Always seeking new adventures and challenges!';
            document.querySelector('#dataDisplay h2').textContent = 'My Projects';
        }

        updatePlaceholder();
    });
});
