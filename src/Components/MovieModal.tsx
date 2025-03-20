import { motion } from "framer-motion";
import styled from "styled-components";
import { IMovieDetail, makeImagePath } from "../api";

interface MovieModalProps {
  movie?: IMovieDetail | null;
  onClose: () => void;
  scrollY: number;
}

const Overlay = styled(motion.div)`
  position: fixed; //스크롤을 내리면 오버레이가 안된 부분이 생겨서 fixed로 해줌
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const ModalMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  border-radius: 15px;
  background-color: #323232;
`;

const ModalTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 46px;
  font-weight: 550;
  position: relative;
  top: -80px;
`;

const ModalOverview = styled.p`
  padding: 20px;
  position: relative;
  top: -90px;
  color: ${(props) => props.theme.white.lighter};
`;

const ModalCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const ModalRelease = styled.p`
  padding: 20px;
  position: relative;
  top: -110px;
  color: ${(props) => props.theme.white.lighter};
`;

function MovieModal({ movie, onClose, scrollY }: MovieModalProps) {
  if (!movie) return null;

  return (
    <>
      <Overlay
        onClick={onClose}
        exit={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      />
      <ModalMovie style={{ top: scrollY + 100 }} layoutId={movie.id + ""}>
        <ModalCover
          style={{
            backgroundImage: `linear-gradient(to top, #323232, transparent), url(${makeImagePath(
              movie.backdrop_path
            )})`,
            borderRadius: "15px",
          }}
        />
        <ModalTitle>{movie.title}</ModalTitle>
        <ModalOverview>{movie.overview}</ModalOverview>
        <ModalRelease>
          last release: {movie.release_date} <br />
          Rating: {movie.vote_average.toFixed(2)}
        </ModalRelease>
      </ModalMovie>
    </>
  );
}

export default MovieModal;
