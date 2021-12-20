class ExpressError extends Error {
	constructor(messages, status) {
		super();
		this.messages = messages;
		this.status = status;
	}
}

const catchAsync = (func) => {
	return (req, res, next) => {
		func(req, res, next).catch(next);
	};
};

const errorHandler = (err, req, res, next) => {
	const { status = 500 } = err;
	if (!err.messages) err.messages = ["Oh, no! Something went wrong!"];
  const errors = {
    messages: err.messages,
    status
  }
  return  res.status(status).send({ errors });
};

module.exports = {
	ExpressError,
	errorHandler,
	catchAsync,
};