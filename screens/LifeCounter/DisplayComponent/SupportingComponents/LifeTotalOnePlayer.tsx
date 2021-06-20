import React from 'react';
import SecondScreenButton from './Slides/SecondScreenButton';
import FirstScreenButton from './Slides/FirstScreenButton';
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
const h = Dimensions.get('window').height;


const LifeTotalOnePlayer = () => {
    return (

      <View>

        <Swiper
            slidesPerView={1}
            initialSlide={0}
            speed={300}
            pagination={true}
            // direction="vertical"            
            style={{width:w, height: h}}
        > 
          <SwiperSlide>
            <FirstScreenButton rotation={0} player={0} width={w} height={h}/>
          </SwiperSlide>
          <SwiperSlide>
          <SecondScreenButton rotation={0} player={0} width={w} height={h}/>
          </SwiperSlide>
        </Swiper>  

      </View>  
    )
}

export default LifeTotalOnePlayer;