const request = require('supertest');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const server = require('./index');

// var uid = '';
// describe('Authentication API Tests', () => {
//   it('Sign up a new user', async () => {
//     const userData = {
//       email: 'testemail@gmail.com',
//       password: 'testPassword'
//     };

//     const response = await request(server)
//       .post('/users')
//       .send(userData);
//     console.log(response);
//     expect(response.statusCode).toBe(200);
//     expect(response.body.status).toBe('ok');
//     expect(response.body.email).toBe("testemail@gmail.com");
//   });

  // it('Authenticate a user', async () => {
  //   const userData = {
  //     email: 'hoteltablebook@gmail.com',
  //     password: 'testPassword'
  //   };

  //   const response = await request(server)
  //     .post('/signIn')
  //     .send(userData);

  //   expect(response.statusCode).toBe(200);
  //   expect(response.body.status).toBe('ok');
  //   expect(response.body.name).toBe("Test User"); // Assuming the name is returned upon successful login
  //   uid = response.body._id;
  // });
// });

// describe('Add Words Tests', () => {
//     it('Add Word in Dictionary', async () => {
//       const userData = {
//         userid: uid,
//         data: [],
//       };
  
//       const response = await request(server)
//         .post('/users/:id/data')
//         .send(userData);
  
//       expect(response.statusCode).toBe(200);
//       expect(response.body.status).toBe('ok');
//       expect(response.body._userID).toBe(uid);
//     }, 10000);
  
    // it('Add New Content in Document', async () => {
    //     const userData = {
    //         email: 'hoteltablebook@gmail.com',
    //         word: 'Article 370',
    //         meaning: 'Supreme Court uphelds the abrogation of Article 370'
    //     };
  
    //   const response = await request(server)
    //     .post('/addDoc')
    //     .send(userData);
  
    //   expect(response.statusCode).toBe(200);
    //   expect(response.body.status).toBe('ok');
    // }, 10000);
  // });

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