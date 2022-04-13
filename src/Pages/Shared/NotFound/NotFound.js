import React from 'react';
import notFound from '../../../images/404.jpg';

const NotFound = () => {
    return (
        <div>
            <h3 className='text-primary text-center'>Matching is sleeping</h3>
            <img src={notFound} alt='' />
        </div>
    );
};

export default NotFound;