export const initDarkMode = () => {
  const darkToggle = document.querySelector('#darkToggle');
  const html = document.querySelector('html');

  const toggleDarkMode = () => {
    html.classList.toggle('dark');
    localStorage.theme = html.classList.contains('dark') ? 'dark' : 'light';
  };

  // Initialize
  if (localStorage.theme === 'dark' || (!localStorage.theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    html.classList.add('dark');
  }

  darkToggle.addEventListener('click', toggleDarkMode);
}; 