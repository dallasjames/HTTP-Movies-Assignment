import React, { useEffect, useState } from "react";
import axios from 'axios';

function UpdateMovie(props) {
    const [movie, setMovie] = useState({
        title: '',
        director: '',
        metascore: '',
        stars: []
    })

    useEffect(()=> {
        axios.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
        .then(res => {
            setMovie(res.data)
        })
        .catch(err => {
            console.log(err)
        })
    }, [props.match.params.id])

    const handleChange = (e) => {
        setMovie({
            ...movie,
            [e.target.name]: e.target.value
        })
    }

    const handleSumbit = (e) => {
        e.preventDefault()

        axios.put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            props.history.push('/')
        })
        .catch(err => {
            console.log(err)
        })
    }

    const addStar = (e) => {
        e.preventDefault()
        setMovie({...movie, stars: [...movie.stars, '']})
    }

    const handleStar = index => e => {
        setMovie({...movie, stars: movie.stars.map((star, starIndex)=> {
            if (starIndex === index) {
                return e.target.value
            } else {
                return star;
            }
        })})
    }

    return (
        <form onSubmit={handleSumbit}>
            <input type='text' name='title' placeholder='Title' value={movie.title} onChange={handleChange} />
            
            <input type='text' name='director' placeholder='Title' value={movie.director} onChange={handleChange} />

            <input type='text' name='metascore' placeholder='Title' value={movie.metascore} onChange={handleChange} />
            
            {movie.stars.map((starName, index)=> {
                return <input type="text"
                            placeholder="Star"
                            key={index}
                            value={starName}
                            onChange={handleStar(index)}
                            />
            })}
            <button type="submit"> Update Movie</button>
            <button onClick={addStar}> Add Star</button>
        </form>
    )
}

export default UpdateMovie