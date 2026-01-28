const content_dir = 'contents/'
const blog_dir = 'contents/blogs/'
const config_file = 'config.yml'
const blogs_config = 'blogs.yml'
const pubs_config = 'publications.yml'
const section_names = ['home', 'awards', 'experience'];


window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });


    // Yaml
    fetch(content_dir + config_file)
        .then(response => response.text())
        .then(text => {
            const yml = jsyaml.load(text);
            Object.keys(yml).forEach(key => {
                try {
                    document.getElementById(key).innerHTML = yml[key];
                } catch {
                    console.log("Unknown id and value: " + key + "," + yml[key].toString())
                }

            })
        })
        .catch(error => console.log(error));


    // Marked
    marked.use({ mangle: false, headerIds: false })
    section_names.forEach((name, idx) => {
        fetch(content_dir + name + '.md')
            .then(response => response.text())
            .then(markdown => {
                const html = marked.parse(markdown);
                document.getElementById(name + '-md').innerHTML = html;
            }).then(() => {
                // MathJax
                MathJax.typeset();
            })
            .catch(error => console.log(error));
    })

    // Blog Logic
    fetch(content_dir + blogs_config)
        .then(response => response.text())
        .then(text => {
            const blogs = jsyaml.load(text);
            const listContainer = document.getElementById('blog-list');
            if (!listContainer) return;
            
            let listHtml = '<ul class="list-unstyled">';
            blogs.forEach(blog => {
                listHtml += `
                    <li class="mb-4">
                        <div class="text-muted small">${blog.date}</div>
                        <a href="javascript:void(0)" class="h4 text-decoration-none" style="color: var(--h-title-color);" onclick="loadBlogPost('${blog.file}')">${blog.title}</a>
                        <p class="text-muted mt-2" style="font-size: 1rem; line-height: 1.5rem;">${blog.description || ''}</p>
                    </li>`;
            });
            listHtml += '</ul>';
            listContainer.innerHTML = listHtml;
        })
        .catch(error => console.log("No blogs.yml found or error loading blogs"));

    // Publications Logic
    let allPublications = [];
    fetch(content_dir + pubs_config)
        .then(response => response.text())
        .then(text => {
            allPublications = jsyaml.load(text);
            renderPublications(allPublications);
        })
        .catch(error => console.log("No publications.yml found"));

});

// Global functions for publications
window.renderPublications = function(pubs) {
    const container = document.getElementById('publications-container');
    if (!container) return;
    
    let html = '';
    pubs.forEach(pub => {
        const linksHtml = Object.keys(pub.links || {}).map(key => 
            `<a href="${pub.links[key]}" target="_blank" class="me-2 text-decoration-none">[${key}]</a>`
        ).join('');

        html += `
            <div class="pub-card mb-4 p-3 border rounded shadow-sm d-flex flex-column flex-md-row align-items-center align-items-md-start">
                <div class="pub-image me-md-4 mb-3 mb-md-0">
                    <img src="${pub.image}" class="img-fluid rounded" style="width: 240px; height: 140px; object-fit: cover;">
                </div>
                <div class="pub-info flex-grow-1">
                    <h5 class="fw-bold mb-1">${pub.title}</h5>
                    <div class="pub-authors mb-1" style="font-size: 0.95rem;">${pub.authors}</div>
                    <div class="pub-venue mb-2 fw-bold" style="color: #5d69e5;">${pub.venue}</div>
                    <div class="pub-description mb-2 text-muted" style="font-size: 0.9rem; line-height: 1.4;">${pub.description}</div>
                    <div class="pub-links" style="font-size: 0.9rem;">${linksHtml}</div>
                </div>
            </div>`;
    });
    container.innerHTML = html;
}

window.filterPublications = function(type) {
    const btnAll = document.getElementById('pub-filter-all');
    const btnSelected = document.getElementById('pub-filter-selected');
    
    if (type === 'all') {
        btnAll.className = 'btn btn-primary btn-sm rounded-pill px-3 me-2';
        btnSelected.className = 'btn btn-outline-secondary btn-sm rounded-pill px-3';
        fetch('contents/publications.yml').then(r => r.text()).then(t => renderPublications(jsyaml.load(t)));
    } else {
        btnSelected.className = 'btn btn-primary btn-sm rounded-pill px-3 me-2';
        btnAll.className = 'btn btn-outline-secondary btn-sm rounded-pill px-3';
        fetch('contents/publications.yml').then(r => r.text()).then(t => {
            const pubs = jsyaml.load(t);
            renderPublications(pubs.filter(p => p.selected));
        });
    }
}

// Global functions for blog navigation
window.loadBlogPost = function (filename) {
    fetch(blog_dir + filename)
        .then(response => response.text())
        .then(markdown => {
            const html = marked.parse(markdown);
            document.getElementById('blog-content').innerHTML = html;
            document.getElementById('blog-list').style.display = 'none';
            document.getElementById('blog-content').style.display = 'block';
            document.getElementById('back-to-blog-list').style.display = 'block';
            // Scroll to blog section
            document.getElementById('blog').scrollIntoView();
            // Typeset MathJax if any
            if (window.MathJax) MathJax.typeset();
        })
        .catch(error => console.error("Error loading blog post:", error));
}

window.showBlogList = function () {
    document.getElementById('blog-list').style.display = 'block';
    document.getElementById('blog-content').style.display = 'none';
    document.getElementById('back-to-blog-list').style.display = 'none';
    document.getElementById('blog').scrollIntoView();
}