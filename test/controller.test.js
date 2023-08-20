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
    //Admin controller test
    describe("Admin", () => {
      /**
       * Test the Admin route
       */
      let body = {
        username: "siya124@email.com",
        password: "password1234",
        firstName: "Webstar",
        lastName: "Maseko",
        phone: "+27748592573",
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

      let category;
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
      })
    });
  });
});
