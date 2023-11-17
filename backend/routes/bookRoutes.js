import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// create new book route
router.post('/', async (req, res) => {
    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };
        const book = await Book.create(newBook);

        return res.status(200).send(book);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });
    }
});

//books list route
router.get('/', async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });

    }
});

//book by ID route
router.get('/:id', async (req, res) => {
    try {

        const id = req.params.id;
        const bookId = await Book.findById(id);

        return res.status(200).json(bookId);

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });

    }
});

//update a book route
router.put('/:id', async (req, res) => {

    try {
        if (
            !req.body.title ||
            !req.body.author ||
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publishYear'
            });
        }
        const id = req.params.id;
        const result = await Book.findByIdAndUpdate(id, req.body);

        if(!result){
            return res.status(404).json({message:'Book not found'})
        }

        return res.status(200).send({message:'Book update succefully'});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });

    }

});

//delete a book route
router.delete('/:id', async (req, res) => {

    try {
        
        const id = req.params.id;
        const result = await Book.findByIdAndDelete(id);

        if(!result){
            return res.status(404).json({message:'Book not found'})
        }

        return res.status(200).send({message:'Book deleted succefully'});

    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message });

    }

});

export default router;