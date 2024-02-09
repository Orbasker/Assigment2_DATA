let expect;
const { DbHandler } = require("../handlers/index");
let dbHandler;

describe("Add supply", function () {
  before(async function () {
    const chai = await import("chai");
    expect = chai.expect;
    dbHandler = new DbHandler("testDB"); // Adjust the path as needed
  });
  it("should add a supply", async function () {
    const supply = {
      name: "Test Supply",
      quantity: 100,
      price: 100,
    };
    const result = await dbHandler.addSupply(supply);
    expect(result).to.include(supply);
  });
  it("should get a supply", async function () {
    const supply = {
      name: "Test Supply",
      quantity: 100,
      price: 100,
    };
    const result = await dbHandler.getSupply(supply.name);
    expect(result).to.include(supply);
  });
  it("should update a supply", async function () {
    const supply = {
      name: "Test Supply",
      quantity: 200,
      price: 200,
    };
    const id = supply.name;
    const result = await dbHandler.updateSupply(id, supply);
    expect(result);
  });
  it("should get all supplies", async function () {
    const result = await dbHandler.getSupplies();
    expect(result).to.be.an("array");
  });
  it("should delete a supply", async function () {
    const supply = "Test Supply";
    const result = await dbHandler.deleteSupply(supply);
    console.log(result);
    expect(result).to.include({ name: supply });
  });
}, 6000);
