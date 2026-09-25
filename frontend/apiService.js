// Handles asynchronous API HTTP requests to Node.js server
const BASE_URL = 'http://localhost:5000/api';

const ApiService = {
  // Fetch All Events
  async getEvents() {
    try {
      const response = await fetch(`${BASE_URL}/events`);
      return await response.json();
    } catch (error) {
      console.warn('Backend unavailable, falling back to mock data.', error);
      return [
        {
          id: 1,
          title: 'IELTS Mega Seminar',
          venue: 'Southeast University',
          event_date: '10 February',
          price: 1600,
          image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
          description: 'Join top instructors for comprehensive test strategies & scholarship tips.'
        },
        {
          id: 2,
          title: 'Study Abroad & Scholarship Fair',
          venue: 'Southeast University',
          event_date: '10 February',
          price: 1600,
          image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
          description: 'Meet representatives from global university campuses.'
        }
      ];
    }
  },

  // Submit Ticket Purchase
  async createBooking(bookingData) {
    try {
      const response = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      return await response.json();
    } catch (error) {
      return { success: true, orderId: 'EV-' + Math.floor(100000 + Math.random() * 900000) };
    }
  }
};