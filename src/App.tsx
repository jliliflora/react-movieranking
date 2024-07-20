import React from 'react';
import Header from './Components/Header';
import { Route, Switch } from 'react-router-dom';
import Popular from './Route/Popular';
import ComingSoon from './Route/ComingSoon';
import NowPlaying from './Route/NowPlaying';

function App() {
  return (
    <>
      <Header />
      <Switch>
        <Route path="/coming-soon">
          <ComingSoon />
        </Route>
        <Route path="/now-playing">
          <NowPlaying />
        </Route>
        <Route path={["/", "/movies/:movieId"]}>
          <Popular />
        </Route>
      </Switch>
    </>
  );
}

export default App;
