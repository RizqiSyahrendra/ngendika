const errorMessage = (error) => {
    let errMessage = 'something went wrong';
    if (error.response) {
        const {data} = error.response;
        errMessage = data.message ? data.message : error.message;
    }
    else {
        errMessage = error.message;
    }

    return errMessage;
}

export default errorMessage;