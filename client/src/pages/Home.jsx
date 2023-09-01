import { useQuery } from '@apollo/client';
import LoginPage from './LoginPage';


const Home = () => {


  return (
    <main>
      <div className="flex-row justify-center">
       
        <div className="col-12 col-md-8 mb-3">
          <LoginPage />
        </div>
      </div>
    </main>
  );
};

export default Home;
