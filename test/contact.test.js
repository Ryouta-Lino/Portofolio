import { initContact, handleSubmit } from '../src/js/contact';

describe('Contact Module', () => {
    beforeEach(() => {
        document.body.innerHTML = `
            <form id="contactForm">
                <input type="text" id="name" required>
                <input type="email" id="email" required>
                <textarea id="message" required></textarea>
                <button type="submit">Send</button>
            </form>
        `;

        // Mock fetch
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ success: true })
            })
        );
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.clearAllMocks();
    });

    test('should initialize contact form', () => {
        initContact();
        const form = document.getElementById('contactForm');
        expect(form).not.toBeNull();
    });

    test('should handle form submission', async () => {
        initContact();
        const form = document.getElementById('contactForm');
        
        // Fill form
        document.getElementById('name').value = 'Test User';
        document.getElementById('email').value = 'test@example.com';
        document.getElementById('message').value = 'Test message';

        // Submit form
        const submitEvent = new Event('submit');
        form.dispatchEvent(submitEvent);

        // Wait for async operations
        await new Promise(resolve => setTimeout(resolve, 0));

        expect(fetch).toHaveBeenCalled();
    });
}); 