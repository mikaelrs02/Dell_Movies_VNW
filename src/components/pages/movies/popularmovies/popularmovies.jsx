import React, { useState, useEffect } from "react";
import axios from "axios";
import * as S from "./popularmovies_style";

export default function EmAlta() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies();
  }, [movies]);

  const getMovies = async () => {
    await axios
      .get(
        "https://api.themoviedb.org/3/movie/popular?api_key=e433b470a7ecb593204d816511462773&language=pt-br-US&page=2"
      )
      .then((response) => {
        const Api = response.data.results.map((item) => {
          return {
            ...item,
            image: `https://image.tmdb.org/t/p/w500/${item.poster_path}`
          };
        });
        setMovies(Api);
        console.log(Api);
      })
      .catch((error) => {
        alert(`${error}`);
      });
  };

  return (
    <S.TopContainer>
      <h2>Em Alta</h2>
      {movies.map((item) => (
        <S.TopCard>
          <img src={item.image} alt={item.title} />
          <h3>{item.title}</h3>
          <span>{item.release_date}</span>
        </S.TopCard>
      ))}
    </S.TopContainer>
  );
}
