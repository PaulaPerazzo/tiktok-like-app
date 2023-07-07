import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { Video } from 'expo-av';
import { videos } from '../../utils/videos';

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export default function Feed() {

  const [posts, setPosts] = useState([]);
  const [currentVid, setCurrentVid] = useState(0);

  console.log(videos[0])

  const getFeed = () => {
    const urls = videos.map((item) => item.url);
    setPosts(urls);
  };

  useEffect(() => {
    getFeed();
  }, []);

  const viewabilityConfigCallbackPairs = useRef(
    ({ changed, viewableItems }) => {
        console.log('changed', changed);
        console.log('viewableItems', viewableItems);

        if (changed.length > 0) {
            setCurrentVid(changed[0].index);
        }
    }
  )

  let vidRef = useRef(null);

  const renderVids = ({ item, index }) => {
    return (
        <Video
          ref={vidRef}
          source={{
            uri: item
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode='cover'
          shouldPlay={index === currentVid}
          isLooping
          style={{ width: width, height: height }}
        />
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
          data={posts}
          renderItem={renderVids}
          // style={styles.page}
          keyExtractor={(item) => item}
          pagingEnabled={true}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 95,
          }}
          onViewableItemsChanged={viewabilityConfigCallbackPairs.current}
        />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
