const products = [
  {
    categoryName: "Przystawki",
    items: [
      {
        name: "Miso z tofu",
        price: 14,
        img: "./img/salatki/1.jpeg",
      },
      {
        name: "Sałatka goma wakame",
        price: 15,
        img: "./img/salatki/2.jpeg",
      },
      {
        name: "Fasolka sojowa edamame",
        price: 16,
        img: "./img/salatki/3.jpeg",
      },
    ],
  },
  {
    categoryName: "Zupy",
    items: [
      {
        name: "Miso z tofu",
        price: 12,
        img: "./img/zupy/1.jpeg",
      },
      {
        name: "Miso z łososiem",
        price: 14,
        img: "./img/zupy/2.jpeg",
      },
      {
        name: "Tom Yum wege",
        price: 10,
        img: "./img/zupy/3.jpeg",
      },
    ],
  },
  {
    categoryName: "Napoje",
    items: [
      {
        name: "Pepsi Cola 0,33l",
        price: 5,
        img: "./img/napoje/1.jpeg",
      },
      {
        name: "Mirinda",
        price: 5,
        img: "./img/napoje/2.jpeg",
      },
      {
        name: "7 UP",
        price: 5,
        img: "./img/napoje/3.jpeg",
      },
    ],
  },
];

/////////////////------------------localStorage--------------------//////////////////
const localStorageService = {
  getOrder: () => JSON.parse(localStorage.getItem("cart")),
  setNewOrder: (order) => localStorage.setItem("cart", JSON.stringify(order)),
};

const categoriesLinks = document.querySelectorAll(".categories-link");
const categoriesItem = document.querySelectorAll(".categories-item");
const categoriesList = document.querySelector(".categories-list");
const productsHolder = document.querySelector(".products-holder");
const productsInfo = document.querySelector(".product-info");
const doneBtn = document.querySelector("#done-btn");
const form = document.querySelector(".info-holder");
const myOrders = document.querySelector("#my-orders");

const categoriesCreate = () => {
  products.forEach((elem) => {
    const categoriesLinks = document.getElementById(elem.categoryName);
    categoriesLinks.textContent = elem.categoryName;
    categoriesLinks.addEventListener("click", () => {
      createElements(elem);
    });
  });
};
const createElements = (elem) => {
  productsHolder.textContent = "";
  const productsHeader = document.createElement("h2");
  productsHeader.textContent = "Menu product";
  productsHeader.classList.add("products-header");
  const productsList = document.createElement("ul");
  productsList.classList.add("products-list");
  elem.items.forEach((item) => {
    const itemLi = document.createElement("li");
    const itemLink = document.createElement("a");
    itemLink.href = "#";
    itemLink.textContent = item.name;
    itemLi.appendChild(itemLink);

    productsList.append(itemLi);
    itemLink.addEventListener("click", () => {
      showItem(item);
    });
  });
  productsHolder.append(productsHeader, productsList);
};

const showItem = (item) => {
  productsInfo.textContent = "";
  const infoDiv = document.createElement("div");
  const itemImg = document.createElement("img");
  const itemFullName = document.createElement("h2");
  const itemPrice = document.createElement("p");
  itemFullName.id = "product-name";
  itemImg.id = "product-description";
  itemPrice.id = "product-price";
  const buyBtn = document.createElement("button");
  itemPrice.textContent = `$ ${item.price}`;
  itemFullName.textContent = item.name;
  itemImg.src = item.img;

  buyBtn.addEventListener("click", () => {
    form.style.display = "flex";
  });
  buyBtn.textContent = "Buy";
  infoDiv.append(itemFullName, itemImg, itemPrice, buyBtn);
  productsInfo.appendChild(infoDiv);
};

categoriesCreate();

