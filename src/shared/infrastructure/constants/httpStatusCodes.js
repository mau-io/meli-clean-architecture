const HTTP_STATUS_CODES = {
  // 2xx Success
  /**
   * HTTP 200 OK: The request has succeeded.
   */
  OK: 200,
  /**
   * HTTP 201 Created: The request has been fulfilled and a new resource has been created.
   */
  CREATED: 201,
  /**
   * HTTP 202 Accepted: The request has been accepted for processing, but the processing has not been completed.
   */
  ACCEPTED: 202,
  /**
   * HTTP 204 No Content: The server has successfully fulfilled the request and there is no additional content to send in the response payload body.
   */
  NO_CONTENT: 204,

  // 3xx Redirection
  /**
   * HTTP 301 Moved Permanently: This and all future requests should be directed to the given URL.
   */
  MOVED_PERMANENTLY: 301,
  /**
   * HTTP 302 Found: The requested resource is located temporarily under a different URL.
   */
  FOUND: 302,
  /**
   * HTTP 303 See Other: The response to the request can be found under a different URL.
   */
  SEE_OTHER: 303,
  /**
   * HTTP 307 Temporary Redirect: The requested resource is temporarily located at a different URL.
   */
  TEMPORARY_REDIRECT: 307,
  /**
   * HTTP 308 Permanent Redirect: The requested resource permanently resides under a different URL.
   */
  PERMANENT_REDIRECT: 308,

  // 4xx Client errors
  /**
   * HTTP 400 Bad Request: The server cannot or will not process the request due to client error.
   */
  BAD_REQUEST: 400,
  /**
   * HTTP 401 Unauthorized: The request requires user authentication or the user is not authorized to access the requested resource.
   */
  UNAUTHORIZED: 401,
  /**
   * HTTP 402 Payment Required: Reserved for future use.
   */
  PAYMENT_REQUIRED: 402,
  /**
   * HTTP 403 Forbidden: The server understood the request but refuses to authorize it.
   */
  FORBIDDEN: 403,
  /**
   * HTTP 404 Not Found: The requested resource could not be found.
   */
  NOT_FOUND: 404,
  /**
   * HTTP 405 Method Not Allowed: The request method is not supported for the requested resource.
   */
  METHOD_NOT_ALLOWED: 405,
  /**
   * HTTP 406 Not Acceptable: The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.
   */
  NOT_ACCEPTABLE: 406,
  /**
   * HTTP 408 Request Timeout: The server timed out waiting for the request.
   */
  REQUEST_TIMEOUT: 408,
  /**
   * HTTP 409 Conflict: The request could not be completed due to a conflict with the current state of the resource.
   */
  CONFLICT: 409,
  /**
   * HTTP 411 Length Required: The server requires the request to be long.
   */
  LENGTH_REQUIRED: 411,
  /**
   * HTTP 412 Precondition Failed: The server does not meet one of the preconditions specified in the request.
   */
  PRECONDITION_FAILED: 412,
  /**
   * HTTP 413 Payload Too Large: The server refuses to process the request because the payload is too large.
   */
  PAYLOAD_TOO_LARGE: 413,
  /**
   * HTTP 414 URI Too Long: The server refuses to process the request because the URI is too long.
   */
  URI_TOO_LONG: 414,
  /**
   * HTTP 415 Unsupported Media Type: The server refuses to accept the request because the payload format is in an unsupported media type.
   */
  UNSUPPORTED_MEDIA_TYPE: 415,
  /**
     * HTTP 416 Range Not Satisfiable: The server cannot provide the requested range of the resource.
     */
  RANGE_NOT_SATISFIABLE: 416,
  /**
     * HTTP 417 Expectation Failed: The server cannot meet the requirements specified in the Expect request header field.
     */
  EXPECTATION_FAILED: 417,
  /**
     * HTTP 422 Unprocessable Entity: The server understands the content type of the request entity, but cannot process the request due to semantic errors.
     */
  UNPROCESSABLE_ENTITY: 422,
  /**
     * HTTP 423 Locked: The source or destination resource of a method is locked.
     */
  LOCKED: 423,
  /**
     * HTTP 424 Failed Dependency: The method could not be performed on the resource because the requested action depends on another action and that action failed.
     */
  FAILED_DEPENDENCY: 424,
  /**
     * HTTP 425 Too Early: The server is unwilling to risk processing a request that might be replayed.
     */
  TOO_EARLY: 425,
  /**
     * HTTP 426 Upgrade Required: The server refuses to perform the request using the current protocol but might be willing to do so after the client upgrades to a different protocol.
     */
  UPGRADE_REQUIRED: 426,
  /**
     * HTTP 428 Precondition Required: The server requires the request to be conditional.
     */
  PRECONDITION_REQUIRED: 428,
  /**
     * HTTP 429 Too Many Requests: The user has sent too many requests in a given amount of time.
     */
  TOO_MANY_REQUESTS: 429,
  /**
     * HTTP 431 Request Header Fields Too Large: The server is unwilling to process the request because the request headers are too large.
     */
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  /**
     * HTTP 451 Unavailable For Legal Reasons: The server is denying access to the resource as a consequence of a legal demand.
     */
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  
  // 5xx Server errors
  /**
     * HTTP 500 Internal Server Error: A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
     */
  INTERNAL_SERVER_ERROR: 500,
  /**
     * HTTP 501 Not Implemented: The server either does not recognize the request method, or it lacks the ability to fulfill the request.
     */
  NOT_IMPLEMENTED: 501,
  /**
     * HTTP 502 Bad Gateway: The server was acting as a gateway or proxy and received an invalid response from the upstream server.
     */
  BAD_GATEWAY: 502,
  /**
     * HTTP 503 Service Unavailable: The server is currently unavailable (overloaded or down).
     */
  SERVICE_UNAVAILABLE: 503,
  /**
     * HTTP 504 Gateway Timeout: The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
     */
  GATEWAY_TIMEOUT: 504,
  /**
     * HTTP 505 HTTP Version Not Supported: The server does not support the HTTP protocol version used in the request.
     */
  HTTP_VERSION_NOT_SUPPORTED: 505,
  /**
     * HTTP 508 Loop Detected: The server detected an infinite loop while processing the request.
     */
  LOOP_DETECTED: 508,
  /**
     * HTTP 510 Not Extended: Further extensions to the request are required for the server to fulfill it.
     */
  /**
    * HTTP 510 Not Extended: Further extensions to the request are required for the server to fulfill it.
    */
  NOT_EXTENDED: 510,
  /**
    * HTTP 511 Network Authentication Required: The client needs to authenticate to gain network access.
    */
  NETWORK_AUTHENTICATION_REQUIRED: 511
};
 
export default HTTP_STATUS_CODES;
 
  