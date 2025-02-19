import { initPortfolio } from '../src/js/portfolio';

describe('Portfolio Functions', () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <section id="portfolio" class="section-padding bg-slate-100 dark:bg-slate-800">
        <div class="container mx-auto">
          <div id="portfolioProjects" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          </div>
        </div>
      </section>
    `;

    const mockProjects = [
      {
        id: 1,
        title: 'Project 1',
        description: 'Description 1',
        image: 'image1.jpg',
        technologies: 'HTML, CSS, JavaScript',
        status: 'active'
      },
      {
        id: 2,
        title: 'Project 2',
        description: 'Description 2',
        image: 'image2.jpg',
        technologies: 'React, Node.js',
        status: 'active'
      }
    ];
    localStorage.setItem('projects', JSON.stringify(mockProjects));
  });

  afterEach(() => {
    localStorage.clear();
    document.body.innerHTML = '';
  });

  test('should initialize portfolio section', () => {
    initPortfolio();

    const projectElements = document.querySelectorAll('#portfolioProjects .project-card');
    expect(projectElements.length).toBe(2);
  });

  test('should render project with correct content', () => {
    initPortfolio();

    const firstProject = document.querySelector('#portfolioProjects .project-card');
    expect(firstProject).not.toBeNull();
    expect(firstProject.querySelector('h3').textContent).toBe('Project 1');
    expect(firstProject.querySelector('p').textContent).toBe('Description 1');
  });

  test('should filter inactive projects', () => {
    const mixedProjects = [
      {
        id: 1,
        title: 'Active Project',
        description: 'Description',
        image: 'image1.jpg',
        technologies: 'HTML, CSS',
        status: 'active'
      },
      {
        id: 2,
        title: 'Inactive Project',
        description: 'Description',
        image: 'image2.jpg',
        technologies: 'JavaScript',
        status: 'inactive'
      }
    ];
    localStorage.setItem('projects', JSON.stringify(mixedProjects));

    initPortfolio();

    const projectElements = document.querySelectorAll('#portfolioProjects .project-card');
    expect(projectElements.length).toBe(1);
    expect(projectElements[0].querySelector('h3').textContent).toBe('Active Project');
  });
}); 