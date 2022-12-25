export * from './card';

/**
 * @apiDefine validatedError
 *
 * @apiError (422) validatedError This class was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 422 Validated Error
 *     {
 *        "error": "cardId is required"
 *        "detail": "cardId is required"
 *     }
 *
 */

/**
 * @apiDefine cardNotFoundError
 *
 * @apiError (404) cardNotFound This card id was not found.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Validated Error
 *     {
 *        "message": "Card Not Found"
 *     }
 *
 */