import { AnimatePresence, useViewportScroll } from "framer-motion";
import { useQuery } from "react-query";
import styled from "styled-components";
import {
  IGetMoviesResult,
  IMovieDetail,
  getComingSoon,
  makeBgPath,
} from "../api";
import { useHistory, useRouteMatch } from "react-router-dom";
import MovieModal from "../Components/MovieModal";
import Banner from "../Components/Banner";
import MovieGrid from "../Components/MovieGrid";

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

function ComingSoon() {
  const history = useHistory();
  const { data, isLoading } = useQuery<IGetMoviesResult>(
    ["movies", "comingSoon"],
    getComingSoon
  );
  // console.log(data, isLoading);

  const bigMovieMatch = useRouteMatch<{ movieId: string }>(
    "/coming-soon/movies/:movieId"
  );
  const { scrollY } = useViewportScroll();
  const onBoxClicked = (movieId: number) => {
    history.push(`/coming-soon/movies/${movieId}`);
  };
  const onOverlayClick = () => history.push("/coming-soon");

  // const clickedMovieComSn =
  //   bigMovieMatch?.params.movieId &&
  //   data?.results.find((movie) => movie.id === +bigMovieMatch.params.movieId);
  // console.log(clickedMovieComSn);
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
            title={data?.results[0].title || ""}
            overview={data?.results[0].overview || ""}
          />
          <Container>
            <MovieGrid movies={data?.results || []} onBoxClick={onBoxClicked} />
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

export default ComingSoon;
