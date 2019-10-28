import React, {useState, useEffect} from 'react'
import BookService from '../../services/book.service';
import { Container, Grid } from '@material-ui/core';
import BookItem from './book-item/book-item';
import { QueryBook } from '../../models/query-books.model';
import { connect } from 'react-redux';
import { BookModel } from '../../models';

const bookService = new BookService();

const BookList = ({query}: any) => {

   const [books, setBookList] = useState<BookModel[]>([])

   const getBooks = async () => {
        const booklist = await bookService.getBooks(query);
        setBookList(booklist)
   }
   useEffect(()=> {
        getBooks();
    }, [query])

   console.log(books);

    const booksList =  books.map((book)=> {
        return <BookItem 
                    key={book.id}
                    title={book.title} 
                    price={book.price} 
                    authors={book.authors} 
                    genre={book.genre}  
                    description={book.description}
                    coverUrl={book.coverUrl} 
                    type={book.type}
                    /> 
    })
    return(
        <Container>
            <Grid container direction="row">
                {booksList}
            </Grid>
        </Container>
    )
}

const mapStateToProps = (state: QueryBook) => {
   return {
       query: state
   }
}

export default connect(mapStateToProps)(BookList)

   /*  */