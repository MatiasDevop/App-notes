const express = require('express');
const router = express.Router();
const flash = require('connect-flash');

const Note= require('../models/Note');// this is to use model

router.get('/notes/add', (req, res)=>{
    res.render('notes/new-notes');
});

router.post('/notes/new-note', async (req, res) =>{
    const { title, description} = req.body;
    const errors = [];
    if(!title){
        errors.push({text: 'Please write a Title'});
    }
    if(!description){
        errors.push({text: 'Please write a description'});
    }
    if(errors.length > 0){
        res.render('notes/new-notes',{
            errors,
            title,
            description
        });
        console.log(errors);
    }else{
            const newNote = new Note({title, description});
            //console.log(newNote).then();
            await newNote.save(); //this await works to continiues with others tasks..
            req.flash('success_msg', 'Note add successfully')
            res.redirect('/notes');
    }
    //console.log(req.body);
    //res.send('deliverid..');
});

router.get('/notes', async (req, res)=>{

    const notes = await Note.find().sort({date: 'desc' });
    res.render('notes/all-notes',{ notes });
    //res.send('notes from DB');
});

router.get('/notes/edit/:id', async (req, res) =>{
     const note = await Note.findById(req.params.id);  
    res.render('notes/edit-note', {note});
});
router.put('/notes/edit-note/:id', async (req, res)=>{
    const {title, description} = req.body;
    await Note.findByIdAndUpdate(req.params.id, {title, description});
   // to use flassh
    req.flash('success_msg', 'Note updated successfully');
    res.redirect('/notes');
});
router.delete('/notes/delete/:id', async (req, res)=>{
    
       await Note.findByIdAndDelete(req.params.id);
    //use the flash
        req.flash('success_msg', 'Note delete successfully');
        res.redirect('/notes');
});

module.exports = router;