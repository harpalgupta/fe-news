
import { navigate } from '@reach/router';


const handleErrors = (err) => {
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

export default handleErrors;
