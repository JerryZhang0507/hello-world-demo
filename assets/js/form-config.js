// Cinray Metal Contact Form Configuration
// === SETUP INSTRUCTIONS ===
// 1. Go to https://formspree.io/ and sign up for a free account
// 2. Create a new form named "cinray-contact"
// 3. Copy your form endpoint URL (looks like https://formspree.io/f/xxxxxxxx)
// 4. Replace YOUR_FORM_ID below with the actual ID
// 5. The free plan allows 50 submissions/month

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID';

// Contact form handler (will be used by contact.html)
function getFormEndpoint() {
    if (FORMSPREE_ENDPOINT.includes('YOUR_FORM_ID')) {
        console.warn('Formspree endpoint not configured. Please update YOUR_FORM_ID in assets/js/form-config.js');
    }
    return FORMSPREE_ENDPOINT;
}
