/**
 * @swagger
 * /users:
 *   get:
 *     summary: 유저 목록 가져오기
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: 성공
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 properties:
 *                   name:
 *                     type: string
 *                     example: 철수
 *                   email:
 *                     type: string
 *                     example: "a@a.com"
 *                   personal:
 *                      type: string
 *                      example: 123456-1******
 *                   prefer:
 *                     type: string
 *                     example: https://test.com
 *                   pwd:
 *                      type: string
 *                      example: 123456
 *                   phone:
 *                     type: string
 *                     example: 01012345678
 *                   og:
 *                     type: object
 *                     example: { title : "네이버", 
 *                                images: "https://s.pstatic.net/static/www/mobile/edit/2016/0705/mobile_21285241…",
 *                                description: "네이버 메인에서 다양한 정보와 유용한 컨텐츠를 만나 보세요"
 *                              }
 */

/**
 * @swagger
 * /users:
 *   post:
 *     summary: 회원가입 하기
 *     tags: [Users]  
 *     parameters:
 *       - in: query
 *         name: userInfo
 *         required: true
 *         description: 유저 정보를 받아와 데이터 검증 후 Scraping 한 데이터 추가하여 저장
 *         schema:
 *          type: object
 *          properties:
 *            name:
 *              type: string
 *              example: 철수
 *            email:
 *              type: string
 *              example: ala@gmail.com
 *            personal:
 *              type: string
 *              example: 220101-1111111
 *            prefer:
 *              type: string
 *              example: https:www.naver.com
 *            pwd:
 *              type: string
 *              example: 1234
 *            phone:
 *              type: string
 *              example: "01012345678"
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
 *                   example : 641e83f3a77791d134af2747 id로 가입 완료!!
 *                 status:
 *                   type: boolean
 *                   example : true
 */