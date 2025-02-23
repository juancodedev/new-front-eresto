import React, { useEffect } from 'react';
import { Outlet } from 'react-router';

const TrackedOutlet: React.FC = () => {
    useEffect(() => {
        console.log('Outlet component has been rendered');
    }, []);

    return <Outlet />;
};

export default TrackedOutlet;