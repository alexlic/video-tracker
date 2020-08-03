module.exports = app => {
  if (process.env.NODE_ENV !== 'test') {
    app.db.sequelize.sync()
    app.listen(app.get('port'), () => {
      console.log(`Video Tracker API running at port: ${app.get('port')}`)
    })
  }
}
