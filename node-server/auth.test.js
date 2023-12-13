const request = require('supertest');
const mongoose = require('mongoose');
const server = require('./index');

var uid = '';
describe('User routes', () => {

  it('Creates a new user', async () => {
    const res = await request(server)
      .post('/users')
      .send({
        email: 'test@test.com',
        password: 'password'  
      });

    expect(res.statusCode).toEqual(200);
  }, 10000);

  it('Gets all users', async () => {
    const res = await request(server)
      .get('/users');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeDefined();
    uid = res.body._id;
  }, 10000);

});

describe('Data routes', () => {

  it('Gets data for a user', async () => {

    const res = await request(server)  
      .get('/users/:id/data');

    expect(res.statusCode).toEqual(200);
  }, 10000);

  it('Creates data for a user', async () => {

    const res = await request(server)
      .post('/users/:id/data1')
      .send({
        _userId: uid,
        data: []
      });

    expect(res.statusCode).toEqual(200);
  }, 10000);

});

beforeAll(done => {
  done()
})

afterAll(done => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close()
  done()
})