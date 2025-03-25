// src/Components/MovieCard.tsx
import styled from "styled-components";
import { motion } from "framer-motion";

const Movie = styled(motion.li)`
  float: left;
  width: 225px;
  height: 420px;
  margin: 10px 11px;
`;

const Img = styled(motion.img)`
  width: 220px;
  margin: 0px 2.5px;
  margin-right: 10px;
  border-radius: 15px;
`;

const MovieTitle = styled.h2`
  color: #dcdcdc;
  text-align: center;
  margin: 15px 0px;
  word-break: keep-all;
  font-size: 20px;
  font-weight: 500;
`;

const MovieDetailVar = {
  start: { opacity: 0, y: 100 },
  end: { opacity: 1, y: 0 },
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    y: -30,
  },
};

interface MovieCardProps {
  id: number;
  title: string;
  posterPath: string;
  onClick: (id: number) => void;
}

function MovieCard({ id, title, posterPath, onClick }: MovieCardProps) {
  return (
    <Movie variants={MovieDetailVar}>
      <Img
        layoutId={id + ""}
        variants={boxVariants}
        initial="normal"
        whileHover="hover"
        onClick={() => onClick(id)}
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
      />
      <MovieTitle>{title}</MovieTitle>
    </Movie>
  );
}

export default MovieCard;
