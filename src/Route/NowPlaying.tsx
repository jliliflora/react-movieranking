import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  IGetMoviesResult,
  IMovieDetail,
  getNowPlaying,
  makeBgPath,
} from "../api";
import { useHistory, useRouteMatch } from "react-router-dom";
import MovieModal from "../Components/MovieModal";
import Banner from "../Components/Banner";

const Wrapper = styled.div`
  background-color: black;
  padding-bottom: 200px;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  display: flex;
  max-width: 750px;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  /* border: 1px solid red; */
`;

const MovieList = styled(motion.ul)`
  padding: 0px;
  position: relative;
  top: -100px;
  /* border: 1px solid blue; */
`;
const Movie = styled(motion.li)`
  float: left;
  width: 225px;
  height: 420px;
  margin: 10px 11px;
  /* border: 1px solid white; */
`;

const Img = styled(motion.img)`
  width: 220px;
  margin: 0px 2.5px;
  margin-right: 10px;
  border-radius: 15px;
  /* border: 2px solid yellow; */
`;

const MovieTitle = styled.h2`
  color: #dcdcdc;
  text-align: center;
  margin: 15px 0px;
  word-break: keep-all;
  font-size: 20px;
  font-weight: 500;
  /* border: 1px solid blue; */
`;

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    y: -30,
  },
};

const MovieVariants = {
  start: {},
  end: {
    transition: {
      delayChildren: 0.7,
      staggerChildren: 0.1,
    },
  },
};

const MovieDetailVar = {
  start: { opacity: 0, y: 100 },
  end: { opacity: 1, y: 0 },
};

function NowPlaying() {
  const history = useHistory();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "nowPlaying"],
    getNowPlaying
  );
  // console.log(data, isLoading);

  const bigMovieMatch = useRouteMatch<{ movieId: string }>(
    "/now-playing/movies/:movieId"
  );
  const { scrollY } = useViewportScroll();
  const onBoxClicked = (movieId: number) => {
    history.push(`/now-playing/movies/${movieId}`);
  };
  const onOverlayClick = () => history.push("/now-playing");

  // const clickedMovieNowPly =
  //   bigMovieMatch?.params.movieId &&
  //   data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);
  // console.log(clickedMovie);
  const clickedMovie: IMovieDetail | null =
    bigMovieMatch?.params.movieId &&
    data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId)
      ? (data.results.find(
          (movie) => movie.id === +bigMovieMatch.params.movieId
        ) as IMovieDetail)
      : null;

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading ....</Loader>
      ) : (
        <>
          {/* <Banner
            bgPhoto={makeBgPath(data?.results[0].backdrop_path || "")}
            variants={bannerVariants}
            initial="start"
            animate="end"
          >
            <BannerTitle variants={bannerDetailVar}>NowPlaying</BannerTitle>
            <Title variants={bannerDetailVar}>{data?.results[0].title}</Title>
            <Overview variants={bannerDetailVar}>
              {data?.results[0].overview}
            </Overview>
          </Banner> */}
          <Banner
            bgPhoto={makeBgPath(data?.results[0].backdrop_path || "")}
            title={data?.results[0].title || ""}
            overview={data?.results[0].overview || ""}
          />
          <Container>
            <MovieList variants={MovieVariants} initial="start" animate="end">
              {data?.results.map((mov) => (
                <Movie variants={MovieDetailVar}>
                  <Img
                    layoutId={mov.id + ""}
                    key={mov.id}
                    variants={boxVariants}
                    initial="normal"
                    whileHover="hover"
                    onClick={() => onBoxClicked(mov.id)}
                    src={`https://image.tmdb.org/t/p/w500${mov.poster_path}`}
                  />
                  <MovieTitle>{mov.original_title}</MovieTitle>
                </Movie>
              ))}
            </MovieList>
          </Container>
          <AnimatePresence>
            {bigMovieMatch ? (
              <MovieModal
                movie={clickedMovie}
                onClose={onOverlayClick}
                scrollY={scrollY.get()}
              />
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
}

export default NowPlaying;
