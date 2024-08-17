"use client";
import { useQuery } from "@tanstack/react-query";
import { DatePicker, Input } from "antd";
import axios from "axios";
import { useRouter } from "next/navigation";

const Dashboard = () => {
  const router = useRouter();
  const onChange = (date, dateString) => {
    console.log(date, dateString);
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
  console.log("data:", data?.data?.data);
  return (
    <div>
      <div className="text-center text-2xl poppins-bold my-5">
        Order Management
      </div>

      <div className="mx-6">
        <div className="bg-white w-full mt-2 px-5 py-4 rounded-lg">
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <div className="w-[300px]">
                <label>Customer Name</label>
                <Input
                  className="mt-1"
                  placeholder="Enter your username"
                  suffix={<img src="/assets/icons/search.svg" />}
                />
              </div>
              <div>
                <label>Create Date</label>
                <div className="mt-1">
                  <DatePicker
                    className="w-[300px]"
                    onChange={onChange}
                    suffixIcon={<img src="/assets/icons/date.svg" />}
                  />
                </div>
              </div>
            </div>
            {/* add for commit */}
            <div>
              <button
                onClick={() => router.push("/add")}
                className="bg-[#1BA8DF] text-white py-[4px] rounded-[4px] px-[12px]"
              >
                Add New Order
              </button>
            </div>
          </div>

          <div className="my-5 relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left rtl:text-right text-[#052A49] dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Id
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {data?.data?.data?.slice(0, 10).map((item) => {
                  return (
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                      <th
                        scope="row"
                        className="text-[0.8rem] px-6 py-[16px] font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {item.id}
                      </th>
                      <td className="px-6 py-[16px] text-[0.9rem]">
                        {item.name}
                      </td>
                      <td className="px-6 py-[16px] text-[0.9rem]">
                        {item.price}
                      </td>
                      <td className="px-6 py-[16px] text-[0.9rem]">
                        <a
                          href="#"
                          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <nav
            className="flex justify-between"
            aria-label="Page navigation example"
          >
            <div className="flex items-center gap-3">
              <div className="text-[0.8rem]">Show</div>
              <form className="max-w-sm mx-auto">
                <select
                  id="countries"
                  className="bg-gray-50 border border-[#052A49] text-gray-900 text-sm rounded-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2 px-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option className="text-[0.8rem]" selected value="US">
                    10
                  </option>
                  <option className="text-[0.8rem]" value="CA">
                    20
                  </option>
                  <option className="text-[0.8rem]" value="FR">
                    30
                  </option>
                  <option className="text-[0.8rem]" value="DE">
                    40
                  </option>
                </select>
              </form>
              <div className="text-[0.8rem]">per page of 32 results</div>
            </div>
            <ul className="inline-flex -space-x-px text-md">
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-[#052A49] bg-white border border-e-0 border-[#052A49] rounded-s-sm hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <img src="/assets/icons/arrow-pagination-left.svg" />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-[#052A49] bg-white border border-[#052A49] hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-[#052A49] bg-white border border-[#052A49] hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="flex items-center justify-center px-3 h-8 bg-[#052A49] border border-[#052A49] text-white hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-[#052A49] bg-white border border-[#052A49] hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  4
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-[#052A49] bg-white border border-[#052A49] hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  5
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center justify-center px-3 h-8 leading-tight text-[#052A49] bg-white border border-[#052A49] rounded-e-sm hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  <img src="/assets/icons/arrow-pagination-right.svg" />
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="text-center my-5 text-[0.9rem] text-[#828282]">
        @{new Date().getFullYear()} Managed by PT. Bosnet Distribution Indonesia
      </div>
    </div>
  );
};

export default Dashboard;
