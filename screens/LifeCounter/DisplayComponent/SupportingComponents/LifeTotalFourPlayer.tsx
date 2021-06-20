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

const w = Dimensions.get('window').width;
const h = Dimensions.get('window').height;
const w2 = w/2;
const h2 = h/2;

/**
 * Life total grid for four players
 */
const LifeTotalFourPlayer = () => {
    return (
      <View>
        <View style={{width: w, height: h2,flexDirection:'row', justifyContent:'flex-start'}}>

          {/* Player 1 */}
          <Swiper
            slidesPerView={1}
            initialSlide={0}
            speed={300}
            pagination={true}
            direction="vertical"            
            style={{width:w2, height: h2}}
          > 
            <SwiperSlide>
              <FirstScreenButton rotation={90} player={0} width={w2} height={h2}/>
            </SwiperSlide>
            <SwiperSlide>
              <SecondScreenButton rotation={90} player={0} width={w2} height={h2}/>
            </SwiperSlide>
          </Swiper>

          {/* Player 2 */}
          <Swiper
            slidesPerView={1}
            initialSlide={1}
            speed={300}
            pagination={true}
            direction="vertical"            
            style={{width:w2, height: h2}}
          > 
            <SwiperSlide>
              <SecondScreenButton rotation={270} player={1} width={w2} height={h2}/>
            </SwiperSlide>
            <SwiperSlide>
              <FirstScreenButton rotation={270} player={1} width={w2} height={h2}/>
            </SwiperSlide>
          </Swiper>

        </View>
        <View style={{width: w, height: h2,flexDirection:'row', justifyContent:'flex-start'}}>

          {/* Player 3 */}
          <Swiper
            slidesPerView={1}
            initialSlide={0}
            speed={300}
            pagination={true}
            direction="vertical"            
            style={{width:w2, height: h2}}
          > 
            <SwiperSlide>
              <FirstScreenButton rotation={90} player={2} width={w2} height={h2}/>
            </SwiperSlide>
            <SwiperSlide>
              <SecondScreenButton rotation={90} player={2} width={w2} height={h2}/>
            </SwiperSlide>
          </Swiper>

          {/* Player 4 */}
          <Swiper
            slidesPerView={1}
            initialSlide={1}
            speed={300}
            pagination={true}
            direction="vertical"            
            style={{width:w2, height: h2}}
          > 
            <SwiperSlide>
              <SecondScreenButton rotation={270} player={3} width={w2} height={h2}/>
            </SwiperSlide>
            <SwiperSlide>
              <FirstScreenButton rotation={270} player={3} width={w2} height={h2}/>
            </SwiperSlide>
          </Swiper>

        </View>
      </View>

    )
}

export default LifeTotalFourPlayer;