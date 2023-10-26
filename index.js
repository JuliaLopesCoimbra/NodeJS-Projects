const express = require('express');

const server = express();

server.use(express.json());
//query params = ?nome=NodeJs
//route params = /curso/2
// request body = {nome: 'NodeJs', tipo: 'Backend'}

// localhost:3000/curs0

//CRUD = Create, Read, Update, delete

const cursos = ['Node JS', 'JavaScript', 'React Native'];

//middleware global
server.use('/cursos', (req,res, next)=>{
    console.log(`URL: ${req.url}`);

    return next();
});


function checkCurso(req,res,next){
    if(!req.body.name){
        return res.status(400).json({error: "Nome do curso é obrigatório"})
    }
    return next();
}

function checkIndexCurso(req,res,next){
    const curso = cursos[req.params.index];
    if(!curso){
        return res.status(400).json({error: "O usuário não existe"});

    }
    return next();
}

server.get('/cursos',checkIndexCurso,(req,res)=>{
    return res.json(cursos);
});


server.get('/cursos/:index', (req, res) =>{
    const {index} = req.params;

    return res.json(cursos[index]);
});

server.post('/cursos',checkCurso, (req,res)=>{
    const {name} = req.body;
    cursos.push(name);

    return res.json(cursos)
});


//atualizando um curso
server.put('/cursos/:index', checkCurso,checkIndexCurso,(req,res)=>{
    const{index}=req.params;
    const{name}=req.body;

    cursos[index]=name
    return res.json(cursos);
})

//excluindo um curso
server.delete('/cursos/:index', checkIndexCurso,(req,res)=>{
    const{index} = req.params;

    cursos.splice(index,1);
    return res.json({message: "curso deletado"});
})
server.listen(3000);
