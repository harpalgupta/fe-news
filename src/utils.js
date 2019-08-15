
import {  navigate } from '@reach/router';


export const handleErrors = (err) => {
  {
    const errcontent = {
      errstatus: err.response.status,
      errMsg: err.response.data.msg
    };
    navigate('/error', {
      state: {
        errcontent,
        replace: false
      }
    });
  }
};
