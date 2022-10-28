import * as React from 'react';
import { useEffect } from "react";
import { Typography, Divider } from '@mui/material';

const Title = (props) => {
    return (
        <React.Fragment>
            <Typography variant='h5'> {props.title} </Typography>
            <br /> <Divider /> <br />
        </React.Fragment>
    );
}

export default Title;