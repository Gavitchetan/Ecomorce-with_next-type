import React from 'react'

const page = () => {
    return (
        <div className='  absolute top-[40%]  left-[50%]  '>
            <div className="grid grid-cols-4 gap-16 -ml-10 -mt-10">

                <div className="relative">
                    <div className=" w-32  h-32 rounded-full absolute border-2 border-solid border-gray-200"></div>
                    <div
                        className="w-32  h-32  rounded-full animate-spin absolute border-2 border-solid border-indigo-500 border-t-transparent">
                    </div>
                </div>


            </div>
        </div>
    )
}

export default page