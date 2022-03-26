const Tour = require('../models/Tour');
const { catchAsync } = require('../utils/utils');
module.exports = {
  findTourById: async (req, res, next) => {
    const { id } = req.params;
    try {
      const tour = await Tour.findById(id);
      req.tour = tour;
      next();
    }
    catch {
      return next({
        status: 'failure',
        message: 'Tour not found',

      })
    }

  },
  getAllTours: catchAsync(async (req, res) => {
    let query = JSON.stringify(req.query);
    query = query.replace(/(gt|gte|lt|lte)/, (match) => `$${match}`);
    let tours = await Tour.find(JSON.parse(query));
    if (tours.length == 0) return res.json({
      status: 'failer',
      message: 'Tour not found',
    });

    if (req.query.fields !== undefined) {
      tours = tours.select(req.query.fields.replace(',', ' '));
    }
    if (req.query.page !== undefined) {
      const limit = req.query.limit || 10;
      tours.skip((+req.query.page - 1) * limit);
      tours.limit(limit);
    }
    res.json({
      status: 'success',
      data: tours,
    });

  }),
  getTourById: catchAsync(async (req, res) => {


    const tour = req.tour;

    res.json({
      status: 'success',
      data: tour,
    });

  }),
  createTour: catchAsync(async (req, res) => {
    console.log(req.body);

    const tour = await Tour.create(req.body);
    res.json({
      status: 'user created',
      data: tour,
    });

  }),
  updateTour: catchAsync(async (req, res) => {
    const { id } = req.params;

    const tour = await Tour.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json({
      status: 'user updated',
      data: tour,
    });

  }),
  deleteTour: catchAsync(async (req, res) => {
    const { id } = req.params;
    await Tour.findByIdAndDelete(id);
    res.json({ message: 'user deleted' }).status(204);
    console.log('user deleted');
  }),
};
