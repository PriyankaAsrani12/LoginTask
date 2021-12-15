const http = require("http");
const app = require("./app");
const server = http.createServer(app);
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

//Swagger initialization
const swaggerOptions={
  swaggerDefinition:{
      info:{
          title: 'LaunchPrj',
          description: 'LaunchPrj Backend Documentation',
          contact: {
              name: "Oyesters Training",
          },
          servers: [`http://localhost:${port}`]
      }
  },
  apis: ["index.js"]
}

app.use(
  cors({
    origin: "*",
    credentials: true
  })
);



const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs-launchprj", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Swagger definition

/**
 * @swagger
 * /register:
 *  post:
 *    tags:
 *      - Authentication
 *    summary: Registering user (Just to ease insertion...not final route...)
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Registering student
 *        required: true
 *        example: {"user_id": "007", "organization_id": "oyesters007", "roll_id":"backend005", "user_full_name":"Prasad_m_joshi124545714474", "user_email_id": "prgvdsvfhsfgh8@gmail.com","user_roll_name": "Backend Developer1147181", "user_phone_num":"784100012", "user_password":"1234"}
 *    responses:
 *      '200':
 *        description: Successfully registered
 *      '400':
 *        description: All inputs are mandatory
 *      '409':
 *        description: User already exist. Please Login
 * 
 */


/**
 * @swagger
 * /login:
 *  post:
 *    tags:
 *      - login
 *    summary: Login user
 *    parameters:
 *      - in: body
 *        name: body
 *        description: Login user
 *        required: true
 *        example: {"user_email_id":"test","user_password":"test"}
 *    responses:
 *      '200':
 *        description: Successfully registered
 *      '400':
 *        description: Check all credentials
 */

/**
 * @swagger
 * /welcome:
 *  post:
 *    tags:
 *      - home
 *    summary: Home Page
 *    parameters:
 *      - in: header
 *        name: x-access-token
 *        description: Login user
 *        required: true
 *    responses:
 *      '200':
 *        description: Successful login
 */








// server listening 
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});