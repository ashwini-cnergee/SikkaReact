import React, { useCallback } from 'react';

import Carousel from 'react-native-banner-carousel';

import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Linking,
  ActivityIndicator
} from 'react-native';

import styles from './../Stylesheet';

import _ from 'lodash';

const HomeBanner = (props) => {
  
  const BannerHeight = 200;

  const banners = _.get(props,'banners',[
    ['http://newapp.guardini.in/banners/1.png','http://www.google.co.in'],
    ['http://newapp.guardini.in/banners/2.png','http://www.facebook.com'],
    ['http://newapp.guardini.in/banners/3.png','http://instagram.com']
  ]);

  const getBannerWidth = () => {
    var w = Dimensions.get('window').width;
    w = w - (w*5/100);
    return w;
  }

  const renderBanner= (banner, index) => {

    const bannerClickHandler = useCallback(async () => {

      const url = _.get(banner,'1',null);
    
      const supported = await Linking.canOpenURL(url);
  
      if (supported) {    
        await Linking.openURL(url);
      } else {
        alert(`Don't know how to open this URL: ${url}`);
      }
    }, [_.get(banner,'1',null)]);
  
  
    return <View key={index}>
        <TouchableOpacity onPress={bannerClickHandler}>
          <Image style={{ width: getBannerWidth(), height: BannerHeight }} source={{ uri: banner[0] }} PlaceholderContent={<ActivityIndicator />} />
        </TouchableOpacity>
    </View>;  
  }

  return <View style={styles.bannerContainer}>
    <Carousel        
        autoplay={false}
        autoplayTimeout={5000}
        loop
        index={0}
        pageSize={getBannerWidth()}
    >
      {banners.map((banner, index) => renderBanner(banner, index))}
    </Carousel>
  </View>;

}

export default HomeBanner;