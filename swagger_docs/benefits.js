//get benefit by id
/**
 * @swagger
 * /benefits/:id:
 *   get:
 *     tags:
 *       - Benefits
 *     name: Find benefit by id
 *     summary: Find a benefit r by id
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
 *         description: A single benefit object
 *       '400':
 *         description: No auth token / no benefit found in db with that id
 */

//find benefits
/**
 * @swagger
 * /benefits:
 *   get:
 *     tags:
 *       - Benefits
 *     name: Find benefits
 *     summary: Find benefits
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Array of benefits object
 *       '400':
 *         description: No auth token / no benefits found in db
 */
//create benefit

//get benefit history

//create benefit
/**
 * @swagger
 * /Benefits:
 *   post:
 *     tags:
 *       - Benefits
 *     name: create
 *     summary: create new benefit
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
 *         required:
 *           - title
 *           - description
 *     responses:
 *       '200':
 *         description: benefit created
 *       '403':
 *         description:  benefit not created
 */

// give benefit to user
/**
 * @swagger
 * /benefits/user:
 *   post:
 *     tags:
 *       - Benefits
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
 *             title:
 *               type: string
 *             description:
 *               type: string
 *         required:
 *           - title
 *           - description
 *     responses:
 *       '200':
 *         description: benefit successfully added
 *       '401':
 *         description: benefit not added
 */

//change benefit
/**
 * @swagger
 * /benefits/:id:
 *   put:
 *     tags:
 *       - Benefits
 *     name: Update benefits
 *     summary: update benefit data
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
 *         required:
 *           - username
 *     responses:
 *       '200':
 *         description: benefit data updated
 *       '403':
 *         description: No authorization / benefit not found
 */

//delete benefit
/**
 * @swagger
 * /benefits/:id:
 *   delete:
 *     tags:
 *       - Benefits
 *     name: Delete benefits
 *     summary: Delete benefits
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
 *         description: benefit successfully deleted
 *       '404':
 *         description: No benefit in db with that id
 */
