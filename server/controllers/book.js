let createError = require('http-errors');

// create a reference to the model
let Book = require('../models/book');

module.exports.displayBookList = (req, res, next) => {
    Book.find((err, bookList) => {
        if(err)
        {
            return console.error(err);
        }
        else
        {
            //console.log(BookList);

            res.render('book/list', {title: 'Books', BookList: bookList});      
        }
    });
}

module.exports.displayAddPage = (req, res, next) => {
    res.render('book/add', {title: 'Add Book'});
}

module.exports.processAddPage = (req, res, next) => {
    let newBook = Book({
        "name": req.body.name,
        "author": req.body.author,
        "published": req.body.published,
        "description": req.body.description,
        "price": req.body.price
    });

    Book.create(newBook, (err, Book) =>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            // refresh the book list
            res.redirect('/book-list');
        }
    });

}

module.exports.displayEditPage = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) throw new Error("Book not found");
        res.render('book/edit', { title: "Edit Book", book });
    } catch (err) {
        next(createError(404));
    }
};

module.exports.processEditPage = async (req, res, next) => {
    try {
        console.log(req.body)
        await Book.findByIdAndUpdate(req.params.id, req.body);
        res.redirect("/book-list");
    } catch(error) {
        res.end(error);
    }
};

module.exports.processDeletePage = async (req, res, next) => {
    try {
        console.log(req.params.id)
        await Book.deleteOne({ "_id": req.params.id });
        res.redirect("/book-list");
    } catch(error) {
        res.end(error);
    }
};

