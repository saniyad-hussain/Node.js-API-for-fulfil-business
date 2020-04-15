module.exports = {
  attributes: {
    product_id: {
      type: 'number',
      required: true,
      allowNull: false
    },
    upc: {
      type: 'string',
      required: false,
      allowNull: true
    },
    description: {
      type: 'string',
      required: false,
      allowNull: true
    },
    environment: {
      type: 'string',
      required: false,
      allowNull: true
    },
    shape: {
      type: 'string',
      required: false,
      allowNull: true
    },
    packaging: {
      type: 'string',
      required: false,
      allowNull: true
    },
    min_d1: {
      type: 'number',
      required: false,
      allowNull: true
    },
    avg_d1: {
      type: 'number',
      required: false,
      allowNull: true
    },
    max_d1: {
      type: 'number',
      required: false,
      allowNull: true
    },
    min_d2: {
      type: 'number',
      required: false,
      allowNull: true
    },
    avg_d2: {
      type: 'number',
      required: false,
      allowNull: true
    },
    max_d2: {
      type: 'number',
      required: false,
      allowNull: true
    },
    min_d3: {
      type: 'number',
      required: false,
      allowNull: true
    },
    avg_d3: {
      type: 'number',
      required: false,
      allowNull: true
    },
    max_d3: {
      type: 'number',
      required: false,
      allowNull: true
    },
    invalid_orientations: {
      type: 'string',
      required: false,
      allowNull: true
    },
    raft: {
      type: 'boolean',
      required: false,
      allowNull: true
    },
    min_mass: {
      type: 'number',
      required: false,
      allowNull: true
    },
    avg_mass: {
      type: 'number',
      required: false,
      allowNull: true
    },
    max_mass: {
      type: 'number',
      required: false,
      allowNull: true
    },
    material: {
      type: 'string',
      required: false,
      allowNull: true
    },
    transparency: {
      type: 'number',
      required: false,
      allowNull: true
    },
    damageable_index: {
      type: 'number',
      required: false,
      allowNull: true
    },
    damaging_index: {
      type: 'number',
      required: false,
      allowNull: true
    },
    load_instructions: {
      type: 'string',
      required: false,
      allowNull: true
    },
    shelf_life: {
      type: 'number',
      required: false,
      allowNull: true
    }
  },

  getMetaData: async () => {
    const SQL = 'SELECT * from metadata LIMIT 99999';
    const result = await Metadata.getDatastore().sendNativeQuery(SQL, []);
    return result.rows;
  }
};
