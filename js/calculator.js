const toursData = [
    {
        id: 'kathmandu-heritage',
        name: 'Kathmandu Valley Heritage Tour',
        description: 'Temples, palaces, and UNESCO World Heritage sites.',
        price: 165,
        duration_days: 3,
        category: 'cultural',
        image: 'images/cards/heritage.jpg'
    },
    {
        id: 'pokhara-lakes',
        name: 'Pokhara Lakes & Mountains Tour',
        description: 'Lakeside relaxation and Himalayan viewpoints.',
        price: 300,
        duration_days: 4,
        category: 'nature',
        image: 'images/top/pkr-top.jpg'
    },
    {
        id: 'chitwan-safari',
        name: 'Chitwan Jungle Safari',
        description: 'Wildlife safaris and Tharu cultural experiences.',
        price: 290,
        duration_days: 3,
        category: 'wildlife',
        image: 'images/top/safari-top.jpg'
    },
    {
        id: 'lumbini-spiritual',
        name: 'Lumbini Spiritual Tour',
        description: 'Birthplace of Buddha and sacred monasteries.',
        price: 180,
        duration_days: 2,
        category: 'spiritual',
        image: 'images/cards/lumbini.jpg'
    },
    {
        id: 'kathmandu-pokhara',
        name: 'Kathmandu – Pokhara Highlights',
        description: 'Culture, lakes, and mountain scenery.',
        price: 320,
        duration_days: 5,
        category: 'multi-destination',
        image: 'images/cards/ktm.jpg'
    },
    {
        id: 'poonhill-trek',
        name: 'Ghorepani Poon Hill Trek',
        description: 'Short Himalayan trek with sunrise views.',
        price: 720,
        duration_days: 7,
        category: 'trekking',
        image: 'images/cards/poonhill.jpg'
    },
    {
        id: 'everest-view',
        name: 'Everest View Trek',
        description: 'Himalayan panoramas without extreme trekking.',
        price: 850,
        duration_days: 10,
        category: 'trekking',
        image: 'images/cards/everest.jpg'
    },
    {
        id: 'nepal-grand',
        name: 'Nepal Grand Circuit',
        description: 'Kathmandu, Pokhara, Chitwan, and more.',
        price: 1200,
        duration_days: 14,
        category: 'multi-destination',
        image: 'images/top/chitwan-top.jpg'
    }
];

const adventureData = [
    {
        id: 'rafting',
        name: 'White Water Rafting',
        description: 'Conquer raging Himalayan rivers with class III-IV rapids.',
        price_per_day: 45,
        duration_days: 1,
        min_days: 1,
        max_days: 10,
        category: 'water',
        difficulty: 'intermediate',
        image: 'images/top/rafting-top.jpg'
    },
    {
        id: 'paragliding',
        name: 'Paragliding',
        description: 'Soar like a bird over Pokhara Valley.',
        price: 85,
        duration_hours: 1,
        duration_days: 0.1,
        category: 'air',
        difficulty: 'beginner',
        image: 'images/adventure/paragliding.jpg'
    },
    {
        id: 'bungee',
        name: 'Bungee Jumping',
        description: '160m plunge into the Bhote Koshi gorge.',
        price: 95,
        duration_days: 1,
        category: 'extreme',
        difficulty: 'advanced',
        image: 'images/top/bungee-jump.jpg'
    },
    {
        id: 'mountain-biking',
        name: 'Mountain Biking',
        description: 'Downhill and cross-country biking through Himalayan trails.',
        price_per_day: 45,
        duration_days: 1,
        min_days: 1,
        max_days: 10,
        category: 'land',
        difficulty: 'intermediate',
        image: 'images/adventure/mountain-biking.jpg'
    },
    {
        id: 'ultralight',
        name: 'Ultra Light Flight',
        description: 'Fly in an open cockpit aircraft over Pokhara.',
        price: 120,
        duration_hours: 1,
        duration_days: 0.1,
        category: 'air',
        difficulty: 'beginner',
        image: 'images/adventure/ultralight.jpg'
    },
    {
        id: 'rock-climbing',
        name: 'Rock Climbing',
        description: 'Indoor and outdoor climbing at natural rock faces.',
        price: 55,
        duration_days: 0.5,
        category: 'land',
        difficulty: 'intermediate',
        image: 'images/adventure/rock-climbing.jpg'
    },
    {
        id: 'kayaking',
        name: 'White Water Kayaking',
        description: 'Paddle through technical rapids with expert guides.',
        price_per_day: 65,
        duration_days: 1,
        min_days: 1,
        max_days: 7,
        category: 'water',
        difficulty: 'advanced',
        image: 'images/adventure/kayaking.jpg'
    },
    {
        id: 'wilderness-safari',
        name: 'Wilderness Safari',
        description: 'Elephant back safaris, canoeing, jungle walks.',
        price_per_day: 120,
        duration_days: 2,
        min_days: 2,
        max_days: 4,
        category: 'land',
        difficulty: 'beginner',
        image: 'images/top/safari-top.jpg'
    },
    {
        id: 'helicopter',
        name: 'Helicopter Tour',
        description: 'See Everest up close! Helicopter tours to Everest Base Camp.',
        price: 1200,
        duration_days: 1,
        category: 'air',
        difficulty: 'beginner',
        image: 'images/adventure/helicopter.jpg'
    }
];

