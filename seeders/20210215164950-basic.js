const faker = require('faker');
const createListOfDifficulty = require('../helper.js');

const difficulties = createListOfDifficulty();
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const tripsList = [
      {
        name: 'krabi',
        description: 'The capital of southern Thailand\'s Krabi Province, is a resort town near the Andaman coast.',
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: 'yosemite',
        description: 'Yosemite National Park is in California’s Sierra Nevada mountains. It’s famed for its giant, ancient sequoia trees, and for Tunnel View, the iconic vista of towering Bridalveil Fall and the granite cliffs of El Capitan and Half Dome.',
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
