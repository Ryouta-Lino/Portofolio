console.log('Admin script loaded'); // Tambahkan di awal file

// Admin login logic
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded'); // Debug
    const adminBtn = document.querySelector('#adminBtn');
    console.log('Admin button:', adminBtn); // Debug
    const adminModal = document.querySelector('#adminModal');
    const closeModal = document.querySelector('#closeModal');
    const loginForm = document.querySelector('#adminLoginForm');

    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            console.log('Admin button clicked'); // Debug
            adminModal.classList.remove('hidden');
            adminModal.classList.add('flex');
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            adminModal.classList.add('hidden');
            adminModal.classList.remove('flex');
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const username = document.querySelector('#adminUsername').value;
            const password = document.querySelector('#adminPassword').value;

            if (handleAdminLogin(username, password)) {
                adminModal.classList.add('hidden');
                adminModal.classList.remove('flex');
            } else {
                alert('Invalid credentials! Please try again.');
            }
        });
    }

    // Close modal when clicking outside
    if (adminModal) {
        adminModal.addEventListener('click', (e) => {
            if (e.target === adminModal) {
                adminModal.classList.add('hidden');
                adminModal.classList.remove('flex');
            }
        });
    }
});

function saveProjectData(projectData) {
    const editIndex = projectForm.dataset.editIndex;
    const timestamp = new Date().toISOString();
    
    // Add additional fields
    projectData.lastUpdated = timestamp;
    projectData.status = 'active';

    // Get existing projects
    let projects = JSON.parse(localStorage.getItem('projects')) || [];
    
    if (editIndex !== undefined) {
        projects[editIndex] = { ...projects[editIndex], ...projectData };
    } else {
        projects.push(projectData);
    }
    
    // Save to localStorage
    localStorage.setItem('projects', JSON.stringify(projects));
    
    // Update display
    displayProjects();
    updateStats();
}

function toggleProjectStatus(index) {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    if (projects[index]) {
        // Toggle status antara 'active' dan 'archived'
        projects[index].status = projects[index].status === 'active' ? 'archived' : 'active';
        projects[index].lastUpdated = new Date().toISOString();
        localStorage.setItem('projects', JSON.stringify(projects));
        
        // Update tampilan
        displayProjects();
        updateStats();
    }
}

// Function to handle project deletion with two-step verification
function deleteProject(index) {
    // First confirmation
    if (confirm('Are you sure you want to delete this project?')) {
        // Second confirmation with project title
        const projects = JSON.parse(localStorage.getItem('projects')) || [];
        const project = projects[index];
        const verificationPrompt = prompt(
            `Please type "${project.title}" to confirm deletion:`,
            ''
        );
        
        if (verificationPrompt === project.title) {
            projects.splice(index, 1);
            localStorage.setItem('projects', JSON.stringify(projects));
            saveProjects();
            displayProjects();
            showNotification('Project deleted successfully', 'success');
        } else if (verificationPrompt !== null) { // User entered wrong text
            showNotification('Project title did not match. Deletion cancelled.', 'error');
        }
        // If verificationPrompt is null, user clicked cancel, so do nothing
    }
}

function updateStats() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    
    // Update total projects
    const totalProjects = document.querySelector('#totalProjects');
    if (totalProjects) {
        totalProjects.textContent = projects.length;
    }
    
    // Update active projects
    const activeProjects = document.querySelector('#activeProjects');
    if (activeProjects) {
        activeProjects.textContent = projects.filter(p => p.status === 'active').length;
    }
    
    // Update last updated
    const lastUpdated = document.querySelector('#lastUpdated');
    if (lastUpdated && projects.length > 0) {
        const latestUpdate = new Date(Math.max(...projects.map(p => new Date(p.lastUpdated))));
        lastUpdated.textContent = latestUpdate.toLocaleDateString();
    }
}

