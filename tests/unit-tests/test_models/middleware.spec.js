const is_user_auth = require('../../../middleware/is_user_auth');
const jwt = require('jsonwebtoken');
require('dotenv').config();

let token;
let userId = 6;

beforeAll(()=>{
    //issue a valid token
    token = jwt.sign(
        { user_id: userId
        }, process.env.JWT_SECRET, {expiresIn : '1h'});
});

describe('is_user_auth middleware', ()=>{
    test('must call next() and store user_id in res.locals if token is valid', ()=>{
        let req = {
            get: jest.fn().mockReturnValue(`Bearer ${token}`)
        }
        let res = {
            locals: {user_id: null}
        }
        let next = jest.fn();
        is_user_auth(req, res, next);
        expect(res.locals.user_id).toEqual(userId);
        expect(next).toBeCalled();
    });

    test('must throw error and not call next() if no authorization header has been set in request', ()=>{
        let errorMessage = 'Error authenticating user.';
        //mock request with authorization header not set
        let req = {
            get: jest.fn().mockReturnValue(null)
        }
        let res = {
            locals: {user_id: null}
        }
        let next = jest.fn();
        try{
            is_user_auth(req, res, next);            
        } catch (e){
            expect(e.message).toBe('Error authenticating user.');
        }
        expect(next).not.toBeCalled();
    });

    test('must throw error and not call next() if token is invalid', ()=>{
        token = 'not a valid token';
        let req = {
            get: jest.fn().mockReturnValue(`Bearer ${token}`)
        }
        let res = {
            locals: {user_id: null}
        }
        let next = jest.fn();
        try{
            is_user_auth(req, res, next);            
        } catch (e){
            expect(e.message).toBe('Error authenticating user.');
        }
        expect(next).not.toBeCalled();
    });
});

