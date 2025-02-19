// __tests__/navigation.test.js
import { toggleMenu, navigateTo } from '../src/js/navigation';

describe('Navigation Functions', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <nav id="nav-menu" class="hidden"></nav>
      <a href="#" id="home-link">Home</a>
    `;
  });

  test('should toggle menu visibility', () => {
    const navMenu = document.getElementById('nav-menu');
    toggleMenu();
    expect(navMenu.classList.contains('hidden')).toBe(false);
    toggleMenu();
    expect(navMenu.classList.contains('hidden')).toBe(true);
  });

  test('should navigate to home', () => {
    const homeLink = document.getElementById('home-link');
    navigateTo(homeLink);
    expect(window.location.hash).toBe('#home');
  });
});