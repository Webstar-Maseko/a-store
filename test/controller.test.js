process.env.NODE_ENV = "test";

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../app");
const should = chai.should();
const mongoose = require("mongoose");
chai.use(chaiHttp);

describe("Unit Tests", () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      mongoose.connection.close(() => {
        console.log("Database successfully cleared");
        done();
      });
    });
  });

  let access_token;

 

  describe("Controllers", () => {
    let category = [];
    //Admin controller test
    describe("Admin", () => {
      /**
       * Test the Admin route
       */
      let body = {
        username: "siya124@email.com",
        password: "Password4!",
        firstName: "Webstar",
        lastName: "Maseko",
        phone: "+27748592573",
        email:"siya@mail.cop"
      };

      describe("/admin/register", () => {
        it("should fail to register a user without username", (done) => {
          let tempBody = body;
          let { username: _, ...temp } = tempBody;
          chai
            .request(server)
            .post("/api/admin/register")
            .send(temp)
            .end((err, res) => {
              if (err) console.log(err);
              else {
                res.should.have.status(400);
                res.body.should.have
                  .property("name")
                  .eql("MissingUsernameError");
                done();
              }
            });
        });
        it("should fail to register a user without password", (done) => {
          let bodyPwd = body;
          let { password: _, ...temp } = bodyPwd;
          chai
            .request(server)
            .post("/api/admin/register")
            .send(temp)
            .end((err, res) => {
              if (err) console.log(err);
              else {
                res.should.have.status(400);
                res.body.should.have
                  .property("name")
                  .eql("MissingPasswordError");
                done();
              }
            });
        });
        it("should register a new user", (done) => {
          chai
            .request(server)
            .post("/api/admin/register")
            .send(body)
            .end((err, res) => {
              console.log(res.body)
              res.should.have.status(200);
              res.body.should.have.property("access_token");
              done();
            });
        });

        it("should fail as user already exist", (done) => {
          chai
            .request(server)
            .post("/api/admin/register")
            .send(body)
            .end((err, res) => {
              res.should.have.status(400);
              res.body.should.have.property("name").eql("UserExistsError");
              done();
            });
        });
      });

      /**
       * Login route
       */
      describe("/admin/login", () => {
        it("should require a password for logging in", (done) => {
          chai
            .request(server)
            .post("/api/admin/login")
            .send({ username: body.username })
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
        });

        it("should require a username for logging in", (done) => {
          chai
            .request(server)
            .post("/api/admin/login")
            .send({ password: body.password })
            .end((err, res) => {
              res.should.have.status(400);
              done();
            });
        });

        it("should fail for incorrect creds", (done) => {
          chai
            .request(server)
            .post("/api/admin/login")
            .send({ username: "!tus", password: body.password })
            .end((err, res) => {
              res.should.have.status(401);
              done();
            });
        });

        it("should log in for correct creds", (done) => {
          chai
            .request(server)
            .post("/api/admin/login")
            .send({ username: body.username, password: body.password })
            .end((err, res) => {
              res.should.have.status(200);
              access_token = res.body.access_token;
              done();
            });
        });
      });
    });

    //Category controller test

    describe("Category", () => {
      describe("/category/create", () => {
        
        it("should forbid a user from creating a category without being authenticate", (done) => {
          chai
            .request(server)
            .post("/api/category/create")
            .send({ gory: "Men" })
            .end((err, res) => {
              res.should.have.status(401);
              done();
            });
        });

        it("Should create a new category", (done) => {
          chai
            .request(server)
            .post("/api/category/create")
            .set("Authorization", "Bearer " + access_token)
            .send({ gory: "Men" })
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });
      });

      describe("/category/index", () => {
        it("Should retrieve all categories", (done) => {
          chai
            .request(server)
            .get("/api/category/index")
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.lengthOf(1);
              category = res.body;
              done();
            });
        });
      });

      describe("category/delete", () =>{
        it("fail to delete the newly added category unauthorized", (done) =>{
            chai.request(server)
                .delete("/api/category/deleteCategory")
                .send(category)
                .end((err,res) =>{
                    res.should.have.status(401);
                    done();
                })
        })

        it("Delete the newly added category", (done) =>{
            chai.request(server)
                .delete("/api/category/deleteCategory")
                .set("Authorization", "Bearer "+access_token)
                .send(category)
                .end((err,res) =>{
                    res.should.have.status(200);
                    res.body.should.have.lengthOf(0);
                    done();
                })
        })


        it("Should create a new category duplicate", (done) => {
          chai
            .request(server)
            .post("/api/category/create")
            .set("Authorization", "Bearer " + access_token)
            .send({ gory: "Men" })
            .end((err, res) => {
              res.should.have.status(200);
              done();
            });
        });

        it("Should retrieve all categories duplicate ", (done) => {
          chai
            .request(server)
            .get("/api/category/index")
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.have.lengthOf(1);
              category = res.body;
              done();
            });
        });
        
      })
    });

    //Product controller test
    describe("Product", () =>{
      let product;
      
      let prodBody = {
        name: "shirt blues",
        price: 150,
        description: "some new shirt",
     
        color: "blue",
        sku: "12345",
        product_variants: [
            {
                size: "large",
                quantity: 10
            },
            {
                size: "Medium",
                quantity: 5
            }
        ]

    }
      describe("/product/create", () =>{
        
        it("should fail to create a new product for not logged in user", (done) =>{
          chai.request(server)
            .post("/api/product/create")
            .send(prodBody)
            .end((err,res) => {
              res.should.have.status(401);
              done();
            })
        })

        it("should successfully add a new product", (done) =>{
          prodBody.category = category[0]?._id;
          chai.request(server)
          .post("/api/product/create")
          .set("Authorization", "Bearer "+access_token)
          .send(prodBody)
          .end((err,res) => {
            product = res.body;
            res.should.have.status(200);
            done();
          })
        })
      })

      
      let prodUpdate = {
        price: 150,
        description: "some new shirt",
        color: "blue",
        product_variants:[{
    
            size: "small",
            quantity: 3
        },{
         size: "large",
            quantity: 3
        },
        {
         size: "medium",
            quantity: 13
        }
        ]
    
    
    }
      describe("/product/getProduct", () =>{

        it("should return all products available", (done) =>{
          chai.request(server)
            .get("/api/product/getProduct")
            .end((err,res) =>{
              res.should.have.status(200);
              product = res.body[0];
              done()
            })
        })
      })

      describe("/product/update" , () =>{
        it("should forbid a user from updating when they are not authenticated", (done) =>{
          chai.request(server).put("/api/product/update/"+product._id)
          .send(prodUpdate)
          .end((err,res) =>{
            res.should.have.status(401);
            done();
          })
        })

        it("should successfully update the product", (done) =>{
          chai.request(server).put("/api/product/update/"+product._id)
          .send(prodUpdate)
          .set("Authorization", "Bearer "+access_token)
          .end((err,res) =>{
            res.should.have.status(201);
            done();
          })
        })
      })

    })
  });
});