class TourCalculator {
    constructor() {
        this.selectedItems = [];
        this.travelers = 2;
        this.accommodationType = 'standard';
        
        this.init();
    }
    
    init() {
        this.renderTours();
        this.renderAdventureSports();
        this.setupEventListeners();
        this.updateCalculator();
    }
    
    renderTours() {
        const container = document.getElementById('tours-section');
        container.innerHTML = '';
        
        toursData.forEach(tour => {
            const card = this.createTourCard(tour);
            container.appendChild(card);
        });
    }
    
    renderAdventureSports() {
        const container = document.getElementById('adventure-section');
        container.innerHTML = '';
        
        adventureData.forEach(activity => {
            const card = this.createAdventureCard(activity);
            container.appendChild(card);
        });
    }
    
    createTourCard(tour) {
        const card = document.createElement('div');
        card.className = 'option-card';
        card.dataset.id = tour.id;
        card.dataset.type = 'tour';
        
        const isSelected = this.selectedItems.some(item => item.id === tour.id);
        if (isSelected) card.classList.add('selected');
        
        card.innerHTML = `
            <h4>${tour.name}</h4>
            <div class="option-details">
                <span class="option-duration">${tour.duration_days} days</span>
                <span class="option-price">$${tour.price}/person</span>
            </div>
            <p class="option-description">${tour.description}</p>
            <button class="select-btn">${isSelected ? 'Remove' : 'Add to Tour'}</button>
        `;
        
        card.querySelector('.select-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSelection(tour, 'tour');
        });
        
