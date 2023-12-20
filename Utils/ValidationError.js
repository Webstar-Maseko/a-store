const ValidationError = (error, res) =>{

    const validationErrors = Object.values(error.errors).map((err) => err.message);
    res.status(400).json({errors: validationErrors})
}

module.exports =ValidationError;