var express = require('express');
// const { response } = require('../app');
var router = express.Router();
var classicLineModel = require('../models.js')
const mongoose = require('mongoose');
const db = mongoose.connection;


/* GET home page. */
router.get('/', async function(req, res, next) {
  let classicLines = await classicLineModel.find();
  // console.log(classicLines);
  try{ 
    return res.render("homePage", { title: "Classic Lines", classicLines, status: 200 });
  }catch(error){
    return res.status(500).send(error);
  }
});

/* GET new message page. */
router.get("/create-new", function (req, res, next) {
  return res.render("createPage", {status: 200});
  // res.sendStatus(200);
});

router.get('/edit-:theOne', async (req, res) => {
  const GOT_collections = db.collection('classiclines');
  const theOne = await GOT_collections.findOne({name:req.params.theOne});
  return res.render('editPage', {theOne, status: 200});
})

/* Post after clicking submit button */
router.post('/create-new', async (req, res, next) => {
  const classicLine = new classicLineModel(req.body);
  classicLine.time = new Date();
  try{
    await classicLine.save();
    // res.redirect('/');
    return res.redirect('/')
  } catch(error){
    res.status(500).send(error);
  }
})

router.post('/edit-old', async (req, res) => {
  const GOT_collections = db.collection('classiclines');
  // console.log(req.body);
  await GOT_collections.findOneAndUpdate(
    { name: req.body.name },
    {
      $set: {
        name: req.body.name,
        lines: req.body.lines,
        time: new Date(),
      }
    },
    {
      upsert: true
    })
    .then(result => {
      res.redirect('/');
     })
    .catch(error => console.error(error))
  
  } )

router.put('/edit-:theOne', async (req, res) => {
  try{
    // console.log(`Here shows req.params.theOne ${req.params.theOne}`);
    // console.log(req.body.name);
    res.send({ redirectTo: `/edit-${req.params.theOne}`, editTarget: req.body });
  } catch(error){
    res.status(500).send(error);
  }
})

router.delete('/delete-one', async (req, res) => {
  const GOT_collections = db.collection('classiclines');
  try{
    await GOT_collections.deleteOne({name: req.body.name})
    // console.log('Delete success');
    return res.sendStatus(200);
  } catch(error) {
    console.error(error)
  };
});

module.exports = router;



// let data = [];

// for(let i=0; i<100; i++){
//   data[i] = {
//     name: `user${i}`,
//     lines: `${i} How are you, my fellow`,
//     time: new Date()
//   }
// }

// router.get('/populateData', async (req, res) => {
//   for(let i=0; i<100; i++){
//     const classicLine = new classicLineModel(data[i]);
//     await classicLine.save();
//   }
//   return res.redirect(200);
// })