        return card;
    }
    
    createAdventureCard(activity) {
        const card = document.createElement('div');
        card.className = 'option-card';
        card.dataset.id = activity.id;
        card.dataset.type = 'adventure';
        
        const isSelected = this.selectedItems.some(item => item.id === activity.id);
        if (isSelected) card.classList.add('selected');
        
        const price = activity.price || activity.price_per_day;
        const priceDisplay = activity.price_per_day ? `$${price}/day/person` : `$${price}/person`;
        
        let durationDisplay;
        if (activity.duration_hours) {
            durationDisplay = `${activity.duration_hours} hour${activity.duration_hours > 1 ? 's' : ''}`;
        } else if (activity.duration_days < 1) {
            durationDisplay = 'Half day';
        } else {
            durationDisplay = `${activity.duration_days} day${activity.duration_days > 1 ? 's' : ''}`;
        }
        
        card.innerHTML = `
            <h4>${activity.name}</h4>
            <div class="option-details">
                <span class="option-duration">${durationDisplay}</span>
                <span class="option-price">${priceDisplay}</span>
            </div>
            <p class="option-description">${activity.description}</p>
            <div class="difficulty-badge">${activity.difficulty.toUpperCase()}</div>
            <button class="select-btn">${isSelected ? 'Remove' : 'Add to Tour'}</button>
        `;
        
        card.querySelector('.select-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggleSelection(activity, 'adventure');
        });
        
        return card;
    }
    
    toggleSelection(item, type) {
        const index = this.selectedItems.findIndex(selected => selected.id === item.id);
        
        if (index === -1) {
            this.selectedItems.push({...item, type});
        } else {
            this.selectedItems.splice(index, 1);
        }
        
        this.updateSelectionUI();
        this.updateCalculator();
    }
    
    updateSelectionUI() {
        document.querySelectorAll('.option-card').forEach(card => {
            const id = card.dataset.id;
            const isSelected = this.selectedItems.some(item => item.id === id);
            
            if (isSelected) {
                card.classList.add('selected');
                card.querySelector('.select-btn').textContent = 'Remove';
            } else {
                card.classList.remove('selected');
                card.querySelector('.select-btn').textContent = 'Add to Tour';
            }
        });
        
        this.updateSelectedItemsList();
    }
    
    updateSelectedItemsList() {
        const container = document.getElementById('selected-items-list');
        
        if (this.selectedItems.length === 0) {
            container.innerHTML = '<p class="empty-message">No items selected yet</p>';
            return;
        }
        
        container.innerHTML = '';
        
        this.selectedItems.forEach(item => {
            const div = document.createElement('div');
            div.className = 'selected-item';
            
            let duration, price;
            
            if (item.type === 'tour') {
                duration = `${item.duration_days} days`;
                price = `$${item.price}`;
            } else {
                if (item.duration_hours) {
                    duration = `${item.duration_hours}h`;
                } else if (item.duration_days < 1) {
                    duration = 'Half day';
                } else {
                    duration = `${item.duration_days}d`;
                }
                
                price = item.price ? `$${item.price}` : `$${item.price_per_day}/day`;
            }
            
            div.innerHTML = `
                <div class="selected-item-name">${item.name}</div>
                <div class="selected-item-duration">${duration}</div>
                <div class="selected-item-price">${price}</div>
                <button class="remove-item">×</button>
            `;
            
            div.querySelector('.remove-item').addEventListener('click', () => {
                this.toggleSelection(item, item.type);
            });
            
            container.appendChild(div);
        });
    }
    
    updateCalculator() {
        this.travelers = parseInt(document.getElementById('travelers').value);
        this.accommodationType = document.getElementById('accommodation').value;
        
        const { totalDays, activitiesCost, accommodationCost } = this.calculateTotals();
        
        document.getElementById('total-days').textContent = totalDays;
        document.getElementById('total-cost').textContent = `$${activitiesCost + accommodationCost}`;
        document.getElementById('summary-travelers').textContent = this.travelers;
        
        document.getElementById('breakdown-activities').textContent = `$${activitiesCost}`;
        document.getElementById('breakdown-accommodation').textContent = `$${accommodationCost}`;
        document.getElementById('breakdown-total').textContent = `$${activitiesCost + accommodationCost}`;
    }
    
    calculateTotals() {
        let totalDays = 0;
        let activitiesCost = 0;
        
        this.selectedItems.forEach(item => {
            if (item.type === 'tour') {
                totalDays += item.duration_days;
                activitiesCost += item.price * this.travelers;
            } else {
                if (item.duration_days) {
                    totalDays += item.duration_days;
                } else if (item.duration_hours) {
                    totalDays += item.duration_hours / 8;
                }
                
                if (item.price) {
                    activitiesCost += item.price * this.travelers;
                } else if (item.price_per_day) {
                    const days = item.min_days || 1;
                    activitiesCost += (item.price_per_day * days) * this.travelers;
                }
            }
        });
        
        totalDays = Math.max(totalDays, 1);
        
        const accommodationRates = {
            budget: 30,
            standard: 60,
            luxury: 120
        };
        
        const accommodationCost = Math.round(accommodationRates[this.accommodationType] * this.travelers * totalDays);
        
        totalDays = Math.ceil(totalDays);
        activitiesCost = Math.round(activitiesCost);
        
        return { totalDays, activitiesCost, accommodationCost };
    }
    
    setupEventListeners() {
        document.getElementById('travelers').addEventListener('change', () => {
            this.updateCalculator();
        });
        
        document.getElementById('accommodation').addEventListener('change', () => {
            this.updateCalculator();
        });
        
        document.getElementById('save-estimate').addEventListener('click', () => {
            this.saveEstimate();
        });
        
        document.getElementById('contact-expert').addEventListener('click', (e) => {
            e.preventDefault();
            this.showSubmitModal();
        });
        
        document.querySelectorAll('.close-modal').forEach(button => {
            button.addEventListener('click', () => {
                document.getElementById('submit-modal').style.display = 'none';
            });
        });
        
        document.getElementById('submit-modal').addEventListener('click', (e) => {
            if (e.target.id === 'submit-modal') {
                document.getElementById('submit-modal').style.display = 'none';
            }
        });
        
        document.getElementById('estimate-form').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitEstimate();
        });
    }
    
    saveEstimate() {
        const estimate = {
            travelers: this.travelers,
            accommodation: this.accommodationType,
            selectedItems: this.selectedItems,
            totals: this.calculateTotals(),
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('tourEstimate', JSON.stringify(estimate));
        
        alert('Estimate saved! You can return to this estimate later.');
    }
    
    showSubmitModal() {
        const estimateData = {
            travelers: this.travelers,
            accommodation: this.accommodationType,
            selectedItems: this.selectedItems,
            totals: this.calculateTotals(),
            timestamp: new Date().toISOString()
        };
        
        document.getElementById('estimate-data').value = JSON.stringify(estimateData);
        
        this.updateModalSummary();
        
        document.getElementById('submit-modal').style.display = 'block';
    }
    
    updateModalSummary() {
        const { totalDays, activitiesCost, accommodationCost } = this.calculateTotals();
        const totalCost = activitiesCost + accommodationCost;
        
        let summaryHTML = `
            <div class="summary-row">
                <span>Travelers:</span>
                <span>${this.travelers} person${this.travelers > 1 ? 's' : ''}</span>
            </div>
            <div class="summary-row">
                <span>Accommodation:</span>
                <span>${this.accommodationType.charAt(0).toUpperCase() + this.accommodationType.slice(1)}</span>
            </div>
            <div class="summary-row">
                <span>Estimated Duration:</span>
                <span>${totalDays} day${totalDays > 1 ? 's' : ''}</span>
            </div>
            <div class="summary-row">
                <span>Activities Cost:</span>
                <span>$${activitiesCost}</span>
            </div>
            <div class="summary-row">
                <span>Accommodation Cost:</span>
                <span>$${accommodationCost}</span>
            </div>
            <div class="summary-row">
                <span>Total Estimated Cost:</span>
                <span>$${totalCost}</span>
            </div>
        `;
        
        if (this.selectedItems.length > 0) {
            summaryHTML += `
                <div class="summary-row" style="margin-top: 15px; border-top: 2px solid #ddd; padding-top: 15px;">
                    <span style="font-weight: 600;">Selected Items (${this.selectedItems.length}):</span>
                    <span></span>
                </div>
            `;
            
            this.selectedItems.forEach(item => {
                let duration, price;
                
                if (item.type === 'tour') {
                    duration = `${item.duration_days}d`;
                    price = `$${item.price}`;
                } else {
                    if (item.duration_hours) {
                        duration = `${item.duration_hours}h`;
                    } else if (item.duration_days < 1) {
                        duration = 'Half day';
                    } else {
                        duration = `${item.duration_days}d`;
                    }
                    price = item.price ? `$${item.price}` : `$${item.price_per_day}/day`;
                }
                
                summaryHTML += `
                    <div class="summary-row" style="padding-left: 20px;">
                        <span>${item.name}</span>
                        <span>${duration} - ${price}</span>
                    </div>
                `;
            });
        }
        
        document.getElementById('modal-summary').innerHTML = summaryHTML;
    }
    
    async submitEstimate() {
        const formData = new FormData(document.getElementById('estimate-form'));
        const estimateData = JSON.parse(formData.get('estimate_data'));
        
        const submission = {
            user_info: {
                name: formData.get('full_name'),
                email: formData.get('email'),
                phone: formData.get('phone') || '',
                country: formData.get('country') || '',
                travel_date: formData.get('travel_date') || '',
                message: formData.get('message') || '',
                newsletter: formData.get('newsletter') ? 'Yes' : 'No'
            },
            estimate: estimateData,
            submitted_at: new Date().toISOString()
        };
        
        const submitButton = document.querySelector('#estimate-form button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Submitting...';
        submitButton.disabled = true;
        
        try {
            await this.sendToGoogleSheets(submission);
            this.showSuccessMessage();
            
        } catch (error) {
            console.error('Submission failed:', error);
            alert('Sorry, there was an error submitting your estimate. Please try again or contact us directly.');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }
    }
    
    async sendToGoogleSheets(data) {
        const scriptURL = 'https://script.google.com/macros/s/AKfycbzzSKLIDoGsiZuplylCZ00adN_Bws5aYn3Ic6YGpzBSj3sylNrDlRd77H37hs6jr9yS/exec';
        
        const formData = new FormData();
        
        // Add all form data to send to spreadsheet
        formData.append('name', data.user_info.name);
        formData.append('email', data.user_info.email);
        formData.append('phone', data.user_info.phone || '');
        formData.append('country', data.user_info.country || '');
        formData.append('travelers', data.estimate.travelers.toString());
        formData.append('accommodation', data.estimate.accommodation);
        formData.append('estimated_days', data.estimate.totals.totalDays.toString());
        formData.append('estimated_cost', (data.estimate.totals.activitiesCost + data.estimate.totals.accommodationCost).toString());
        formData.append('travel_date', data.user_info.travel_date || '');
        formData.append('selected_items', JSON.stringify(data.estimate.selectedItems.map(item => item.name)));
        formData.append('message', data.user_info.message || '');
        formData.append('newsletter', data.user_info.newsletter || 'No');
        formData.append('source', 'Tour Calculator');
        
        console.log('Form data ready for spreadsheet:', Object.fromEntries(formData));
        
        try {
            const response = await fetch(scriptURL, {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: new URLSearchParams(formData).toString()
            });
            
            console.log('✅ Data sent to spreadsheet (no-cors mode)');
            return { success: true, message: 'Submitted successfully' };
            
        } catch (error) {
            console.error('Spreadsheet submission error:', error);
            throw new Error('Failed to submit to spreadsheet: ' + error.message);
        }
    }
    
    showSuccessMessage() {
        document.querySelector('.modal-body').innerHTML = `
            <div class="success-message">
                <div class="success-icon">✓</div>
                <h2>Estimate Submitted Successfully!</h2>
                <p>Your tour estimate has been saved to our system.</p>
                <button class="btn-primary close-modal">Close</button>
            </div>
        `;
        
        document.querySelector('.success-message .close-modal').addEventListener('click', () => {
            document.getElementById('submit-modal').style.display = 'none';
            document.getElementById('estimate-form').reset();
            
            this.resetModalForm();
        });
    }
    
    resetModalForm() {
        const originalForm = `
            <form id="estimate-form">
                <input type="hidden" id="estimate-data" name="estimate_data">
                <div class="form-grid">
                    <div class="form-group">
                        <label for="full-name">Full Name *</label>
                        <input type="text" id="full-name" name="full_name" required>
                    </div>
                    <div class="form-group">
                        <label for="email">Email Address *</label>
                        <input type="email" id="email" name="email" required>
                    </div>
                    <div class="form-group">
                        <label for="phone">Phone Number</label>
                        <input type="tel" id="phone" name="phone">
                    </div>
                    <div class="form-group">
                        <label for="country">Country</label>
                        <input type="text" id="country" name="country">
                    </div>
                    <div class="form-group full-width">
                        <label for="travel-date">Preferred Travel Dates</label>
                        <input type="text" id="travel-date" name="travel_date" placeholder="e.g., March 15-30, 2026">
                    </div>
                    <div class="form-group full-width">
                        <label for="message">Additional Requirements</label>
                        <textarea id="message" name="message" rows="3" placeholder="Any special requests, dietary restrictions, etc."></textarea>
                    </div>
                    <div class="form-group full-width">
                        <label>
                            <input type="checkbox" id="newsletter" name="newsletter" checked>
                            Subscribe to our newsletter
                        </label>
                    </div>
                </div>
                <div class="estimate-summary">
                    <h3>Your Tour Estimate Summary</h3>
                    <div id="modal-summary"></div>
                </div>
                <div class="form-actions">
                    <button type="button" class="btn-secondary close-modal">Cancel</button>
                    <button type="submit" class="btn-primary">Submit Estimate</button>
                </div>
            </form>
        `;
        
        document.querySelector('.modal-body').innerHTML = originalForm;
        this.setupEventListeners();
    }
}

// Global variable to access calculator instance
let tourCalculator;

document.addEventListener('DOMContentLoaded', () => {
    tourCalculator = new TourCalculator();
    
    // Load saved estimate if exists
    const savedEstimate = localStorage.getItem('tourEstimate');
    if (savedEstimate) {
        try {
            const estimate = JSON.parse(savedEstimate);
            console.log('Loaded saved estimate:', estimate);
        } catch (e) {
            console.error('Failed to load saved estimate:', e);
        }
    }
});