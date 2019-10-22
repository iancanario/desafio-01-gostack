const express = require('express');
const server = express();

server.use(express.json());

const projects = [];

function checkIdExist (req, res, next){
    const {id} = req.params;
    const Projects = projects.find(Id => Id.id == id);
    
    if(!Projects){
        return res.status(400).json({error: 'Id não existe'})
    }
    return next();
}

function logRequest (req, res, next){
    console.count("Quantidade de requisições");

    return next();
}

server.use(logRequest);

server.post('/projects', (req, res) => {

    const{id, title} = req.body;

    const project =    {
        id,
        title,
        tasks: []
    }

    projects.push(project);

    return res.json(projects);  

});

server.get('/projects', (req, res) => {
    return res.json(projects);
})

server.put('/projects/:id', checkIdExist, (req, res) => {
    const { id } = req.params;
    const { title } = req.body;
    const Projects = projects.find(Id => Id.id === id);
   
    Projects.title = title;

    return res.json(projects);    
});

server.delete('/projects/:id', checkIdExist, (req, res) => {
    const { id } = req.params;
    const Projects = projects.findIndex(Id => Id.id === id);
  
    projects.splice(Projects, 1);

    return res.json(projects);
});

server.post('/projects/:id/tasks', checkIdExist, (req, res) => {
    const { id } = req.params;
    const { title } = req.body
    const Projects = projects.find(Id => Id.id === id);

    Projects.tasks.push(title);

    return res.json(projects);
});

server.listen(3000);