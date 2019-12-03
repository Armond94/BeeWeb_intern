//get position by id
/**
 * @swagger
 * /positions/:id:
 *   get:
 *     tags:
 *       - Positions
 *     name: Find positions by id
 *     summary: Find a positions by id
 *     parameters:
 *       - in: params
 *         name: id
 *         schema:
 *           type: string
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: A single positions object
 *       '400':
 *         description:no positions found in db with that id
 */

//get all positions
/**
 * @swagger
 * /positions:
 *   get:
 *     tags:
 *       - Positions
 *     name: Find positions
 *     summary: Find positions
 *     parameters:
 *       - in: query
 *         name: limit, offset, title
 *         schema:
 *           type: string
 *         required:
 *           - limit, offset title
 *     responses:
 *       '200':
 *         description: Array of positions object and count
 *       '400':
 *         description:no positions found in db
 */

//create position
/**
 * @swagger
 * /positions:
 *   post:
 *     tags:
 *       - Positions
 *     name: create position
 *     summary: create new positions object
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         schema:
 *           type: object
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             type:
 *               type: string
 *             required_qualifications:
 *               type: string
 *             deadline:
 *               type: string
 *             candidates:
 *               type: string
 *         required:
 *           - title
 *           - description
 *           - type
 *           - required_qualifications
 *           - deadline
 *     responses:
 *       '200':
 *         description: position created
 *       '403':
 *         description: position not created
 */

//change position
/**
 * @swagger
 * /positions/:id:
 *   put:
 *     tags:
 *       - Positions
 *     name: Update positions
 *     summary: Update positions data
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
 *           properties:
 *             title:
 *               type: string
 *             description:
 *               type: string
 *             type:
 *               type: string
 *             required_qualifications:
 *               type: string
 *             deadline:
 *               type: date
 *             candidates:
 *               type: string
 *         required:
 *           - id
 *     responses:
 *       '200':
 *         description: position data updated
 *       '403':
 *         description: No authorization / position not updated
 */

//delete position
/**
 * @swagger
 * /candidates/:id:
 *   delete:
 *     tags:
 *       - Candidates
 *     name: Delete candidate
 *     summary: Delete candidate by id
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
 *         description: position successfully deleted
 *       '404':
 *         description: No position in db with that id
 */
