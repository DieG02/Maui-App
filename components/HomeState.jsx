import React from 'react';
import {View, Text, Dimensions, StyleSheet, ScrollView} from 'react-native';
import Frame from './Frame';
import Spacer from './Spacer';
import StateCard from './StateCard';
import Down from 'react-native-vector-icons/Ionicons';
import Top from 'react-native-vector-icons/Ionicons';

const {width} = Dimensions.get('window');

function HomeState() {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      snapToInterval={width - 60}
      decelerationRate={0.5}>
      <View style={{display: 'flex', flexDirection: 'row'}}>
        <View>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 2,
            }}>
            <StateCard
              color="#fafafa"
              state="Ingresos"
              value="$12000"
              left={30}
              icon={<Top name="arrow-up-circle" size={60} color="#3784F9" />}
            />
            <StateCard
              color="#fafafa"
              state="Egresos"
              value="$2000"
              left={20}
              icon={<Down name="arrow-down-circle" size={60} color="#A8CAFE" />}
            />
            <StateCard
              color="#fafafa"
              state="Por Cobrar"
              value="$4000"
              left={20}
              icon={<Top name="arrow-up-circle" size={60} color="#33E69B" />}
            />
            <StateCard
              color="#fafafa"
              state="Por pagar"
              value="$12000"
              left={20}
              right={30}
              icon={<Down name="arrow-down-circle" size={60} color="#FD6363" />}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#131313',
  },
});
export default HomeState;
