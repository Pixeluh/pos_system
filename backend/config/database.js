module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'sqlite',
        filename: env('DATABASE_FILENAME', 'POSdatabase.db'),
      },
      options: {
        useNullAsDefault: true,
      },
    },
  },
});
