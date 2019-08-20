const pool = require('../util/db');

module.exports = class Shoes {
    constructor(certificates, img) {
        this.certificates = certificates;
        this.img = img;      
    }
    static getCertificates(){
        return new Promise((resolve,reject)=>{
           
            pool.query('SELECT * from certificates',
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
       

    static addNewCertificate(certificates, img){
        return new Promise((resolve,reject)=>{
            pool.query('INSERT INTO certificates (certificates,img) VALUES(?, ?);', [certificates, img],
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

    static removeCertificate(id){
        return new Promise((resolve,reject)=>{
            pool.query('DELETE FROM certificates WHERE id = ?', [id],
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

    static editCertificate(id, certificates, img){
        return new Promise((resolve,reject)=>{
            pool.query('UPDATE certificates SET certificates = ?, img = ? WHERE id = ?', [certificates, img],
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