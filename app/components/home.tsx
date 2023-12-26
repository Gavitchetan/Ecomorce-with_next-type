'use client'

import { useSearchParams } from 'next/navigation'

export function SearchBar() {
    const searchParams = useSearchParams()

    const search = searchParams?.get('category')
    console.log(search, 'serchdata prams')

    return search
}



const home = () => {
    return (
        <div>home</div>
    )
}

export default home