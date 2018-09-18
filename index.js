/**
 * Responds to any HTTP request.
 *
 * @param {!Object} req HTTP request context.
 * @param {!Object} res HTTP response context.
 */

exports.meteo = (req, res) => {
  res.end("Hello World!")
}
