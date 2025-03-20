import { useQuery } from "react-query";
import styled from "styled-components";
import { getPopular, IGetMoviesResult, IMovieDetail, makeBgPath } from "../api";
import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useHistory, useRouteMatch } from "react-router-dom";
import MovieModal from "../Components/MovieModal";

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

const Banner = styled(motion.div)<{ bgPhoto: string }>`
  height: 100vh;
  // background-color: red;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
`;

const BannerTitle = styled(motion.h3)`
  font-size: 15px;
  color: #acacac;
`;

const Title = styled(motion.h2)`
  font-size: 68px;
  margin-bottom: 20px;
`;

const Overview = styled(motion.p)`
  font-size: 20px;
  width: 50%;
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

const bannerVariants = {
  start: { opacity: 0 },
  end: {
    opacity: 1,
    transition: {
      duration: 0.7,
      delayChildren: 0.4,
      staggerChildren: 0.1,
    },
  },
};

const bannerDetailVar = {
  start: {
    opacity: 0,
    y: 50,
  },
  end: {
    opacity: 1,
    y: 0,
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

function Popular() {
  const history = useHistory();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "popular"],
    getPopular
  );
  // console.log(data, isLoading);

  const bigMovieMatch = useRouteMatch<{ movieId: string }>("/movies/:movieId");
  const { scrollY } = useViewportScroll();
  const onBoxClicked = (movieId: number) => {
    history.push(`/movies/${movieId}`);
  };
  const onOverlayClick = () => history.push("/");

  // const clickedMovie =
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
          <Banner
            bgPhoto={makeBgPath(data?.results[0].backdrop_path || "")}
            variants={bannerVariants}
            initial="start"
            animate="end"
          >
            <BannerTitle variants={bannerDetailVar}>Popular</BannerTitle>
            <Title variants={bannerDetailVar}>{data?.results[0].title}</Title>
            <Overview variants={bannerDetailVar}>
              {data?.results[0].overview}
            </Overview>
          </Banner>
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

export default Popular;
