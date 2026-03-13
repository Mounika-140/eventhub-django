// Organizer Dashboard JavaScript

// Event data will be injected from the template
let eventsData = [];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function () {
    updateSummaryStats();
    setupEventCardListeners();
    setupImageErrorHandlers();
});

// Setup Image Error Handlers
function setupImageErrorHandlers() {
    const images = document.querySelectorAll('.poster-img[data-fallback-src]');
    images.forEach(img => {
        img.addEventListener('error', function () {
            this.src = this.dataset.fallbackSrc;
            this.classList.add('fallback');
        });
    });
}

// Update Summary Stats
function updateSummaryStats() {
    let activeCount = 0;
    let closedCount = 0;

    eventsData.forEach(event => {
        if (event.seatsLeft > 0) {
            activeCount++;
        } else {
            closedCount++;
        }
    });

    document.getElementById('activeEventsCount').textContent = activeCount;
    document.getElementById('closedEventsCount').textContent = closedCount;
}

// Setup Event Card Listeners
function setupEventCardListeners() {
    const cards = document.querySelectorAll('.event-card');
    cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function () {
            const eventId = parseInt(this.dataset.eventId);
            viewEventDetail(eventId);
        });
    });
}

// View Event Detail
function viewEventDetail(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (!event) return;

    const modal = document.getElementById('eventModal');
    const content = document.getElementById('eventDetailContent');

    const seatsStatus = event.seatsLeft > 0 ?
        `<span class="seats-available" style="color: #10b981; font-weight: 600;">✓ Seats Available: ${event.seatsLeft}/${event.totalSeats}</span>` :
        `<span class="seats-full" style="color: #ef4444; font-weight: 600;">✗ No Seats Available</span>`;

    content.innerHTML = `
        <div class="event-modal-header">
            ${event.poster ?
                `<img src="${event.poster}" alt="${event.title}" class="modal-poster">` :
                `<div class="modal-poster no-image" style="background: linear-gradient(135deg, #e0e7ff, #f0f4ff); display: flex; align-items: center; justify-content: center;"><i class="fa-solid fa-image fa-3x" style="color: #c7d2fe;"></i></div>`
            }
        </div>
        <div class="event-modal-body">
            <h2>${event.title}</h2>
            
            <div class="event-info">
                <div class="info-item">
                    <label>📂 Category</label>
                    <span>${event.category}</span>
                </div>
                <div class="info-item">
                    <label>🏛️ Region</label>
                    <span>${event.region}</span>
                </div>
                <div class="info-item">
                    <label>🏢 College</label>
                    <span>${event.college}</span>
                </div>
            </div>

            <div class="event-datetime">
                <div class="datetime-item">
                    <i class="fas fa-calendar"></i>
                    <div>
                        <label>Date</label>
                        <span>${event.date}</span>
                    </div>
                </div>
                <div class="datetime-item">
                    <i class="fas fa-clock"></i>
                    <div>
                        <label>Time</label>
                        <span>${event.time}</span>
                    </div>
                </div>
            </div>

            <div class="event-location">
                <i class="fas fa-map-marker-alt"></i>
                <div>
                    <label>Location</label>
                    <span>${event.venue}</span>
                </div>
            </div>

            <div class="event-description">
                <label>📝 Description</label>
                <p>${event.description}</p>
            </div>

            <div class="event-payment">
                <i class="fas fa-credit-card"></i>
                <div>
                    <label>Payment</label>
                    <span>${event.paymentType === 'paid' ? `₹${event.price}` : 'Free'}</span>
                </div>
            </div>

            <div class="event-seats" style="padding: 15px; background: #f5f3ff; border-left: 4px solid #a78bfa; border-radius: 10px;">
                ${seatsStatus}
            </div>

            <div class="modal-actions">
                <button class="btn-close" onclick="closeEventModal()" style="flex: 1; padding: 12px 20px; background: #e5e7eb; color: #374151; border: none; border-radius: 10px; font-weight: 600; cursor: pointer;">
                    ❌ Close
                </button>
            </div>
        </div>
    `;

    modal.style.display = 'block';
}

// Close Event Modal
function closeEventModal() {
    const modal = document.getElementById('eventModal');
    modal.style.display = 'none';
}

// Close modal when clicking outside
window.addEventListener('click', function (event) {
    const modal = document.getElementById('eventModal');
    if (event.target === modal) {
        closeEventModal();
    }
});

// Close modal on Escape key
document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
        closeEventModal();
    }
});
