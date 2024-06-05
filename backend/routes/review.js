const express = require('express');
const router = express.Router();
const Review = require('../models/review');

module.exports = (io) => {
// Create a new review
router.post('/', async (req, res) => {
  const { title, content, user } = req.body;
    try {
        const newReview = new Review({ title, user, content });
        await newReview.save();
        const reviews = await Review.find();
        io.emit('review', reviews);
        //res.status(201).json(newReview);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get all reviews
router.get('/', async (req, res) => {
    try {
      const reviews = await Review.find();
      io.emit('review', reviews);
      res.status(200).json(reviews);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// Get a specific review by ID
router.get('/:id', async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      res.status(200).json(review);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// Update a review
router.put('/:id', async (req, res) => {
    const { title, content, date } = req.body;
    try {
      const review = await Review.findById(req.params.id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      review.title = title;
      review.content = content;
      await review.save();
      const reviews = await Review.find();
      
      io.emit('review', reviews);

      //res.status(200).json(review);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
});

// Delete a review
router.delete('/:id', async (req, res) => {
    try {
      const review = await Review.findById(req.params.id);
      if (!review) {
        return res.status(404).json({ message: 'Review not found' });
      }
      await review.deleteOne();
      const reviews = await Review.find();

      io.emit('review', reviews); 
      //res.status(200).json({ message: 'Review deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

return router;
}

