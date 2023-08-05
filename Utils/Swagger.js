const {version} =require("../package.json");
const swaggerJsdoc =require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");


const options= {
    failOnErrors: true,
    definition:{
       
        openapi:"3.1.0",
        info:{
            title: "A Store API",
            summary:"Backend APIs for a-store",
            version,
            contact: {
                name:"Webstar Maseko",
                email: "webstarsiyabonga@gmail.com",
                
            },
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
              },
        },
        servers:[
            {
                url: "/api"
            }
        ],
            
    },
    apis:["./Routes/*Route.js", "./Models/*.js"]
}

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app){
    app.use("/api-docs", swaggerUI.serve,swaggerUI.setup(swaggerSpec));

}

module.exports = swaggerDocs;