import React from 'react'
import CategoryList from '../components/CategoryList'
import BannerProduct from '../components/BannerProduct'
import HorizontalCardproduct from '../components/HorizontalCardproduct'
import VerticalCardProduct from '../components/VerticalCardproduct'

const Home = () => {
    return (
        <div>
            {/**loading category & banners */}
            <CategoryList />
            <BannerProduct />

            {/**loading product */}
            <HorizontalCardproduct category={'airpodes'} heading={"Top Airpodes"} />
            <HorizontalCardproduct category={'earphones'} heading={"Popular Earphones"} />

            <VerticalCardProduct category={"mobiles"} heading={"Mobiles"} />
            <VerticalCardProduct category={"mouse"} heading={"Mouse"} />
            <VerticalCardProduct category={"camera"} heading={"Camera & Photography"} />
            <VerticalCardProduct category={"televisions"} heading={"Televisions"} />
            <VerticalCardProduct category={"trimmers"} heading={"Trimmers"} />
            <VerticalCardProduct category={"printers"} heading={"Printers"} />
            <VerticalCardProduct category={"refrigenator"} heading={"Refrigenator"} />
            <VerticalCardProduct category={"processor"} heading={"Computer Processor"} />
            <VerticalCardProduct category={"speakers"} heading={"Bluetooth Speakers"} />

        </div>
    )
}

export default Home
