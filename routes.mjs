import db from './models/index.mjs';

// import your controllers here
import initRoutesController from './controllers/routes.mjs';
import initTripsController from './controllers/trips.mjs';

export default function bindRoutes(app) {
  // pass in the db for all items callbacks
  const RoutesController = initRoutesController(db);
  const TripsController = initTripsController(db);

  app.get('/trips/:tripId/routes', RoutesController.index);
  app.put('/trips/routes/update', RoutesController.update);
  app.get('/trips', TripsController.index);
  app.post('/trips', TripsController.create);
  app.post('/trips/:tripId/routes', RoutesController.create);
}
