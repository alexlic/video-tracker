const app = require('../../index.js')
const request = require('supertest')(app)
const { expect } = require('chai')

describe('Routes: Video', () => {
  const { Videos } = app.db.models
  let fakeVideo

  beforeEach(done => {
    Videos
      .destroy({ where: {}})
      .then(() => {
        Videos
          .destroy({ where: {} })
          .then(() => Videos.bulkCreate([
            {
              id: 1,
              title: 'Alan walker - darkside (8D tunes)',
              url: 'https://www.youtube.com/watch?v=Z55vLecXdCs'
            },
            {
              id: 2,
              title: 'David Guetta - Titanium (ft. Sia) | 8D Audio',
              url: 'https://www.youtube.com/watch?v=cAapF-pnAto'
            }
          ]))
          .then(videos => {
            fakeVideo = videos[0]
            done()
          })
      })
  })

  describe('GET /videos', () => {
    describe('status 200', () => {
      it('returns a list of videos', done => {
        request.get('/videos')
          .expect(200)
          .end((err, res) => {
            expect(res.body).to.have.length(2)
            expect(res.body[0].title).to.eql('Alan walker - darkside (8D tunes)')
            expect(res.body[1].title).to.eql('David Guetta - Titanium (ft. Sia) | 8D Audio')
            done(err)
          })
      })
    })
  })
  describe('POST /videos', () => {
    describe('status 200', () => {
      it('creates a new video', done => {
        request.post('/videos')
          .send({
            title: 'Foster The People - Pumped Up Kicks | 8D Audio',
            url: 'https://www.youtube.com/watch?v=aghYJ_SoD-s'
          })
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql('Foster The People - Pumped Up Kicks | 8D Audio')
            expect(res.body.url).to.eql('https://www.youtube.com/watch?v=aghYJ_SoD-s')
            done(err)
          })
      })
    })
  })
  describe('GET /videos/:id', () => {
    describe('status 200', () => {
      it('returns one video', done => {
        request.get(`/videos/${fakeVideo.id}`)
          .expect(200)
          .end((err, res) => {
            expect(res.body.title).to.eql('Alan walker - darkside (8D tunes)')
            expect(res.body.url).to.eql('https://www.youtube.com/watch?v=Z55vLecXdCs')
            done(err)
          })
      })
    })
    describe('status 404', () => {
      it('throws error when video not exist', done => {
        request.get('/videos/0')
          .expect(404)
          .end((err, res) => done(err))
      })
    })
  })
  describe('PUT /videos/:id', () => {
    describe('status 204', () => {
      it('updates a video', done => {
        request.put(`/videos/${fakeVideo.id}`)
          .send({
            title: 'Alan walker - darkside (8D audio)',
            url: 'https://www.youtube.com/watch?v=Z55vLecXdCs'
          })
          .expect(204)
          .end((err, res) => done(err))
      })
    })
  })
  describe('DELETE /videos/:id', () => {
    describe('status 204', () => {
      it('removes a video', done => {
        request.delete(`/videos/${fakeVideo.id}`)
          .expect(204)
          .end((err, res) => done(err))
      })
    })
  })
})