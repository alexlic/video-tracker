module.exports = app => {
  const { Videos } = app.db.models
  app.route('/videos')
    /**
     * @api {get} /videos List the Videos
     * @apiGroup Videos
     * @apiSuccess {Object[]} Videos list 
     * @apiSuccess {Number} id Video id 
     * @apiSuccess {String} title Video tile
     * @apiSuccess {String} URL Video URL
     * @apiSuccess {Date} updated_at  Update's date
     * @apiSuccess {Date} created_at Register's date
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  [{
     *    "id": 1,
     *    "title": "Billie Eilish - Ilomilo 8D",
     *    "URL": "https://www.youtube.com/watch?v=O5ooPGEiXkg",
     *    "updated_at": "2020-05-06T15:20:11.700Z",
     *    "created_at": "2020-05-06T15:20:11.700Z",
     *  }]
     * @apiErrorExample {json} List error
     *   HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      Videos.findAll({ where: {} })
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message })
        })
    })
    /**
     * @api {post} /videos Register a new Video
     * @apiGroup Videos
     * @apiParam {String} title Video title
     * @apiParam {String} URL Video URL
     * @apiParamExample {json} Input
     *  {
     *    "title": "Tones and I - Dance Monkey (8d audio)"
     *    "url": "https://www.youtube.com/watch?v=_ZLh7mYdj8s"
     *  }
     * @apiSuccess {Number} id Video id
     * @apiSuccess {String} title Video title
     * @apiSuccess {String} URL Video URL
     * @apiSuccess {Date} updated_at  Update's date
     * @apiSuccess {Date} created_at Register's date
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  {
     *    "id": 2,
     *    "title": "Tones and I - Dance Monkey (8d audio)",
     *    "url": "https://www.youtube.com/watch?v=_ZLh7mYdj8s",
     *    "updated_at": "2020-05-06T15:20:11.700Z",
     *    "created_at": "2020-05-06T15:20:11.700Z"
     *  }
     * @apiErrorExample {json} Register error
     *   HTTP/1.1 412 Precondition Failed
     */
    .post((req, res) => {
      Videos.create(req.body)
        .then(result => res.json(result))
        .catch(error => {
          res.status(412).json({ msg: error.message })
        })
    })
  app.route('/videos/:id')
    /**
     * @api {get} /videos/:id Get a video
     * @apiGroup Videos
     * @apiParam {id} id Video id
     * @apiSuccess {Number} id Video id
     * @apiSuccess {String} title Video title
     * @apiSuccess {String} URL Video URL
     * @apiSuccess {Date} updated_at  Update's date
     * @apiSuccess {Date} created_at Register's date
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 200 OK
     *  {
     *    "id": 1,
     *    "title": "Billie Eilish - Ilomilo 8D",
     *    "URL": "https://www.youtube.com/watch?v=O5ooPGEiXkg",
     *    "updated_at": "2020-05-06T15:20:11.700Z",
     *    "created_at": "2020-05-06T15:20:11.700Z",
     *  }
     * @apiErrorExample {json} Video not found error
     *   HTTP/1.1 404 Not Found
     * @apiErrorExample {json} Find error
     *  HTTP/1.1 412 Precondition Failed
     */
    .get((req, res) => {
      Videos.findOne({
        where: {
          id: req.params.id
        }
      })
        .then(result => {
          if (result) {
            res.json(result)
          } else {
            res.sendStatus(404)
          }
        })
        .catch(error => {
          res.status(412).json({ msg: error.message })
        })
    })
    /**
     * @api {put} /videos/:id Update a video
     * @apiGroup Videos
     * @apiParam {id} id Video id
     * @apiParam {String} title Video title
     * @apiParam {String} URL Video URL
     * @apiParamExample {json} Input
     *  {
     *    "title": "Tones and I - Dance Monkey (8d audio)",
     *    "url": "https://www.youtube.com/watch?v=_ZLh7mYdj8s"
     *  }
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 204 No Content
     * @apiErrorExample {json} Update error
     *   HTTP/1.1 412 Precondition Failed
     */
    .put((req, res) => {
      Videos.update(req.body, {
        where: {
          id: req.params.id
        }
      })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({ msg: error.message })
        })
    })
    /**
     * @api {delete} /videos/:id Remove a video
     * @apiGroup Videos
     * @apiParam {id} id Video id
     * @apiSuccessExample {json} Success
     *  HTTP/1.1 204 No Content
     * @apiErrorExample {json} Delete error
     *   HTTP/1.1 412 Precondition Failed
     */
    .delete((req, res) => {
      Videos.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(result => res.sendStatus(204))
        .catch(error => {
          res.status(412).json({ msg: error.message })
        })
    })
}
