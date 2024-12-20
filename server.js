const express = require ('express');
const app = express();
const port = 9090;
const db =require('./db');

app.set("view engine", "ejs");
app.use(express.static('public'));
//app.use(express.static(path.join(__dirname,'./public')));
app.use(express.urlencoded({extended: true}));
// some changes
app.get('/list',(req,res)=>{
    res.render('items')
});
app.get('/',(req,res)=>{
    res.render('home')
});

app.get('/todo',(req,res)=>{
    res.render('todo');
});
app.get('/contact',(req,res)=>{
    res.render('contact');
});

app.get('/items',(req,res)=>{
    db.all('SELECT * FROM todo', [], (err, rows) => {
        if (err) {
        res.status(500).send('internal Server Error:', err.message);
        } else {
             console.log('data::::>>>>',rows);
           // res.send(`items get sucessfully`);
             return res.render('items', {items: rows});
        };
    });    
});
 app.post('/todo',(req,res)=>{
    const{todo}= req.body;
    if(!todo){
        res.status(301).send(`All input are required`);
    } else{
        const sql = `INSERT INTO todo(name) VALUES(?)`;
        db.run(sql,[todo],(err)=>{
            if(err){
                res.status(500).send(`internal server error:: enable to insert into table`)
            }else{
                console.log(`inserted sucessfully`)
                return res.redirect('/items');
            }
        });
    }
 });



 app.get('/done/:id',(req,res)=>{
    const {id}= req.params;
    const sql = `UPDATE todo SET done = 1 WHERE id = ?`;
    db.run(sql,[id],(err)=>{
        if(err){
            res.status(501).send(`Internal Error:: Fail to check.`)
        } else{

            console.log(`done with the list of item:: %{id}`)
            res.redirect('/items');
        }
    });
 });





 app.get('/delete/:id',(req,res)=>{
    const {id} = req.params;
    const sql = (`DELETE FROM todo WHERE id = ?`);
    db.run(sql,[id],(err)=>{
        if(err){

            res.status(500).send(`enable to delete from the todo`)
        } else{
            console.log(`deleted sucessfully`);
            res.redirect('/items');
        }
    });

 });


    
   















app.use((req,res)=>{
    res.status(501).send(`<h2>invalid route</h2>`);
});
 app.listen(port,()=>{
    console.log(`server listening to port:: ${port}`)
 });
