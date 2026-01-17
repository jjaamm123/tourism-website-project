

document.addEventListener('DOMContentLoaded', function() {
 
    const filterButtons = document.querySelectorAll('.filter-btn');
    const adventureCards = document.querySelectorAll('.adventure-card');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {

            filterButtons.forEach(btn => btn.classList.remove('active'));
            
   
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            

            adventureCards.forEach(card => {
                if (filterValue === 'all') {
                    card.style.display = 'block';
                } else {
                    const categories = card.getAttribute('data-category').split(' ');
                    if (categories.includes(filterValue)) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }
            });
        });
    });
    

    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const isOpen = answer.classList.contains('open');
            

            document.querySelectorAll('.faq-answer').forEach(ans => {
                ans.classList.remove('open');
                ans.previousElementSibling.classList.remove('active');
            });
            

            if (!isOpen) {
                answer.classList.add('open');
                this.classList.add('active');
            }
        });
    });
    

    const heroCta = document.querySelector('.hero-cta');
    if (heroCta) {
        heroCta.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
    
 
    adventureCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });
});