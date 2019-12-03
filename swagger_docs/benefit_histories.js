 //find benefit history by id
 /**
  * @swagger
  * /benefit/histories/:id:
  *   get:
  *     tags:
  *       - Benefit histories
  *     name: Find benefit history by id
  *     summary: Find a benefit history by id
  *     security:
  *       - bearerAuth: []
  *     parameters:
  *       - in: params
  *         name: id
  *         schema:
  *           type: string
  *         required:
  *           - id
  *     responses:
  *       '200':
  *         description: A single benefit history object
  *       '400':
  *         description: No auth token / no benefit history found in db with that id
  */

//find benefits
 /**
  * @swagger
  * /benefit/histories:
  *   get:
  *     tags:
  *       - Benefit histories
  *     name: Find benefit histories
  *     summary: Find benefit histories
  *     security:
  *       - bearerAuth: []
  *     parameters:
  *       - in: query
  *         name: limit, offset
  *         schema:
  *           type: string
  *         required:
  *           - limit, offset
  *     responses:
  *       '200':
  *         description: Array of benefit histories object
  *       '400':
  *         description: No auth token / no benefit histories found in db
  */


// create benefit history (give benefit to user)
/**
 * @swagger
 * /benefit/histories/user:
 *   post:
 *     tags:
 *       - Benefit histories
 *     name: add
 *     summary: give benefit to user
 *     produces:
 *       - application/json
 *     consumes:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             user_id:
 *               type: string
 *             benefit_id:
 *               type: string
 *         required:
 *           - user_id
 *           - benefit_id
 *     responses:
 *       '200':
 *         description: benefit successfully added
 *       '401':
 *         description: benefit not added
 */

 //change benefit
 /**
  * @swagger
  * /benefit/histories/:id:
  *   put:
  *     tags:
  *       - Benefit histories
  *     name: Update benefit history
  *     summary: update benefit history data
  *     security:
  *       - bearerAuth: []
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: body
  *         in: body
  *         schema:
  *           type: object
  *     responses:
  *       '200':
  *         description: benefit history data updated
  *       '403':
  *         description: No authorization / benefit history not found
  */

 //delete benefit
 /**
  * @swagger
  * /benefit/histories/:id:
  *   delete:
  *     tags:
  *       - Benefit histories
  *     name: Delete benefit history
  *     summary: Delete benefit history
  *     security:
  *       - bearerAuth: []
  *     consumes:
  *       - application/json
  *     produces:
  *       - application/json
  *     parameters:
  *       - name: id
  *         in: params
  *         schema:
  *           type: string
  *         required:
  *           - id
  *     responses:
  *       '200':
  *         description: benefit history successfully deleted
  *       '404':
  *         description: No benefit history in db with that id
  */
