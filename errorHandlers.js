/*
  Catch Errors Handler

  With async/await, you need some way to catch errors
  Instead of using try{} catch(e) {} in each controller, we wrap the function in
  catchErrors(), catch and errors they throw, and pass it along to our express middleware with next()
*/

exports.catchErrors = fn => {
  return function(req, res, next) {
    console.log(
      "in catch errors with data",
      Math.floor(Date.now() / 1000),
      req.data
    );
    return fn(req, res, next).catch(next);
  };
};

/*
    Development Error Handler
    In development we show good error messages so if we hit a syntax error or any other previously un-handled error, we can show good info on what happened
  */
exports.developmentErrors = (err, req, res, next) => {
  err.stack = err.stack || "";
  const errorDetails = {
    message: err.message,
    status: err.status,
    stackHighlighted: err.stack.replace(
      /[a-z_-\d]+.js:\d+:\d+/gi,
      "<mark>$&</mark>"
    )
  };
  res.status(err.status || 500);
  res.format({
    // Based on the `Accept` http header
    "text/html": () => {
      res.render("error", errorDetails);
    }, // Form Submit, Reload the page
    "application/json": () => res.json(errorDetails) // Ajax call, send JSON back
  });
};

/*
    Production Error Hanlder

    No stacktraces are leaked to user
  */
exports.productionErrors = (err, req, res, next) => {
  console.log("PRODUCTION ERRORS");
  res.status(err.status || 500);
  res.render("error", {
    message: err.message,
    error: {}
  });
};
