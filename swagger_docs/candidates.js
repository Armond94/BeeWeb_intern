//get candidate
/**
 * @swagger
 * /candidates/:id:
 *   get:
 *     tags:
 *       - Candidates
 *     name: Find candidate by id
 *     summary: Find a candidate by id
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
 *         description: A single candidate object
 *       '400':
 *         description: No auth token / no candidate found in db with that id
 */

//get candidates
/**
 * @swagger
 * /candidates:
 *   get:
 *     tags:
 *       - Candidates
 *     name: find candidates
 *     summary: find candidates
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
 *         description: Array of candidates object and count of all candidates that match in query
 *       '400':
 *         description: No auth token / no candidate found in db
 */

//create candidate
/**
 * @swagger
 * /candidates:
 *   post:
 *     tags:
 *       - Candidates
 *     name: create
 *     summary: create a new candidate
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
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             phoneNumber:
 *               type: number
 *             position:
 *               type: string
 *         required:
 *           - firstName
 *           - lastName
 *           - email
 *           - phoneNumber
 *           - position
 *     responses:
 *       '200':
 *         description: candidate created
 *       '403':
 *         description: candidtae not created
 */

//change candidate
/**
 * @swagger
 * /candidates/:id:
 *   put:
 *     tags:
 *       - Candidates
 *     name: Update candidate
 *     summary: Update candidate data
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
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             email:
 *               type: string
 *             phoneNumber:
 *               type: string
 *         required:
 *           - username
 *     responses:
 *       '200':
 *         description: candidate data updated
 *       '403':
 *         description: No authorization / candidate not found
 */

//delete candidate
/**
 * @swagger
 * /candidates/:id:
 *   delete:
 *     tags:
 *       - Candidates
 *     name: Delete candidates
 *     summary: Delete candidates
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
 *         description: candidates successfully deleted
 *       '404':
 *         description: No candidates in db with that name
 */
