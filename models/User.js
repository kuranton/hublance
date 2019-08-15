const pool = require('../util/db');

module.exports = class User {
    constructor(email, password, name) {
        this.email = email;
        this.password = password;      
        this.name = name;      
    }

    saveToDB(){
        return new Promise((resolve,reject)=>{
            //check if user already exists
            const checkDuplicate = new Promise((resolve, reject) => {
                pool.query('SELECT email FROM freelancers WHERE email = ?', [this.email], (error, results, fields) => {
                    if (results[0]){ //if found in table, reject
                        reject();
                    } else { //otherwise resolve
                        resolve();
                    }
                });
            });

            checkDuplicate.then(()=>{ //if user does not exist, create new user
                pool.query('INSERT INTO freelancers ' +
                '(email, password, name) ' + 
                'VALUES (?, ?, ?);', 
                [this.email, this.password, this.name],
                (error, results, fields)=>{
                    if (error){
                        console.log(error);
                    }
                    if (results){
                        console.log(results);
                        resolve();
                    }
                });
            },()=>{
                console.log('User already exists');
                reject();
            });
        });
    }
    
    //for purpose of verifying credentials
    static findByEmail(email) {
        return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM freelancers WHERE email = ?', 
        [email],
        (error, results, fields)=>{
            if (results[0]){ //if found in table, resovle with found password
                resolve({id : results[0]['id'], 
                        email : results[0]['email'],
                        password : results[0]['password'],
                        firstName : results[0]['name']});
            } else { //otherwise reject
                reject();
            }
        });
        });
    }

    static getUsers() {
        return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM freelancers',
        (error, results, fields)=>{
            if (results){ //if found in table, resovle with found password
                resolve(results);
            } else { //otherwise reject
                reject();
            }
        });
        });
    }

}