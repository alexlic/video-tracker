module.exports = {
  database: 'video-tracker',
  username: '',
  password: '',
  params: {
    dialect: 'sqlite',
    storage: 'videoTracker.sqlite',
    logging: false,
    define: {
      underscored: true
    }
  }
}
