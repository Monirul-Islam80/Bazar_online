import { Rating } from '@mui/material';
import React from 'react';
import profilePng from '../../images/Profile.png'
function ReviewCard({reviews}) {
    const options = {

        value: reviews.rating,
        readOnly:true,
        precision:0.5
    }
  return <>
  <div className="reviewCard">
      <img src={profilePng} alt="user" />
      <p>{reviews.name}</p>
      <Rating {...options}/>
      <span className='reviewCard_span'>{reviews.comment}</span>
  </div>
  </>;

}

export default ReviewCard;
