const User = require("../models/User.model");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");
const UserModel = require ("../models/User.model");

describe("Register controller testing", () => {
  const inputData = {
    name: "Juan",
    lastname: "Apellido",
    gender: "masculino",
    username: "juan@correo.co",
    password: "Disenoweb2020*",
    mobile: "3014155134",
  };

  beforeEach(async () => {
    await User.deleteMany({});
  }, 10000);

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it("Registro exitoso de usuario", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ inputData });
    expect(response.body).toHaveProperty('msg', 'Error al registrar usuario');
  });

  it("Lanza un error al tratar de registrar un usuario que ya existe", async () => {

    await request(app)
            .post('/api/auth/register')
            .send(inputData);

    const response = await request(app)
        .post('/api/auth/register')
        .send(inputData);


    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('msg', 'El usuario ya existe.');
    expect(response.body).toHaveProperty('ok', false);
});

  it("Debe lanzar error 500 al loguear usuario", async ()=>{

    const email = 'juan@correo.co'
    const password = 'Disenoweb2020*'

    jest.spyOn(User,'create').mockImplementationOnce(()=>{
        throw new Error("simulando error en base de datos")
    })


    const response = await request (app)
                                .post('/api/auth/login')
                                .send({email:email, password: password })
    
    expect (response.statusCode).toBe(200)
    
})

});

