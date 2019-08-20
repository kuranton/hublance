const pool = require('../util/db');

module.exports = class Shoes {
    constructor(photo_url, title, name, rate, country, about, user_id) {
        this.photo_url = photo_url;
        this.title = title;
        this.name = name;
        this.rate = rate;
        this.country = country;
        this.about = about;
        this.user_id = user_id;
 }
    static getFreelancers(){
        return new Promise((resolve,reject)=>{
           
            pool.query('SELECT * from freelancers',
            (error, results, fields)=>{
                if (error){
                    console.log(error);
                    reject();
                }
                if (results){
                    resolve(results);
                }
            });
        });
    }
       

    static addNewFreelancer(photo_url, title, name, rate, country, about, user_id){
        return new Promise((resolve,reject)=>{
            pool.query('INSERT INTO freelancers (photo_url, title, name, rate, country, about, user_id) VALUES(?, ?, ?, ?, ?, ?, ?);',
             [photo_url, title, name, rate, country, about, user_id],
            (error, results, fields)=>{
                if (error){
                    console.log(error);
                    reject();
                }
                if (results){
                    resolve(results);
                }
            });
        });
    }

    static removeFreelancer(id){
        return new Promise((resolve,reject)=>{
            pool.query('DELETE FROM freelancers WHERE id = ?', [shoe],
            (error, results, fields)=>{
                if (error){
                    console.log(error);
                    reject();
                }
                if (results){
                    resolve(results);
                }
            });
        });
    }

    static editShoe(id, photo_url, title, name, rate, country, about, user_id){
        return new Promise((resolve,reject)=>{
            pool.query('UPDATE freelancers SET photo_url = ?, title = ?, name = ?, rate = ?, country = ?, about = ?, user_id = ? WHERE id = ?',
             [photo_url, title, name, rate, country, about, user_id, id],
            (error, results, fields)=>{
                if (error){
                    console.log(error);
                    reject();
                }
                if (results){
                    resolve(results);
                }
            });
        });
    }
    static getCertificatewithFreelancerId() {
        return new Promise((resolve,reject)=>{
           
            pool.query('SELECT * from freelancer_cert LEFT JOIN certificates ON freelancer_cert.certificate = certificates.cert_id',
            (error, results, fields)=>{
                if (error){
                    console.log(error);
                    reject();
                }
                if (results){
                    resolve(results);
                }
            });
        });
    }
  
  }