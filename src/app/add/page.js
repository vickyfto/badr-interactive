"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { DatePicker, Input, notification, Select } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const AddProduct = () => {
  const [productCount, setProductCount] = useState(1);
  const [customerName, setCustomerName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleProductCount = () => {
    setProductCount((prev) => {
      return prev + 1;
    });
  };

  const handleQuantity = (e, index) => {
    let tempTotalPrice = 0;
    const { value, name } = e.target;
    const indexItem = name;
    const newItems = [...selectedProduct];
    newItems[indexItem] = { ...newItems[indexItem], qty: value };
    newItems.map((item) => {
      return (tempTotalPrice += Number(item.qty) * item.price);
    });
    setTotalPrice(tempTotalPrice);
    setSelectedProduct(newItems);
  };

  const { data } = useQuery({
    queryKey: ["getProduct"],
    queryFn: () => {
      return axios
        .get("https://mock.apidog.com/m1/523540-0-default/api/products")
        .then((res) => res)
        .catch((err) => console.log(err));
    },
  });

  const { mutate: createOrderMutate } = useMutation({
    mutationKey: ["createOrder"],
    mutationFn: (data) => {
      return axios
        .post("https://mock.apidog.com/m1/523540-0-default/api/order", data)
        .then((res) => res);
    },
    onSuccess: () => {
      alert("sukses");
    },
    onError: () => {
      alert("error");
    },
  });

  const handleChange = (value) => {
    const getSelected = data?.data?.data?.find((item) => item.id === value);
    setSelectedProduct((prev) => {
      return [...prev, getSelected];
    });
  };

  const dataMappingProductName = () => {
    return data?.data?.data?.map((item) => {
      return {
        value: item.id,
        label: item.name,
        price: item.price,
      };
    });
  };

  const handleAddNewOrder = (e) => {
    e.preventDefault();
    const getProduct = selectedProduct.map((item) => {
      return {
        product_id: item.id,
        quantity: item.qty,
      };
    });
    const formData = {
      customer_name: customerName,
      products: getProduct,
    };
    createOrderMutate(formData);
  };

  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type) => {
    api.open({
      message: "",
      description: "You should fill all of mandatory field.",
      style: { background: "#EB5757", color: "#FFFFFF" },
    });
  };

  return (
    <div>
      {contextHolder}
      <div
        onClick={openNotificationWithIcon}
        className="text-center text-2xl poppins-bold my-5"
      >
        Add New Order
      </div>

      <div className="mx-6">
        <div className="bg-white w-full mt-2 px-5 py-4 rounded-lg">
          <form onSubmit={handleAddNewOrder}>
            <div className="grid grid-cols-2">
              <div>
                <div className="flex gap-1">
                  <label
                    for="default-search"
                    className="text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Customer Name
                  </label>
                  <img width="7" src="/assets/icons/asterisk.svg" />
                </div>
                <Input
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="mt-1"
                  placeholder="Basic usage"
                />
              </div>
            </div>
            {new Array(productCount).fill(0).map((_, index) => {
              return (
                <div key={index}>
                  <div className="bg-[#E0E0E0] h-[1.3px] w-full my-6"></div>
                  <div className="text-[1rem] text-[#828282]">
                    Product Detail
                  </div>
                  <div className="grid grid-cols-2 gap-x-5 gap-y-6 mt-2">
                    <div>
                      <div className="flex gap-1">
                        <label
                          for="default-search"
                          className="text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Product Name
                        </label>
                        <img width="7" src="/assets/icons/asterisk.svg" />
                      </div>
                      <Select
                        showSearch
                        placeholder="Search to Select"
                        optionFilterProp="label"
                        filterSort={(optionA, optionB) =>
                          (optionA?.label ?? "")
                            .toLowerCase()
                            .localeCompare((optionB?.label ?? "").toLowerCase())
                        }
                        className="w-full mt-1"
                        onChange={handleChange}
                        options={dataMappingProductName()}
                      />
                    </div>
                    <div>
                      <label
                        for="default-search"
                        className="text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Unit Price
                      </label>
                      <Input
                        value={selectedProduct[index]?.price}
                        className="mt-1 hover:bg-[#d7dde2] bg-[#d7dde2]"
                        placeholder="Basic usage"
                      />
                    </div>

                    <div>
                      <div className="flex gap-1">
                        <label
                          for="default-search"
                          className="text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Quantity
                        </label>
                        <img width="7" src="/assets/icons/asterisk.svg" />
                      </div>
                      <Input
                        readOnly={!selectedProduct[index]}
                        name={index}
                        onChange={handleQuantity}
                        className={`mt-1 hover:bg-[${
                          !selectedProduct[index] ? "#d7dde2" : "#FFFFFF"
                        }]
                          bg-[${
                            !selectedProduct[index] ? "#d7dde2" : "#FFFFFF"
                          }]`}
                        placeholder="Basic usage"
                      />
                    </div>
                    <div>
                      <label
                        for="default-search"
                        className="text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Total Price
                      </label>
                      <Input
                        readOnly
                        value={
                          selectedProduct[index]?.qty === undefined
                            ? "-"
                            : selectedProduct[index]?.qty *
                              selectedProduct[index]?.price
                        }
                        className="mt-1 hover:bg-[#d7dde2] bg-[#d7dde2]"
                        placeholder="Basic usage"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
            <button
              type="button"
              onClick={handleProductCount}
              className="bg-[#052A49] mt-7 text-white py-1 px-2 rounded-md"
            >
              Add More Product
            </button>

            <div className="bg-[#E0E0E0] h-[1.3px] w-full my-6"></div>
            <div className="grid grid-cols-2">
              <div>
                <div className="flex gap-1">
                  <label
                    for="default-search"
                    className="text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Total Price
                  </label>
                </div>
                <Input
                  value={totalPrice}
                  className="mt-1 bg-[#d7dde2]"
                  placeholder="Basic usage"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-5">
              <button
                type="submit"
                className="bg-[#1BA8DF] text-white py-1 px-8 rounded-md"
              >
                Save
              </button>
              <button className="bg-[#FFFFFF] border border-[#E0E0E0] text-black py-1 px-8 rounded-md">
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
