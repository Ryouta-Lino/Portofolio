import { checkAdminAuth } from './admin.js';

// Check authentication when page loads
document.addEventListener('DOMContentLoaded', () => {
    checkAdminAuth();
});

// Initialize dashboard features
export function initDashboard() {
    // Projects management
    displayProjects();
    
    // Skills management
    displaySkills();
    
    // Event listeners
    setupEventListeners();
}

function setupEventListeners() {
    // Add your event listeners here
    document.querySelector('#backupBtn').addEventListener('click', handleBackup);
    document.querySelector('#logoutBtn').addEventListener('click', handleLogout);
    // ... other listeners
} 