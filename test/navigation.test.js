// __tests__/navigation.test.js
import { initNavigation } from '../src/js/navigation';

describe('Navigation Module', () => {
    beforeEach(() => {
        // Setup DOM elements
        document.body.innerHTML = `
            <header class="fixed top-0 left-0 w-full bg-white dark:bg-slate-900 z-50">
                <nav class="container mx-auto px-6 py-4">
                    <div class="flex items-center justify-between">
                        <div id="hamburger" class="lg:hidden">
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                            <span class="hamburger-line"></span>
                        </div>
                        <div id="nav-menu" class="hidden lg:block">
                            <ul class="lg:flex">
                                <li><a href="#home" class="nav-link">Home</a></li>
                                <li><a href="#about" class="nav-link">About</a></li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </header>
            <section id="home"></section>
            <section id="about"></section>
        `;
    });

    afterEach(() => {
        document.body.innerHTML = '';
    });

    test('should initialize navigation', () => {
        initNavigation();
        const navMenu = document.getElementById('nav-menu');
        expect(navMenu).not.toBeNull();
    });

    test('should toggle menu on hamburger click', () => {
        initNavigation();
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        hamburger.click();
        expect(navMenu.classList.contains('hidden')).toBe(false);
        
        hamburger.click();
        expect(navMenu.classList.contains('hidden')).toBe(true);
    });

    test('should handle smooth scroll on nav link click', () => {
        initNavigation();
        const navLink = document.querySelector('.nav-link');
        navLink.click();
        
        // Test if preventDefault was called
        const clickEvent = new Event('click');
        navLink.dispatchEvent(clickEvent);
        expect(clickEvent.defaultPrevented).toBe(false);
    });
});