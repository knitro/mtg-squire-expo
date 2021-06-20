import React from 'react';
import FirstScreenButton from './Slides/FirstScreenButton';
import SecondScreenButton from './Slides/SecondScreenButton';
import { Dimensions, View } from 'react-native';

// import Swiper core and required components
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/swiper.scss';
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';
import 'swiper/swiper-bundle.css';


SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const w  = Dimensions.get('window').width;
const h = Dimensions.get('window').height/2;



const LifeTotalTwoPlayer = () => {
    return (
    <View>
        <Swiper
            slidesPerView={1}
            initialSlide={1}
            speed={300}
            pagination={true}            
            // direction="vertical"     
            style={{width: w, height: h}}
            // paginationStyle={{position:'absolute', bottom: 10}} , position:'absolute', marginTop: 10  
        > 
            <SwiperSlide>
            <SecondScreenButton rotation={180} player={0} width={w} height={h}/>
            </SwiperSlide>
            <SwiperSlide>
            <FirstScreenButton rotation={180} player={0} width={w} height={h}/>
            </SwiperSlide>
        </Swiper>
        <Swiper
            slidesPerView={1}
            initialSlide={0}
            speed={300}
            pagination={true}
            // direction="vertical"            
            style={{width:w, height: h}}
        > 
            <SwiperSlide>
            <FirstScreenButton rotation={0} player={1} width={w} height={h}/>
            </SwiperSlide>
            <SwiperSlide>
            <SecondScreenButton rotation={0} player={1} width={w} height={h}/>
            </SwiperSlide>
        </Swiper>
    </View>
      
    )
}

export default LifeTotalTwoPlayer;