import { user } from "../models/user.model";
import { category } from "../models/category.model";
import app from "../server";
import { product } from "../models/product.model";
import { order } from "../models/order.model";
import { orderProduct } from "../models/orders_product.model";


const userInfo = {
    "firstName":"system1",
    "lastName":"admin1",
    "email": "admin1@admin.com",
    "password":"admin1"
}

const users = new user();
let userid = 1 ;
describe("user DB", (): void => {
    it("create User", async (): Promise<void> => {
      const response = await users.create(userInfo)
      userid = response.id as number
      expect(response).toBeTruthy();
    });
    it("update User", async (): Promise<void> => {

      const response = await users.update({...userInfo, id:userid})
      expect(response).toBeTruthy();
    });
    it("signin User", async (): Promise<void> => {
      const response = await users.signin(userInfo)
      expect(response).toBeTruthy();
    });
    it("index Users", async (): Promise<void> => {
      const response = await users.index()
      expect(response).toBeTruthy();
    });
    it("show User", async (): Promise<void> => {
      const response = await users.show(userid)
      expect(response).toBeTruthy();
    });
});

const cate = new category()
const categorys = {
  name: "category",
  description: "sample",
}
let cateid = 1;
describe("category DB", (): void => {
  it("Create category", async (): Promise<void> => {
    const response = await cate.create(categorys);
    cateid = response.id as number
    expect(response).toBeTruthy();
  });
  it("Update category", async (): Promise<void> => {
    const response = await cate.update({...categorys,id:cateid});
   expect(response).toBeTruthy();
  });
  it("index category", async (): Promise<void> => {
    const response = await cate.index();
   expect(response).toBeTruthy();
  });
  it("show category", async (): Promise<void> => {
    const response = await cate.show(cateid)
   expect(response).toBeTruthy();
  });
});

const prod = new product()
let products = {
  name: "product",
  description: "something to use",
  price: 260,
  category_id: 1
}
let prodid = 1;
describe("product DB", (): void => {
  it("Create product", async (): Promise<void> => {
    products.category_id = cateid
    const response = await prod.create(products);
    prodid = response.id as number
      expect(response).toBeTruthy();
  });
  it("Update product", async (): Promise<void> => {
    const response = await prod.update({...products,id:prodid});
      expect(response).toBeTruthy();
  });
  it("index product", async (): Promise<void> => {
    const response = await prod.index();
      expect(response).toBeTruthy();
  });
  it("show product", async (): Promise<void> => {
    const response = await prod.show(prodid);
      expect(response).toBeTruthy();
  });
});

const ord = new order()
let orders =  {
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
let ordid = 1;
describe("order DB", (): void => {
  it("Create order", async (): Promise<void> => {
    orders.user_id = userid
    orders.orderProduct[0].product_id = prodid
    const response = await ord.create(orders);
    ordid = response.id as number
    expect(response).toBeTruthy();
  });
  it("orderByUser User", async (): Promise<void> => {
    const response = await ord.orderByUser(ordid)
     expect(response).toBeTruthy();
  });
  it("Update order", async (): Promise<void> => {
    const response = await ord.update({...orders,status:3,id:ordid});
     expect(response).toBeTruthy();
  });
  it("index order", async (): Promise<void> => {
    const response = await ord.index();
     expect(response).toBeTruthy();
  });
  it("show order", async (): Promise<void> => {
    const response = await ord.show(ordid);
     expect(response).toBeTruthy();
  });
  it("completedOrdersByUser User", async (): Promise<void> => {
    const response = await ord.completedOrdersByUser(ordid);
     expect(response).toBeTruthy();
  });
});

const ordprod = new orderProduct()
const orderProducts = {
  order_id:1,
  product_id:1,
  quantity:5,
  price:260
}
let ordprodid = 1;
describe("orderProduct DB", (): void => {
  it("Create orderProduct", async (): Promise<void> => {
    orderProducts.order_id = ordid
    orderProducts.product_id = prodid
    const response = await ordprod.create(orderProducts);
    ordprodid = response.id as number 
    expect(response).toBeTruthy();
  });
  it("Update orderProduct", async (): Promise<void> => {
    const response = await ordprod.update({...orderProducts, id :ordprodid});
    expect(response).toBeTruthy();
  });
  it("index orderProduct", async (): Promise<void> => {
    const response = await ordprod.index()
    expect(response).toBeTruthy();
  });
  it("show orderProduct", async (): Promise<void> => {
    const response = await ordprod.show(ordprodid)
    expect(response).toBeTruthy();
  });
});


describe("DELETE DB", (): void => {
  it(" orderProduct", async (): Promise<void> => {
    const response = await ordprod.delete(ordprodid)
    expect(response).toBeTruthy();
  });
  it(" order", async (): Promise<void> => {
    const response = await ord.delete(ordid)
    expect(response).toBeTruthy();
  });
  it("product", async (): Promise<void> => {
    const response = await prod.delete(prodid)
    expect(response).toBeTruthy();
  });
  it("category", async (): Promise<void> => {
    const response = await cate.delete(cateid)
    expect(response).toBeTruthy();
  });
  it("user", async (): Promise<void> => {
    const response = await users.delete(userid)
    expect(response).toBeTruthy();
  });

});