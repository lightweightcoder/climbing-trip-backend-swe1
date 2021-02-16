const faker = require('faker');
const createListOfDifficulty = require('../helper.js');

const difficulties = createListOfDifficulty();
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tripsList = [
      {
        name: 'krabi',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'yosemite',
        created_at: new Date(),
        updated_at: new Date(),
      },
    ];

    // Insert categories before items because items reference categories
    const trips = await queryInterface.bulkInsert(
      'trips',
      tripsList,
      { returning: true },
    );

    const routes = [];

    for (let i = 1; i < trips.length + 1; i += 1) {
      // const trip = trips[i];
      for (let j = 1; j < 16; j += 1) {
        const noun = faker.company.bsNoun(); // Rowan Nikolaus
        const adjective = faker.commerce.productAdjective(); // Rowan Nikolaus
        const difficulty = difficulties[Math.floor(Math.random() * difficulties.length)];

        routes.push({
          name: `${adjective} ${noun}`,
          trip_id: i,
          difficulty,
          order: j,
          created_at: new Date(),
          updated_at: new Date(),
        });
      }
    }
    console.log(routes, 'routes');

    queryInterface.bulkInsert('routes', routes);
  },

  down: async (queryInterface, Sequelize) => {},
};
