module.exports = app => {
  /**
   * @api {get} / API status
   * @apiGroup status
   * @apiSuccessExample {json} success
   * HTTP/1.1 200 OK
   * {"status": "Health"}
   */

  app.get('/', (req, res) => res.json({ status: 'Health' }))
}
