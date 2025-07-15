import React from 'react';
import DashboardPie from './DashBoardPie';
import { Helmet } from 'react-helmet';

const StatisticsPage = () => {
    return (
        <div className='' >
                          <Helmet>
                                <title> Dashboard| Admin</title>
                           </Helmet>

            <DashboardPie></DashboardPie>
           
        </div>
    );
};

export default StatisticsPage;