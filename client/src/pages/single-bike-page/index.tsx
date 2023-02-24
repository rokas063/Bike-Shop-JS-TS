import React from 'react';
import { useParams } from 'react-router-dom';

const SingleBikePage = () => {
  const { id } = useParams();

  console.log(id);
  return (
    <div>SingleBikePage</div>
  );
};

export default SingleBikePage;
