"use client";

import { DownOutlined, SmileOutlined } from "@ant-design/icons";
import { Dropdown, Space } from "antd";

const items = [
  {
    key: "1",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.antgroup.com"
      >
        1st menu item
      </a>
    ),
  },
  {
    key: "2",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.aliyun.com"
      >
        2nd menu item (disabled)
      </a>
    ),
    icon: <SmileOutlined />,
    disabled: true,
  },
  {
    key: "3",
    label: (
      <a
        target="_blank"
        rel="noopener noreferrer"
        href="https://www.luohanacademy.com"
      >
        3rd menu item (disabled)
      </a>
    ),
    disabled: true,
  },
  {
    key: "4",
    danger: true,
    label: "a danger item",
  },
];
const BasedLayout = ({ children }) => {
  return (
    <div>
      <div
        className="flex justify-between items-center bg-white h-[8vh] px-3"
        style={{
          zIndex: 1000,
          position: "relative",
          boxShadow: "0px 4px 4px 0px #052A4914",
        }}
      >
        <div className="flex">
          <div
            style={{
              transform: "translate(3px,10px)",
              width: 8,
              height: 8,
              background: "#FF7B00",
              borderRadius: "50%",
            }}
          ></div>
          <div className="ml-2 poppins-bold">MyBrand</div>
        </div>
        <div>
          <Dropdown
            menu={{
              items,
            }}
          >
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <div
                  className="flex text-xs justify-center items-center text-white"
                  style={{
                    background:
                      "linear-gradient(180deg, #72CBEE 100%, #1BA8DF 100%)",
                    width: 32,
                    height: 32,
                    borderRadius: "50%",
                  }}
                >
                  CR
                </div>
                <div className="text-sm poppins-medium">Cooper Rosser</div>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
      <div className="flex">
        <div className="flex flex-col justify-between w-[240px] sticky top-0 h-[92vh] bg-[#052A49]">
          <div className="mt-5">
            <ul>
              <li className="bg-[#084577] poppins-medium text-sm py-3">
                <div className="flex items-center justify-center gap-1">
                  <img src="/assets/icons/assignment.svg" />
                  <span className="text-white poppins-medium text-sm">
                    Order Management
                  </span>
                </div>
              </li>
            </ul>
          </div>
          <div style={{ borderTop: "1px solid white", paddingBottom: "20px" }}>
            <div className="flex items-center gap-1 pt-5 pl-5">
              <img src="/assets/icons/email.svg" />
              <span className=" text-[#8392a0] poppins-medium text-sm">
                Support
              </span>
            </div>
            <div className="text-white pl-7 poppins-medium text-sm">
              cs@bosnet.com
            </div>
          </div>
        </div>
        <div className="w-full bg-[#f0f4f6] h-[92vh] overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

export default BasedLayout;
