import React from 'react'
import ContentBox from '../UI/ContentBox';
import AddNewTournamentCard from './AddNewTournamentCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";


const TournamentsBox = () => {

    return (
        <ContentBox heading={ 'tournaments' } headingStyle={ 'text-4xl font-bold' }>
            <div className='w-full h-full pb-12 px-12 grid grid-cols-5 gap-8'>
                <div className='col-span-1'>
                    <AddNewTournamentCard />
                </div>
                <div className='col-span-4'>
                    <Swiper
                        slidesPerView={ 4 }
                        spaceBetween={ 30 }
                        pagination={ {
                            clickable: true,
                        } }
                        navigation={ true }
                        modules={ [Navigation, Pagination] }
                        className="w-full h-full"
                    >
                        <SwiperSlide>
                            <AddNewTournamentCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <AddNewTournamentCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <AddNewTournamentCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <AddNewTournamentCard />
                        </SwiperSlide>
                        <SwiperSlide>
                            <AddNewTournamentCard />
                        </SwiperSlide>

                    </Swiper>
                </div>
            </div>
        </ContentBox>
    )
}

export default TournamentsBox;