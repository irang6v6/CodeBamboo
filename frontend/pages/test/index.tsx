import React, { useEffect } from 'react';
import Authapi from '@/hooks/api/axios.authorization.instance';

const TestComponent: React.FC = () => {

  // Make an API request using Authapi
  const makeApiRequest = async () => {
    try {
      const response = await Authapi.get('/user'); // Replace with the desired API endpoint
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Call the API request on component mount
  useEffect(() => {
    makeApiRequest();
  }, []);

  return (
    <div>
      <h1>Test Component</h1>
    </div>
  );
};

export default TestComponent;
