const express = require('express');
const router = express.Router();
const https = require('https');

const Freelancer = require('../models/Freelancer');
const Cert = require('../models/Cert');


const is_user_auth = require('../middleware/is_user_auth');
const Users = require('../models/User');

router.get('/get_freelancers',  (req, res, next) => {
    Freelancer.getFreelancers().then((resData) => {
        res.status(200).json({
            'freelancerList': resData 
         });
    })
})

router.get('/get_freelancerCertificates', (req, res, next) => {
    Freelancer.getCertificatewithFreelancerId().then((resData) => {
        res.status(200).json({
            'certificatesList': resData
            });
    })
})

// router.post('/edit_author', is_user_auth, (req, res, next) => {
//     Authors.editAuthor(req.body['id'], req.body['name'], req.body['photo_url'], req.body['location'], req.body['shortdetail'], req.body['detail']).then((shoesBrand)=>{
//         res.status(200).json({
//          });
//     })
// })

// router.post('/add_author', is_user_auth, (req, res, next) => {
//     Authors.addAuthor(req.body['name'], req.body['photo_url'], req.body['location'], req.body['shortdetail'], req.body['detail']).then((shoesBrand)=>{
//         res.status(200).json({
//          });
//     })
// })

// router.post('/remove_author', is_user_auth, (req, res, next) => {
//     console.log(req.body['id']);
//     Authors.removeAuthor(req.body['id']).then((shoesBrand)=>{
//         res.status(200).json({
//          });
//     })
// })


module.exports = router;