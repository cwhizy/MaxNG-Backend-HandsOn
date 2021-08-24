const express = require('express');
const moviesRouter = express.Router();
const axios = require('axios');

moviesRouter.get('', async(req, res) => {
    try {
        const moviesAPI = await axios.get('https://swapi.dev/api/films/');
        res.render('movie-lists', { movies : moviesAPI.data.results });
    } catch (err) {
        if(err.response) {
            res.render('movie-lists', { movies : null });
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if(err.request) {
            res.render('movie-lists', { movies : null });
            console.log(err.request);
        } else {
            res.render('movie-lists', { movies : null });
            console.error('Error', err.message);
        }
    } 
})

moviesRouter.get('/:id', async(req, res) => {
    let movieID = parseInt(req.params.id);
    try {
        const moviesAPI = await axios.get(`https://swapi.dev/api/films/${movieID}`);
        const countComments = await axios.get(`http://localhost:3000/comments/countComments/${movieID}`);
        const movieComments = await axios.get(`http://localhost:3000/comments/movieComments/${movieID}`);
        console.log(JSON.stringify(countComments.data));
        res.render('movie-detail', { 
            movie : moviesAPI.data,
            movieComments: movieComments.data,
            countComments: JSON.stringify(countComments.data)
         });
    } catch (err) {
        if(err.response) {
            res.render('movie-detail', { movie : null });
            console.log(err.response.data);
            console.log(err.response.status);
            console.log(err.response.headers);
        } else if(err.request) {
            res.render('movie-detail', { movie : null });
            console.log(err.request);
        } else {
            res.render('movie-detail', { movie : null });
            console.error('Error', err.message);
        }
    } 
})

module.exports = moviesRouter 