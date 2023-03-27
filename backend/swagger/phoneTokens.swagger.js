/**
 * @swagger
 * /tokens/phone:
 *   post:
 *     summary: 토큰 인증 요청
 *     tags: [Tokens]
 *     parameters:
 *     - in: query
 *       name: phone
 *       required: true
 *       description: 휴대폰 번호 받아와 데이터 검증 후 토큰 생성 DB에 저장
 *       schema:
 *        type: string
 *        example: "01012345678"
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example : 핸드폰으로 인증 문자가 전송되었습니다!
 *                 status:
 *                   type: boolean
 *                   example : true
 */

/**
 * @swagger
 * /tokens/phone:
 *   patch:
 *     summary: 인증 완료
 *     tags: [Tokens]  
 *     parameters:
 *       - in: query
 *         name: phoneToken
 *         required: true
 *         description: 토큰정보를 받아와 인증완료면 DB정보 업데이트
 *         schema:
 *          type: object
 *          properties:
 *            phone:
 *              type: string
 *              example: "01012345678"
 *              required: true
 *            token:
 *              type: string
 *              example: 864081
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: boolean
 *               example: true
 */
