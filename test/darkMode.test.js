import { initDarkMode, toggleDarkMode } from '../src/js/darkMode';

describe('Dark Mode Module', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <div id="dark-toggle" class="cursor-pointer">
                <i class="fas fa-moon"></i>
            </div>
        `;
        localStorage.clear();
    });

    afterEach(() => {
        document.body.innerHTML = '';
        localStorage.clear();
    });

    test('should initialize dark mode from localStorage', () => {
        localStorage.setItem('darkMode', 'true');
        initDarkMode();
        expect(document.documentElement.classList.contains('dark')).toBe(true);
    });

    test('should toggle dark mode', () => {
        initDarkMode();
        const darkToggle = document.getElementById('dark-toggle');
        
        darkToggle.click();
        expect(document.documentElement.classList.contains('dark')).toBe(true);
        
        darkToggle.click();
        expect(document.documentElement.classList.contains('dark')).toBe(false);
    });
}); 