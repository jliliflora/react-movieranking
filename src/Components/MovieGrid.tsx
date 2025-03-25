import styled from "styled-components";
import { motion } from "framer-motion";
import MovieCard from "./MovieCard";
import { IMovie } from "../api";

const MovieList = styled(motion.ul)`
  padding: 0px;
  position: relative;
  top: -100px;
`;

const MovieVariants = {
  start: {},
  end: {
    transition: {
      delayChildren: 0.7,
      staggerChildren: 0.1,
    },
  },
};

interface MovieGridProps {
  movies: IMovie[];
  onBoxClick: (id: number) => void;
}

function MovieGrid({ movies, onBoxClick }: MovieGridProps) {
  return (
    <MovieList variants={MovieVariants} initial="start" animate="end">
      {movies.map((mov) => (
        <MovieCard
          key={mov.id}
          id={mov.id}
          title={mov.original_title}
          posterPath={mov.poster_path}
          onClick={onBoxClick}
        />
      ))}
    </MovieList>
  );
}

export default MovieGrid;