function displayProjects() {
    const projects = JSON.parse(localStorage.getItem('projects')) || [];
    const searchTerm = document.querySelector('#searchProject')?.value.toLowerCase() || '';
    const filterValue = document.querySelector('#filterProjects')?.value || 'all';
    
    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.title.toLowerCase().includes(searchTerm) ||
                            project.description.toLowerCase().includes(searchTerm);
        const matchesFilter = filterValue === 'all' || project.status === filterValue;
        return matchesSearch && matchesFilter;
    });

    const projectsList = document.querySelector('#projectsList');
    if (projectsList) {
        projectsList.innerHTML = filteredProjects.map((project, index) => `
            <tr class="bg-white dark:bg-slate-800">
                <td class="px-6 py-4">
                    <div class="flex items-center">
                        <img src="${project.image}" alt="${project.title}" class="h-12 w-12 rounded object-cover mr-4">
                        <div>
                            <h4 class="font-semibold text-slate-900 dark:text-white">${project.title}</h4>
                            <p class="text-sm text-slate-500">${project.description}</p>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 text-sm rounded-full bg-slate-100 dark:bg-slate-700">
                        ${project.technologies}
                    </span>
                </td>
                <td class="px-6 py-4">
                    <span class="px-2 py-1 text-sm rounded-full ${
                        project.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                    }">
                        ${project.status}
                    </span>
                </td>
                <td class="px-6 py-4 text-sm text-slate-500">
                    ${new Date(project.lastUpdated).toLocaleDateString()}
                </td>
                <td class="px-6 py-4">
                    <div class="flex space-x-2">
                        <button onclick="editProject(${index})" class="text-blue-500 hover:text-blue-600">
                            <i class="fas fa-edit"></i>
                        </button>
                        <button onclick="toggleProjectStatus(${index})" 
                                class="${project.status === 'active' ? 'text-yellow-500 hover:text-yellow-600' : 'text-green-500 hover:text-green-600'}">
                            <i class="fas ${project.status === 'active' ? 'fa-archive' : 'fa-check'}"></i>
                        </button>
                        <button onclick="deleteProject(${index})" class="text-red-500 hover:text-red-600">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    // Update portfolio section if it exists
    const portfolioContainer = document.querySelector('#portfolioProjects');
    if (portfolioContainer) {
        const activeProjects = projects.filter(p => p.status === 'active');
        portfolioContainer.innerHTML = activeProjects.map(project => `
            <div class="mb-12 p-4 md:w-1/2 lg:w-1/3">
                <div class="rounded-md shadow-md overflow-hidden bg-white dark:bg-slate-700">
                    <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover">
                    <div class="py-8 px-6">
                        <h3 class="mb-3 font-semibold text-xl text-slate-900 dark:text-white truncate">
                            ${project.title}
                        </h3>
                        <p class="font-medium text-base text-slate-500 dark:text-slate-300 mb-4">
                            ${project.description}
                        </p>
                        <p class="font-medium text-sm text-teal-500 mb-4">
                            ${project.technologies}
                        </p>
                        ${project.url ? `
                        <a href="${project.url}" target="_blank" 
                           class="font-medium text-sm text-white bg-teal-500 py-2 px-4 rounded-lg hover:opacity-80">
                           View Project
                        </a>` : ''}
                    </div>
                </div>
            </div>
        `).join('');
    }
}

// Add this to ensure projects are loaded when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayProjects();
    updateStats();
});

// Pastikan fungsi-fungsi tersedia secara global
window.toggleProjectStatus = toggleProjectStatus;
window.deleteProject = deleteProject;
window.editProject = editProject;

// Admin Authentication
export function checkAdminAuth() {
    if (!localStorage.getItem('adminLoggedIn')) {
        window.location.href = 'index.html';
    }
}

// Admin Login
export function handleAdminLogin(username, password) {
    // Ganti dengan kredensial yang sesuai
    if (username === "admin" && password === "password123") {
        localStorage.setItem('adminLoggedIn', 'true');
        window.location.href = 'admin-dashboard.html';
        return true;
    }
    return false;
}

// Admin Logout
export function handleAdminLogout() {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = 'index.html';
}

// Function to update file input label
function updateFileLabel(input) {
    const fileName = input.files[0]?.name;
    const fileLabel = document.getElementById('selectedFileName');
    if (fileName) {
        fileLabel.textContent = fileName;
    } else {
        fileLabel.textContent = '';
    }
}

// Function to handle project actions
function handleProjectAction(actionType, projectId) {
    const actions = {
        edit: () => {
            // Edit logic
        },
        delete: () => {
            if (confirm('Are you sure you want to delete this project?')) {
                // Delete logic
            }
        },
        toggle: () => {
            // Toggle status logic
        }
    };

    if (actions[actionType]) {
        actions[actionType]();
    }
}

// Add some spacing to the table
document.addEventListener('DOMContentLoaded', () => {
    const table = document.querySelector('table');
    if (table) {
        table.classList.add('border-spacing-y-2', 'border-separate');
    }
});

// Function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 p-4 rounded-lg shadow-lg ${
        type === 'success' ? 'bg-green-500' : 
        type === 'error' ? 'bg-red-500' : 
        'bg-blue-500'
    } text-white`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
} 