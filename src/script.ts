import express from 'express'
import path from 'path'
import methodOverride  from 'method-override'  //for supporting put and delete
import {addtodo,gettodo,getcomptodo,updatetodo,checked,deletetodo,inc,dec} from "./controller";
const app=express();
app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

app.set('view engine', 'hbs');

app.get("/",async(req,res)=>{
    try {
        let alltodo = await gettodo();
        let completedTodo = await getcomptodo();
        let len=alltodo.length;
        let id=alltodo[len-1];
        console.log(id);
        res.render("todo", { alltodo, completedTodo,len,id});
    } catch (err) {
        console.log(err);
        res.status(500).send("Internal Server Error");
    }
})
app.post("/",async (req,res)=>{
    try{
        let {title}=req.body;
        let newTodo=await addtodo(title);
        console.log(newTodo);
        res.redirect("/");
        // res.status(200).send("Todo added successfully");
        
    }
    catch(err){
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

app.delete("/:id",async (req,res) => {
    try{
    let id=parseInt(req.params.id);
    console.log(id);
    await deletetodo(id);
    res.redirect("/");
    }
    catch(err){
        res.send(err);
    }

})

app.put("/:id",async (req,res) => {
    try{
    let id=parseInt(req.params.id);
    let data=req.body;;
    console.log(data);
    await updatetodo(id,data.title);
    res.redirect("/");
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
})
app.post("/:id",async (req,res) => {
    try{
    let id=parseInt(req.params.id);
    await checked(id);
    res.redirect("/")
    }
    catch(err){
        console.log(err);
        res.json(err);
    }
})
app.post("/inc/:id",async (req,res) => {
    let id=parseInt(req.params.id);
    await inc(id);
    res.redirect("/");

})
app.post("/dec/:id",async (req,res) => {
    let id=parseInt(req.params.id);
    await dec(id);
    res.redirect("/");

})
app.listen(3000, () => {
    console.log('Server started at port: 3000');
  });