const express = require('express');
const app = express();
const bcrypt = require('bcrypt')
const sqlconnection = require('../server/sql')
const router = express.Router()




app.use(express.urlencoded({ extended: false }))
router.use(express.urlencoded({ extended: false }))


router.get('/', (req, res) => {
    if(!req.session.usermail){
        res.render('login')
    }
    else{
        res.redirect('/articles');
    }
})

router.post('/', async (req, res) => {
const {email , password} = req.body;
    
const fetch_query = `SELECT * FROM users WHERE email = '${email}'`;
    sqlconnection.query(fetch_query, async (err, rows, feilds) => {
        if (await rows.length == 0) {
            res.render('login.pug', { usererr: "this email Dosent exist" })
        }
        else {
            const passMatch =await bcrypt.compare(password,rows[0].password);
            if(!passMatch){
                res.render('login.pug',{passerr:"password doesn't matched"})
            }
            else{
                const usermail = {
                    u_mail:email
                }
                req.session.usermail = usermail
                req.session.save()
                res.redirect('/articles')
            }
        }
})
})



router.post('/logout', (req, res) => {
    if (req.session.usermail) {
        res.redirect('/')
    }
    req.session.destroy((err)=>{
        if(err) throw err
    })
})
module.exports = router