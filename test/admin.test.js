import { checkAdminAuth, handleAdminLogout } from '../src/js/admin';

describe('Admin Module', () => {
  beforeEach(() => {
    // Setup DOM elements
    document.body.innerHTML = `
      <div id="adminBtn"></div>
      <div id="adminModal" class="hidden">
        <form id="adminLoginForm">
          <input id="adminUsername" type="text">
          <input id="adminPassword" type="password">
        </form>
      </div>
      <div id="messagesList"></div>
    `;
    localStorage.clear();
  });

  afterEach(() => {
    document.body.innerHTML = '';
    localStorage.clear();
  });

  test('should authenticate admin with correct credentials', () => {
    localStorage.setItem('adminLoggedIn', 'true');
    expect(checkAdminAuth()).toBe(true);
  });

  test('should not authenticate admin without credentials', () => {
    expect(checkAdminAuth()).toBe(false);
  });

  test('should handle admin logout', () => {
    localStorage.setItem('adminLoggedIn', 'true');
    handleAdminLogout();
    expect(localStorage.getItem('adminLoggedIn')).toBeNull();
  });
});
