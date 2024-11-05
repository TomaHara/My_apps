import { redirect } from 'next/navigation';

const Home = () => {
  redirect('/login');
  return null;
};

export default Home;
