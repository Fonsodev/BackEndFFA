const RoutineModel = require("../models/Routine.model");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../index");

describe("Routine controller testing", () => {

    const inputData = {

    urlImage: String, 
    name: String,
    repetitionsStrength: Number,
    averageSetsStrength: Number,
    repetitionsEndurance: Number,
    averageSetsEndurance: Number,
    repetitionsHypertrophy: Number,
    averageSetstHypertrophy: Number,
    description: String,
    muscleGroup: String,
    }


  beforeEach(async () => {
    await RoutineModel.deleteMany({});
  },10000);

  afterAll(async () => {
    await RoutineModel.deleteMany({});
    await mongoose.connection.close();
  });

  it("Registro exitoso de rutina", async () => {
    const response = await request(app)
      .post("/api/routine")
      .send({ inputData });
    expect(response.body).toHaveProperty('msg', 'Rutina creada exitosamente');
  });

});