"use client"
import axios from "axios"
import { useQuery } from "@tanstack/react-query";
// import useGetListData from "./hooks/useGetListData";
import { AuthWithFacebook } from "./login/page";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import UseGetListData from "./hooks/useGetListData";

export default function Home() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const { data, refetch } = UseGetListData(searchQuery, 1)

  const handleSearch = (e) => {
    setSearchQuery(e.target.value)
  }

  useEffect(() => {
    // delay query 2s for minimum request to server
    const delaySearchQuery = setTimeout(() => {
      refetch()
    }, 2000)

    return () => {
      clearTimeout(delaySearchQuery)
    }
  }, [searchQuery])

  const handleDetailData = (id) => {
    router.push(`/${id}`)
  }

  return (
    <main className="flex flex-col">
      <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
          <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
          </svg>
        </div>
        <input onChange={handleSearch} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..." required />
      </div>

      <div className="relative overflow-x-auto mt-5">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                Location
              </th>
              <th scope="col" className="px-6 py-3">
                Type

              </th>
            </tr>
          </thead>
          <tbody>
            {
              data?.data?.map((item) => {
                return (
                  <tr key={item?.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-slate-100 cursor-pointer" onClick={() => handleDetailData(item?.id)}>
                    <th style={{ maxWidth: "300px", overflow: "hidden", textOverflow: "ellipsis" }} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {item?.description}
                      {/* <div dangerouslySetInnerHTML={{ __html: item.description }} /> */}
                    </th>
                    <td className="px-6 py-4">
                      {item?.location}
                    </td>
                    <td className="px-6 py-4">
                      {item?.type}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

    </main>
  );
}
