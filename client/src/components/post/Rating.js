import React, { useEffect, useState } from "react";
import StarRatings from 'react-star-ratings';


const Rating = (props) => {
    const [rating, setRating] = useState(5.5);

    function changeRating(newRating, name) {
        setRating(newRating);
        props.rateServiceProvider(newRating);
        // say thank you, remove rating and save it
    };

    return (
        <StarRatings
            rating={rating}
            starRatedColor="blue"
            changeRating={changeRating}
            numberOfStars={10}
            name='rating'
        />
    );
};

export default Rating;