const getForm = (event) => {
  event.preventDefault();
  const customerFullName = document.querySelector("#fullName").value;
  const customerCity = document.querySelector("#city").value;
  const customerPostOffice = document.querySelector("#postOffice").value;
  const customerPayment = document.querySelector(
    "input[type=radio]:checked"
  ).value;
  const customerQuantity = document.querySelector("#quantity").value;
  const customerComment = document.querySelector("#comment").value;
  const orderProductName = document.querySelector("#product-name");
  const orderProductPrice = document.querySelector("#product-price");
  const orderProductImg = document.querySelector("#product-description");
  const day = new Date().getDate();
  const month = new Date().getMonth();
  const year = new Date().getFullYear();
  const dayOfOrder = day + "-" + month + "-" + year;
  if (
    !customerFullName ||
    !customerCity ||
    !customerPostOffice ||
    !customerPayment ||
    !customerQuantity
  ) {
    alert("Please fill in all the nessesary fields.");
    return;
  }
  const orderObject = {
    customerFullName: customerFullName,
    customerCity: customerCity,
    customerPostOffice: customerPostOffice,
    customerPayment: customerPayment,
    customerQuantity: customerQuantity,
    customerComment: customerComment,
    orderProductName: orderProductName.textContent,
    orderProductPrice: orderProductPrice.textContent,
    orderProductImg: orderProductImg.item,
    dayOfOrder: dayOfOrder,
  };
  saveToLocalStorage(orderObject);
};

const saveToLocalStorage = (order) => {
  const orders = localStorageService.getOrder() || [];
  orders.push(order);
  localStorageService.setNewOrder(orders);
  location.reload();
};
const getOrders = () => {
  const orders = localStorageService.getOrder();
  if (orders) {
    orders.forEach((orderData, i) => {
      const orderInfo = document.createElement("div");
      const itemDescription = document.createElement("p");
      const itemFullName = document.createElement("h2");
      const itemPrice = document.createElement("p");
      const customerFullName = document.createElement("p");
      const customerCity = document.createElement("p");
      const customerPostOffice = document.createElement("p");
      const customerPayment = document.createElement("p");
      const customerQuantity = document.createElement("p");
      const customerComment = document.createElement("p");
      const dayOfOrder = document.createElement("p");
      const deleteBtn = document.createElement("button");

      itemDescription.classList.add("order-info");
      customerFullName.classList.add("order-info");
      customerCity.classList.add("order-info");
      customerPostOffice.classList.add("order-info");
      customerPayment.classList.add("order-info");
      customerQuantity.classList.add("order-info");
      customerComment.classList.add("order-info");

      deleteBtn.textContent = "Delete";
      itemPrice.textContent = orderData.orderProductPrice;
      itemFullName.textContent = orderData.orderProductName;
      itemDescription.textContent = orderData.orderProductDescription;
      customerFullName.textContent = orderData.customerFullName;
      customerCity.textContent = orderData.customerCity;
      customerPostOffice.textContent = orderData.customerPostOffice;
      customerPayment.textContent = orderData.customerPayment;
      customerQuantity.textContent = orderData.customerQuantity;
      customerComment.textContent = orderData.customerComment;
      dayOfOrder.textContent = orderData.dayOfOrder;
      deleteBtn.textContent = "Delete";
      orderInfo.append(
        itemFullName,
        itemPrice,
        itemDescription,
        customerFullName,
        customerCity,
        customerPostOffice,
        customerPayment,
        customerQuantity,
        customerComment,
        dayOfOrder,
        deleteBtn
      );

      orderInfo.id = "ordersInfoHolder";
      const ordersHolder = document.querySelector(".orders");
      ordersHolder.appendChild(orderInfo);
      orderInfo.style.border = "1px solid";
      orderInfo.style.padding = "5px";
      deleteBtn.addEventListener("click", () => {
        orders.splice(i, 1);
        localStorage.setItem("orders", JSON.stringify(orders));
        orderInfo.remove();
      });
    });
    orderShowDetails();
  } else {
    alert("You Have no orders!");
  }
};

const orderShowDetails = () => {
  const ordersHolder = document.querySelectorAll("#ordersInfoHolder");
  ordersHolder.forEach((mainelem) => {
    const fullInfo = mainelem.querySelectorAll(".order-info");
    mainelem.addEventListener("click", () => {
      fullInfo.forEach((elem) => {
        elem.style.display = "block";
      });
    });
  });
};
const clearOrders = document.querySelector("#clear-orders");
clearOrders.addEventListener("click", () => {
  localStorage.clear();
  location.reload();
});
doneBtn.addEventListener("click", getForm);
myOrders.addEventListener("click", getOrders);
