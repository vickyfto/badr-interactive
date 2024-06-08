"use client"
import React from 'react'
import axios from "axios"
import { useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

const DetailData = ({ params }) => {
    const router = useRouter()
    const { data, refetch } = useQuery({
        queryKey: ['getDetailData'],
        queryFn: () => {
            return axios.get(`https://dev6.dansmultipro.com/api/recruitment/positions/${params.slug}`).then((res) => res)
        }
    })

    return (
        <>
            <div className='cursor-pointer font-medium' onClick={() => router.push("/")}>{"<"} Back</div>
            <div className='border-2 mt-2 border-gray-400 py-2 px-5 rounded-lg'>
                <div className="text-2xl">{data?.data?.type} / {data?.data?.location}</div>
                <div className="text-md font-medium">{data?.data?.title}</div>
                <hr />
                <div className='grid grid-cols-12 gap-4 mt-5'>
                    <div className='min-h-32 col-span-7'>
                        <div dangerouslySetInnerHTML={{ __html: data?.data?.description }} />

                    </div>
                    <div className='col-span-5'>
                        <div className="w-full bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                            </a>
                            <div className="p-5">
                                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{data?.data?.company}</h5>
                                <hr />
                                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRalke-Kf6_TB5yrnMuUYP158MBQd4bezQIxw&s" width="100%" />
                                <a href={data?.data?.company_url} target='_blank'>{data?.data?.company_url}</a>
                            </div>
                        </div>
                        <div className="w-full mt-5 bg-yellow-100 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <a href="#">
                                <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                            </a>
                            <div className="p-5">
                                <div className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">How to apply</div>
                                <hr />
                                <div dangerouslySetInnerHTML={{ __html: data?.data?.how_to_apply }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailData