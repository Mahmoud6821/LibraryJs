import { ErrorClass } from "../utils/error-class.utils.js";

/**
 * A middleware to catch and handle errors that might occur in async handlers
 * @param {function} API - The async handler function
 * @returns {function} - A middleware function to handle errors
 */
export const errorHandler = (API) => {
  /**
   * A middleware function to handle errors in async handlers
   */
  return (req, res, next) => {
    API(req, res, next)?.catch((err) => {
      console.log("Error in async handler scope", err);
      next(
        new ErrorClass(
          "Internal Server error",
          { status: 400 },
          err.message,
          err.stack
        )
      );
    });
  };
};
// export const errorHandler = (API) => {
//   return (req, res, next) => {
//     API(req, res, next)?.catch((err) => {
//       console.error(`Error in async handler scope: ${req.method} ${req.url}`, err);
//       const statusCode = err.statusCode || 500;
//       const errorResponse = {
//         message: err.message,
//         stack: err.stack,
//       };
//       res.status(statusCode).json(errorResponse);
//     });
//   };
// };
export const globaleResponse = (err, req, res, next) => {
  if (err) {
    res.status(err.status || 500).json({
      message: "Fail response",
      err_msg: err.message,
      err_location: err.location,
      err_data: err.data,
      err_stack: err.stack,
    });
  }
};
