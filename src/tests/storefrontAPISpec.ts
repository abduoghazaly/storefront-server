import supertest from "supertest";
import app from "../server";

const request = supertest(app);

const userInfo = {
    "firstName":"system",
    "lastName":"admin",
    "email": "admin@admin.com",
    "password":"admin"
}
const bearer = 'Bearer '
let token = ''
describe("user API", (): void => {
    it("Create User", async (): Promise<void> => {
      const response = await request.post("/user").send(userInfo);
      token = response.body.token
      expect(Object.keys(response.body)).toContain('token');
    });
    it("update User", async (): Promise<void> => {
      const response = await request.put("/user/1").set("Authorization", bearer + token ).send(userInfo);
      token = response.body.token
      expect(Object.keys(response.body)).toContain('token');
    });
    it("signin User", async (): Promise<void> => {
      const response = await request.post("/signin").send({email:userInfo.email,password:userInfo.password});
      token = response.body.token
      expect(Object.keys(response.body)).toContain('token');
    });
    it("get all Users", async (): Promise<void> => {
      const response = await request.get("/user").set("Authorization", bearer + token );
      expect(response.statusCode).toBe(200);
    });
    it("get User", async (): Promise<void> => {
      const response = await request.get("/user/1").set("Authorization", bearer + token );
      expect(response.statusCode).toBe(200);
    });
});

const category = {
  name: "category",
  description: "sample",
}
describe("category API", (): void => {
  it("Create category", async (): Promise<void> => {
    const response = await request.post("/category").set("Authorization", bearer + token ).send(category);
    expect(response.statusCode).toBe(200);
  });
  it("Update category", async (): Promise<void> => {
    const response = await request.put("/category/1").set("Authorization", bearer + token ).send(category);
    expect(response.statusCode).toBe(200);
  });
  it("get all category", async (): Promise<void> => {
    const response = await request.get("/category").set("Authorization", bearer + token );
    expect(response.statusCode).toBe(200);
  });
  it("get category", async (): Promise<void> => {
    const response = await request.get("/category/1").set("Authorization", bearer + token );
    expect(response.statusCode).toBe(200);
  });
});
const product = {
  name: "product",
  description: "something to use",
  price: 260,
  category_id: 1
}
describe("product API", (): void => {
  it("Create product", async (): Promise<void> => {
    const response = await request.post("/product").set("Authorization", bearer + token ).send(product);
    expect(response.statusCode).toBe(200);
  });
  it("Update product", async (): Promise<void> => {
    const response = await request.put("/product/1").set("Authorization", bearer + token ).send(product);
    expect(response.statusCode).toBe(200);
  });
  it("get all product", async (): Promise<void> => {
    const response = await request.get("/product");
    expect(response.statusCode).toBe(200);
  });
  it("get product", async (): Promise<void> => {
    const response = await request.get("/product/1");
    expect(response.statusCode).toBe(200);
  });
});
const order =  {
  user_id: 1,
  status: 1,
  orderProduct: [
    {
      order_id:1,
      product_id:1,
      quantity:10,
      price:260
    }
  ]
}
describe("order API", (): void => {
  it("Create order", async (): Promise<void> => {
    const response = await request.post("/order").set("Authorization", bearer + token ).send(order);
    expect(response.statusCode).toBe(200);
  });
  it("get order By User", async (): Promise<void> => {
    const response = await request.get("/orderByUser/1").set("Authorization", bearer + token );
    expect(response.statusCode).toBe(200);
  });
  it("Update order", async (): Promise<void> => {
    const response = await request.put("/order/1").set("Authorization", bearer + token ).send({...order,status:3});
    expect(response.statusCode).toBe(200);
  });
  it("get all order", async (): Promise<void> => {
    const response = await request.get("/order").set("Authorization", bearer + token );
    expect(response.statusCode).toBe(200);
  });
  it("get order", async (): Promise<void> => {
    const response = await request.get("/order/1").set("Authorization", bearer + token );
    expect(response.statusCode).toBe(200);
  });
  it("get complated Orders By User", async (): Promise<void> => {
    const response = await request.get("/complatedOrdersByUser/1").set("Authorization", bearer + token );
    expect(response.statusCode).toBe(200);
  });
});

const orderProduct = {
  order_id:1,
  product_id:1,
  quantity:5,
  price:260
}
describe("orderProduct API", (): void => {
  it("Create orderProduct", async (): Promise<void> => {
    const response = await request.post("/orderProduct").set("Authorization", bearer + token ).send(orderProduct);
    expect(response.statusCode).toBe(200);
  });
  it("Update orderProduct", async (): Promise<void> => {
    const response = await request.put("/orderProduct/2").set("Authorization", bearer + token ).send(orderProduct);
    expect(response.statusCode).toBe(200);
  });
  it("get all orderProduct", async (): Promise<void> => {
    const response = await request.get("/orderProduct").set("Authorization", bearer + token );
    expect(response.statusCode).toBe(200);
  });
  it("get orderProduct", async (): Promise<void> => {
    const response = await request.get("/orderProduct/2").set("Authorization", bearer + token );
    expect(response.statusCode).toBe(200);
  });
});


describe("DELETE APIs", (): void => {
  it(" orderProduct", async (): Promise<void> => {
    const response = await request.delete("/orderProduct/2").set("Authorization", bearer + token );
    expect(response.statusCode).toBe(200);
  });
  it(" order", async (): Promise<void> => {
    const response = await request.delete("/order/1").set("Authorization", bearer + token );
    expect(response.statusCode).toBe(200);
  });
  it("product", async (): Promise<void> => {
    const response = await request.delete("/product/1").set("Authorization", bearer + token );
    expect(response.statusCode).toBe(200);
  });
  it("category", async (): Promise<void> => {
    const response = await request.delete("/category/1").set("Authorization", bearer + token );
    expect(response.statusCode).toBe(200);
  });
  it("user", async (): Promise<void> => {
    const response = await request.delete("/user/1").set("Authorization", bearer + token );
    expect(response.statusCode).toBe(200);
  });

});