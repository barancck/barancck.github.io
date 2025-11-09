document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Theme (Dark/Light Mode) Toggle ---

    const themeToggle = document.getElementById('theme-toggle');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    // Get saved theme from localStorage or detect system preference
    const getStoredTheme = () => localStorage.getItem('theme');
    const getPreferredTheme = () => {
        const storedTheme = getStoredTheme();
        if (storedTheme) {
            return storedTheme;
        }
        return systemPrefersDark.matches ? 'dark' : 'light';
    };

    // Set the theme on the <body>
    const setTheme = (theme) => {
        if (theme === 'dark') {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.setAttribute('data-theme', 'light');
        }
    };

    // Apply the theme on initial load
    let currentTheme = getPreferredTheme();
    setTheme(currentTheme);

    // Toggle theme on button click
    themeToggle.addEventListener('click', () => {
        currentTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        localStorage.setItem('theme', currentTheme);
        setTheme(currentTheme);
    });

    // Listen for changes in system preference
    systemPrefersDark.addEventListener('change', (e) => {
        const storedTheme = getStoredTheme();
        if (!storedTheme) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });


    // --- 2. Fade-in on Scroll Animation ---

    const fadeElements = document.querySelectorAll('.fade-in');

    // Create an observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: Stop observing after it's visible
                // observer.unobserve(entry.target); 
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    // Observe each element
    fadeElements.forEach(el => {
        observer.observe(el);
    });

});