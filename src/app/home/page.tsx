import NavBar from '@/components/NavBar';
import { Fragment } from 'react';
import Weather from '@/app/weather/page';

const Home = () => {
  return (
    <Fragment>
      <NavBar />
      <Weather />
    </Fragment>
  );
};

export default Home;
