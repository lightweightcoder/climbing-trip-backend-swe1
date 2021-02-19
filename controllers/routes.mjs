// db is an argument to this function so
// that we can make db queries inside
export default function initRoutesController(db) {
  const index = (req, res) => {
    const { tripId } = req.params;
    db.Route.findAll(
      {
        where: {
          tripId,
        },
        order: [
          ['order', 'ASC'],
        ],
      },
    )
      .then((routes) => {
        res.send({ routes });
      })
      .catch((error) => console.log(error));
  };

  const update = (req, res) => {
    const { updatedTripRoutes } = req.body;
    // Update each route for assoc trip
    const updatedTripRoutesPromises = updatedTripRoutes.map((route) => {
      const { name, difficulty, order } = route;

      // If route already exists, we simply update it
      if (route.id) {
        return db.Route.update({
          name,
          difficulty,
          order,
        },
        {
          where: {
            id: Number(route.id),
          },
        });
      }
      // Otherwise create a new route
      db.Route.create({
        name,
        difficulty,
        order,
      });
    });

    // Wait for all the promises to resolve before sending res to client
    Promise.all(updatedTripRoutesPromises)
      .then((values) => {
        console.log(values, 'values');
        res.send({ message: 'updated', values });
      })
      .catch((err) => console.log(err));
  };

  // return all methods we define in an object
  // refer to the routes file above to see this used
  return {
    index,
    update,
  };
}
