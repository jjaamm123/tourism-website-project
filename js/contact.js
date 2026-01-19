
document.addEventListener('DOMContentLoaded', function() {

    document.getElementById('_timestamp').value = new Date().toISOString();
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzUFSNF6wK1SLvMeUQbEhVnv5YZLgqePUYqnz0OGaGA78Lqjc_A4_lOWnAw1WJlYt3z/exec';

    
    const form = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    const btnText = submitBtn.querySelector('.btn-text');
    const spinner = submitBtn.querySelector('.spinner');
    const formStatus = document.getElementById('form-status');
    

    function showError(fieldId, message) {
        const errorDiv = document.getElementById(fieldId + '-error');
        if (errorDiv) {
            errorDiv.textContent = message;
            errorDiv.style.display = 'block';
        }
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = '#dc2626';
            field.classList.add('error');
        }
    }
    

    function clearError(fieldId) {
        const errorDiv = document.getElementById(fieldId + '-error');
        if (errorDiv) {
            errorDiv.textContent = '';
            errorDiv.style.display = 'none';
        }
        const field = document.getElementById(fieldId);
        if (field) {
            field.style.borderColor = '';
            field.classList.remove('error');
        }
    }
    

    function showStatus(message, isError = false) {
        formStatus.textContent = message;
        formStatus.className = 'form-status ' + (isError ? 'error' : 'success');
        formStatus.style.display = 'block';
        

        formStatus.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        

        if (!isError) {
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 8000);
        }
    }
    

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
    

    function validatePhone(phone) {
        if (!phone || phone.trim() === '') return true; 
        const cleaned = phone.replace(/[\s\-\(\)\.\+]/g, '');
        return /^\d+$/.test(cleaned) && cleaned.length >= 7;
    }
    

    document.getElementById('email')?.addEventListener('blur', function() {
        if (this.value && !validateEmail(this.value)) {
            showError('email', 'Please enter a valid email address');
        } else {
            clearError('email');
        }
    });
    
    document.getElementById('phone')?.addEventListener('blur', function() {
        if (this.value && !validatePhone(this.value)) {
            showError('phone', 'Please enter a valid phone number');
        } else {
            clearError('phone');
        }
    });
    
    document.getElementById('name')?.addEventListener('blur', function() {
        if (!this.value.trim()) {
            showError('name', 'Name is required');
        } else {
            clearError('name');
        }
    });
    
    document.getElementById('message')?.addEventListener('blur', function() {
        if (!this.value.trim()) {
            showError('message', 'Message is required');
        } else if (this.value.trim().length < 10) {
            showError('message', 'Please provide more details (minimum 10 characters)');
        } else {
            clearError('message');
        }
    });
    

    const inputs = form.querySelectorAll('input, textarea, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            clearError(this.id);
        });
    });
    

    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        

        formStatus.style.display = 'none';
        

        let isValid = true;
        

        const honeypot = document.getElementById('_honeypot').value;
        if (honeypot && honeypot.trim() !== '') {

            showStatus('Thank you for your message! We\'ll respond soon.', false);
            form.reset();
            document.getElementById('_timestamp').value = new Date().toISOString();
            return;
        }
        

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        const isHuman = document.getElementById('human-check').checked;
        
        if (!name) {
            showError('name', 'Name is required');
            isValid = false;
        }
        
        if (!email) {
            showError('email', 'Email is required');
            isValid = false;
        } else if (!validateEmail(email)) {
            showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!message) {
            showError('message', 'Message is required');
            isValid = false;
        } else if (message.length < 10) {
            showError('message', 'Please provide more details (minimum 10 characters)');
            isValid = false;
        }
        
        if (!isHuman) {
            showError('human', 'Please confirm you are human');
            isValid = false;
        }
        
        if (!isValid) {
            showStatus('Please fix the errors above', true);
            return;
        }
        

        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        try {

            const formData = new FormData(form);
            

            console.log('Submitting form data:', Object.fromEntries(formData));
            

            const response = await fetch(GOOGLE_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors', 
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString()
            });
            
            showStatus('✅ Thank you! Your message has been sent. We\'ll respond within 24 hours.', false);
            

            form.reset();
            document.getElementById('_timestamp').value = new Date().toISOString();
            
 
            ['name', 'email', 'phone', 'message', 'human'].forEach(id => clearError(id));
            

            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_submission', {
                    'event_category': 'Contact',
                    'event_label': 'Contact Form'
                });
            }
            
        } catch (error) {
            console.error('Error submitting form:', error);
            showStatus('❌ There was an error sending your message. Please try again or contact us directly.', true);
            

            const name = encodeURIComponent(document.getElementById('name').value);
            const email = encodeURIComponent(document.getElementById('email').value);
            const message = encodeURIComponent(document.getElementById('message').value);
            const subject = encodeURIComponent('Contact Form Submission Failed - Manual Email');
            const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\nMessage: ${message}\n\n[This was sent because the contact form failed]`);
            

            setTimeout(() => {
                const useFallback = confirm('Form submission failed. Would you like to send an email instead?');
                if (useFallback) {
                    window.location.href = `mailto:mail@mail.com?subject=${subject}&body=${body}`;
                }
            }, 1000);
            
        } finally {

            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });
    

    const formFields = ['name', 'email', 'phone', 'tour-interest', 'message'];
    

    formFields.forEach(field => {
        const element = document.getElementById(field);
        if (element) {
            const saved = localStorage.getItem(`contact_${field}`);
            if (saved) element.value = saved;
            

            element.addEventListener('input', function() {
                localStorage.setItem(`contact_${field}`, this.value);
            });
        }
    });
    

    form.addEventListener('submit', function() {
        formFields.forEach(field => {
            localStorage.removeItem(`contact_${field}`);
        });
    });
    
    document.getElementById('message')?.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            document.getElementById('contact-form').dispatchEvent(new Event('submit'));
        }
    });
});

