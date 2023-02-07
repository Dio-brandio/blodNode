const express = require('express');
const app = express();
const path = require('path')
const sqlconnection = require('../server/sql')
const router = express.Router()
const slugify = require('slugify')
const methodoverride = require('method-override')
app.use(express.urlencoded({ extended: true }))



const isUser = (req,res,next)=>{
    if(req.session.usermail){
        next()
    }
    else{
        res.redirect('/')
    }
}

app.use(express.urlencoded({ extended: false }))
router.use(express.urlencoded({ extended: false }))
app.use(methodoverride('_method'))

router.get('/', isUser,(req, res) => {
    sqlconnection.query(`SELECT * FROM articles ORDER BY articles.id DESC`,async(err,rows,feilds)=>{
        //  res.send(rows)
         res.render('home.pug',{user:'',article:rows})
    })
})
router.get('/all',(req, res) => {
    sqlconnection.query(`SELECT * FROM articles ORDER BY articles.id DESC`,async(err,rows,feilds)=>{
    const data = {"status":200,"message":"done","data":rows}
         res.send(data)
    })
    const articles=sqlconnection.query(`SELECT * FROM articles ORDER BY articles.id DESC`,(err,rows,feilds)=>{
        return rows
        })
})
router.get('/add',isUser, (req, res) => {
        res.render('add-article')
})

router.post('/add', (req, res) => {
    const {img} = req.files;
    const {title,author,catagory,description,date,time} = req.body
    const slug = slugify(title,{lower:true,strict:true})
    const img_src=slug+path.extname(img.name);
    sqlconnection.query(`SELECT * FROM articles WHERE slug='${slug}'`,(err,rows,feilds)=>{
        if (rows.length>0)
        {
            res.render('add-article',{message:"This title is taken.... Try a new title"})
        }
        else
        {
                try{
                    sqlconnection.query(`INSERT INTO articles(slug,title, author, date, time, catagory, description,img_src) VALUES ('${slug}','${title}','${author}','${date}','${time}','${catagory}','${description}','${img_src}')`, 
                    async (err,rows,fields)=>{
                        await img.mv(path.join(__dirname,"../public/uploads",img_src));
                    })
                    // res.send({"status":"200","data":"data has been saved"});
                    res.redirect('/articles')
                }catch(e){
                    res.render('add-article',{message:e})
                }
        }
    })
})
router.get('/edit/:slug',isUser,(req,res)=>{
    sqlconnection.query(`SELECT * FROM articles WHERE slug='${req.params.slug}'`,async(err,rows,feilds)=>{
        if(rows[0].length==0){ 
            res.redirect('/articles')
        }
        else{
            res.render('edit-article',{article:rows[0]})
        }
    })
})
router.post('/edit/:slug',isUser,(req,res)=>{
    const {title,author,catagory,description,date,time} = req.body
    const slug = slugify(title,{lower:true,strict:true})

    sqlconnection.query(`UPDATE articles SET slug='${slug}',title='${title}',author='${author}',date='${date}',time='${time}',catagory='${catagory}',description='${description}' WHERE slug='${req.params.slug}'`,async(err,rows,feilds)=>{
        if(err) throw err;
        res.redirect(`/articles/${slug}`)
    })
})

router.get('/:slug',isUser,(req,res)=>{
    sqlconnection.query(`SELECT * FROM articles WHERE slug='${req.params.slug}'`,async(err,rows,feilds)=>{
        if(rows.length==0){
            res.redirect('/articles')
        }else{
            res.render('show',{article:rows[0]})
        }
    })
})

router.post('/:slug',isUser,(req,res)=>{
    sqlconnection.query(`DELETE FROM articles WHERE slug='${req.params.slug}'`,async(err,rows,feilds)=>{
        res.redirect('/articles')
    })
})

module.exports = router

