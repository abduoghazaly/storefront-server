"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const server_1 = __importDefault(require("../server"));
const request = (0, supertest_1.default)(server_1.default);
const userInfo = {
    "firstName": "system",
    "lastName": "admin",
    "email": "admin@admin.com",
    "password": "admin"
};
const bearer = 'Bearer ';
let token = '';
describe("user API", () => {
    it("Create User", async () => {
        const response = await request.post("/user").send(userInfo);
        token = response.body.token;
        expect(Object.keys(response.body)).toContain('token');
    });
    it("update User", async () => {
        userInfo.password = 'systemadmin';
        const response = await request.put("/user/1").set("Authorization", bearer + token).send(userInfo);
        token = response.body.token;
        expect(Object.keys(response.body)).toContain('token');
    });
    it("signin User", async () => {
        const response = await request.post("/signin").send({ email: userInfo.email, password: userInfo.password });
        token = response.body.token;
        expect(Object.keys(response.body)).toContain('token');
    });
    it("get all Users", async () => {
        const response = await request.get("/user").set("Authorization", bearer + token);
        expect(response.statusCode).toBe(200);
    });
    it("get User", async () => {
        const response = await request.get("/user/1").set("Authorization", bearer + token);
        expect(response.statusCode).toBe(200);
    });
});
