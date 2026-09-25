const express = require('express');
const router = express.Router();

// Simulated Database Repository (Replace with MySQL / PostgreSQL queries)
let mockEvents = [
  {
    id: 1,
    title: 'IELTS Mega Seminar',
    category: 'Educational',
    venue: 'Southeast University',
    event_date: '10 February',
    price: 1600,
    image_url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=600&q=80',
    description: 'Join top instructors for full test strategies, study plans, and scholarship guidelines.'
  },
  {
    id: 2,
    title: 'Study Abroad & Scholarship Fair',
    category: 'Educational',
    venue: 'Southeast University',
    event_date: '10 February',
    price: 1600,
    image_url: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&w=600&q=80',
    description: 'Direct university representative interactions for higher education opportunities.'
  },
  {
    id: 3,
    title: 'Competitive Exam Seminar',
    category: 'Educational',
    venue: 'Tejgaon, Dhaka',
    event_date: '12 February',
    price: 2500,
    image_url: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=600&q=80',
    description: 'Master time management, practice sets, and syllabus guidance.'
  }
];

let mockBookings = [];

// 1. GET ALL EVENTS
router.get('/events', (req, res) => {
  const { category, search } = req.query;
  let result = mockEvents;

  if (category) {
    result = result.filter(e => e.category.toLowerCase() === category.toLowerCase());
  }
  if (search) {
    result = result.filter(e => e.title.toLowerCase().includes(search.toLowerCase()));
  }

  res.json(result);
});

// 2. GET SINGLE EVENT DETAILS
router.get('/events/:id', (req, res) => {
  const event = mockEvents.find(e => e.id === parseInt(req.params.id));
  if (!event) return res.status(404).json({ message: 'Event not found' });
  res.json(event);
});

// 3. CREATE NEW EVENT
router.post('/events', (req, res) => {
  const { title, category, venue, event_date, price, description } = req.body;
  const newEvent = {
    id: mockEvents.length + 1,
    title,
    category,
    venue,
    event_date,
    price: parseFloat(price),
    image_url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=600&q=80',
    description
  };
  mockEvents.push(newEvent);
  res.status(201).json(newEvent);
});

// 4. BOOK EVENT TICKET
router.post('/bookings', (req, res) => {
  const { eventId, userId, amount } = req.body;
  const booking = {
    id: 'EV-' + Math.floor(100000 + Math.random() * 900000),
    eventId,
    userId,
    amount,
    status: 'CONFIRMED',
    created_at: new Date()
  };
  mockBookings.push(booking);
  res.status(201).json({ success: true, orderId: booking.id, booking });
});

module.exports = router;