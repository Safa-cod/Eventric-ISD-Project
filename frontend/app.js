// Local App State
const AppState = {
  currentScreen: 'screen-welcome',
  events: [],
  selectedEvent: null,
  bookmarks: []
};

document.addEventListener('DOMContentLoaded', () => {
  initApp();
});

async function initApp() {
  setupEventListeners();
  
  // Fetch real data from backend API Service
  AppState.events = await ApiService.getEvents();
  renderCategories();
  renderHomeFeed();
}

function setupEventListeners() {
  // Navigation Routing
  document.getElementById('btn-get-started').addEventListener('click', () => {
    switchScreen('screen-home');
    document.getElementById('bottom-nav').classList.remove('hidden');
  });

  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
      const target = e.currentTarget;
      target.classList.add('active');
      switchScreen(target.dataset.target);
    });
  });

  // Back Buttons
  document.querySelectorAll('.btn-back').forEach(btn => {
    btn.addEventListener('click', () => switchScreen('screen-home'));
  });

  // Payment triggers
  document.getElementById('btn-book-now')?.addEventListener('click', () => {
    switchScreen('screen-checkout');
  });

  document.getElementById('btn-confirm-payment')?.addEventListener('click', async () => {
    const bookingResult = await ApiService.createBooking({
      eventId: AppState.selectedEvent.id,
      userId: 1,
      amount: AppState.selectedEvent.price + 180
    });

    if(bookingResult.success) {
      document.getElementById('ticket-order-id').innerText = '#' + bookingResult.orderId;
      document.getElementById('ticket-title').innerText = AppState.selectedEvent.title;
      document.getElementById('ticket-venue').innerText = AppState.selectedEvent.venue;
      switchScreen('screen-ticket');
    }
  });

  document.getElementById('btn-home-return')?.addEventListener('click', () => {
    switchScreen('screen-home');
  });
}

function switchScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if(target) target.classList.add('active');
  AppState.currentScreen = screenId;
}

function renderCategories() {
  const categories = [
    { name: 'Sports', img: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=300&q=80' },
    { name: 'Cultural', img: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=300&q=80' },
    { name: 'Meeting Venue', img: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=300&q=80' }
  ];

  const container = document.getElementById('category-container');
  container.innerHTML = categories.map(cat => `
    <div class="category-card" style="background-image: linear-gradient(to top, rgba(0,0,0,0.7), transparent), url('${cat.img}')">
      ${cat.name}
    </div>
  `).join('');
}

function renderHomeFeed() {
  const feedContainer = document.getElementById('events-around-container');
  
  if (!AppState.events.length) {
    feedContainer.innerHTML = '<p>No events found.</p>';
    return;
  }

  // Render list
  feedContainer.innerHTML = AppState.events.map(event => `
    <div class="event-card" onclick="openEventDetails(${event.id})">
      <img src="${event.image_url}" alt="${event.title}">
      <div class="event-info">
        <h4>${event.title}</h4>
        <p><i class="fas fa-map-marker-alt"></i> ${event.venue}</p>
        <p><i class="far fa-calendar"></i> ${event.event_date}</p>
        <div class="event-price">TK ${event.price}</div>
      </div>
    </div>
  `).join('');
}

function openEventDetails(eventId) {
  const event = AppState.events.find(e => e.id === eventId);
  if (!event) return;

  AppState.selectedEvent = event;
  
  document.getElementById('details-content').innerHTML = `
    <img src="${event.image_url}" style="width:100%; height:200px; border-radius:20px; object-fit:cover;">
    <h2 style="margin-top:16px">${event.title}</h2>
    <p style="color:gray; margin-bottom:12px;"><i class="fas fa-map-marker-alt"></i> ${event.venue}</p>
    <p>${event.description}</p>
  `;

  document.getElementById('detail-price-text').innerText = `TK ${event.price}`;
  document.getElementById('summary-event-fee').innerText = `TK ${event.price}`;
  document.getElementById('summary-total-fee').innerText = `TK ${event.price + 180}`;

  switchScreen('screen-details');
}