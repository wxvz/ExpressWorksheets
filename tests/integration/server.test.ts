import request from "supertest";
import { app } from "../../src/app";


describe("GET /pineapple", () => {
    it("should return hello from Pineapple route", async () => {
        const response = await request(app)
            .get("/pineapple");

        expect(response.status).toBe(200);

        expect(response.body).toEqual({
            message: "hello from Pineapple route"
        });
    });
});

describe("GET /auth/me", () => {
    it("should return 401 Unauthorized when no token is provided", async () => {
        const response = await request(app)
            .get("/auth/me");

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            status: "fail",
            message: "Missing or invalid Authorization header"
        });
    });
    
    it("should return 401 Unauthorized when an invalid token is provided", async () => {
        const response = await request(app)
            .get("/auth/me")
            .set("Authorization", "Bearer invalidtoken");  

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            status: "fail",
            message: "Missing or invalid Authorization header"
        });
    });
});

describe("GET /auth/me with valid token", () => {
    let token: string;
    
    beforeAll(async () => {
        // Register a new user
        await request(app)
            .post("/auth/register")
            .send({
                name: "Test User",
                email: "test@example.com",
                password: "password123"
            });

        // Log in the user to get a valid token
        const loginResponse = await request(app)
            .post("/auth/login")
            .send({
                email: "test@example.com",
                password: "password123"
            });

        token = loginResponse.body.token;
    });

    it("should return the user's information when a valid token is provided", async () => {
        const response = await request(app)
            .get("/auth/me")
            .set("Authorization", `Bearer ${token}`);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({
            id: expect.any(String),
            name: "Test User",
            email: "test@example.com"
        });
    });

    it("should return 401 Unauthorized when the token is expired", async () => {
        // Simulate an expired token by using a token with a very short expiration time
        const expiredToken = "your_expired_token_here"; // Replace with an actual expired token for testing

        const response = await request(app)
            .get("/auth/me")
            .set("Authorization", `Bearer ${expiredToken}`);

        expect(response.status).toBe(401);
        expect(response.body).toEqual({
            status: "fail",
            message: "Invalid or expired token"
        });
    });

    
});

describe("POST /auth/register", () => {
    it("should register a new user and return the user's information", async () => {
        const response = await request(app)
            .post("/auth/register")
            .send({
                name: "New User",
                email: "newuser@example.com",
                password: "password123"
            });

        expect(response.status).toBe(201);
        expect(response.body).toEqual({
            id: expect.any(String),
            name: "New User",
            email: "newuser@example.com"
        });
    });
}); 

describe("POST /auth/login", () => {
    it("should log in an existing user and return a JWT token", async () => {
        // First, register a new user
        await request(app)
            .post("/auth/register")
            .send({
                name: "Login User",
                email: "loginuser@example.com",
                password: "password123"
            });
        
        // Then, log in the user
        const response = await request(app)
            .post("/auth/login")
            .send({
                email: "loginuser@example.com",
                password: "password123"
            });

        expect(response.status).toBe(200);
        expect(response.body).toHaveProperty("token");
    });
}); 
