const app = require('../../app').app;
const pool = require('../../util/db');
const request = require('supertest');
const users_routes = require('../../routes/users');


afterAll(()=>{
    pool.end();
});

describe('new_user route', () => {
    const testuser = 'testuser';
    const testpassword = 'pass';
    const firstName = 'first'; 

    test('must create new user if user does not exist and return proper message',(done) => {
        // call route and make sure new user is created
        let doneCreatingAndTesting = new Promise((resolve, reject)=>{
            request(app)
            .post("/new_user")
            .set('Content-type','application/json')
            .send(JSON.stringify({email: testuser, 
                                password: testpassword,
                                firstName: firstName
                              }))
            .end(function(err, res) {
                expect(res.body.message).toBe('New user created');
                resolve();
            });
        }); 
        doneCreatingAndTesting.then(()=>{
            //check if user was created
            pool.query('SELECT email FROM freelancers WHERE email = ?', [testuser], (error, results, fields) => {
                if (results){
                    const emailFromDB = results[0].email;
                    expect(emailFromDB).toBe('testuser');
                    return results;
                } else { 
                    // console.log(error);
                    return error;
                }
            });
        }).then(()=>{
            //delete created user test user
            pool.query('DELETE FROM freelancers WHERE email = ?', [testuser], (error, results, fields) => {
                if (results){
                    // console.log(results);
                    done();
                } else {
                    // console.log(error);
                    done();
                }
            });
        });
    });

    test('must return a proper message if user already exists in DB', (done)=>{
        //create test user in DB
        const userCreated = new Promise((resolve, reject) => {
            pool.query('INSERT INTO freelancers ' +
            '(email, password, name) ' + 
            'VALUES (?, ?, ?);', [testuser, testpassword, firstName], (error, results, fields) => {
                if (results){
                    resolve();
                } else { 
                    // console.log(error);
                    resolve();
                }
            });
        });
        userCreated.then(()=>{
            let expectCompleted = new Promise((resolve, reject)=>{
                //send request to route, test response
                request(app)
                .post("/new_user")
                .set('Content-type','application/json')
                .send(JSON.stringify({email: testuser, 
                    password: testpassword,
                    firstName: firstName
                   }))
                .end(function(err, res) {
                    expect(res.body.message).toBe('User already exists');
                    resolve();
                });
            });
            expectCompleted.then(()=>{
                // delete test user from DB
                pool.query('DELETE from freelancers WHERE email = ?', [testuser], (error, results, fields) => {
                    if (results){
                        done();
                    } else { 
                        console.log(error);
                        done();
                    }
                });
            },(error)=>{
                console.log(error);
            });
        })
    });
});

describe('/log_in route', ()=>{
    //credentials of test user existing in DB
    let testuser = 'test@test.com';
    let testpassword = 'testtest';
    test('must return generated json web token upon successful credential check', (done)=>{
        request(app)
            .post('/log_in')
            .set('Content-type','application/json')
            .send({email: testuser, password: testpassword})
            .end(function(err, res) {
                let token = res.body.token;
                let expiresAt = res.body.expiresAt;
                expect(token).toBeDefined();
                expect(expiresAt).toBeDefined();
                done();
            });
    });

    test('must respond with correct message if user does not exist', (done)=>{
        let testuser = 'user that does not exist';
        request(app)
            .post('/log_in')
            .set('Content-type','application/json')
            .send({email: testuser, password: testpassword})
            .end(function(err, res) {
                expect(res.body.message).toBe('Invalid credentials');
                done();
            });
    });

    test('must respond with correct message if password is incorrect', (done)=>{
        let testpassword = 'wrong password';
        request(app)
            .post('/log_in')
            .set('Content-type','application/json')
            .send({email: testuser, password: testpassword})
            .end(function(err, res) {
                expect(res.body.message).toBe('Invalid credentials');
                done();
            });
    });
});