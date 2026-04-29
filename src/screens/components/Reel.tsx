import { useRef, useEffect, useCallback } from 'react';
import {
  View,
  useWindowDimensions,
  Pressable,
  Text,
  Button,
  Platform,
  Image,
} from 'react-native';
import { Video, type VideoRef } from 'react-native-video';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export interface ReelProps {
  source?: number | { uri: string };
  category: string;
  affirmation: string;
  paused?: boolean;
  width?: number;
  height?: number;
  loading?: boolean;
  liked?: boolean;
  loadingThumbnailSource?: any;
  onVideoRef?: (ref: VideoRef | null) => void;
  onHeartPress?: () => void;
  onSharePress?: () => void;
  onPress?: () => void;
  created?: boolean;
  isHome?: boolean;
}

export default function Reel({
  source,
  category,
  affirmation,
  paused = false,
  width: widthProp,
  height: heightProp,
  loading: _loading = false,
  liked: _liked = false,
  loadingThumbnailSource: _loadingThumbnailSource,
  onVideoRef,
  onHeartPress,
  onSharePress,
  onPress,
  created = false,
  isHome: _isHome = false,
}: Readonly<ReelProps>) {

  const windowSize = useWindowDimensions();
  const width = widthProp ?? windowSize.width;
  const height = heightProp ?? windowSize.height;
  const videoRef = useRef<VideoRef | null>(null);
  const heartScale = useSharedValue(1);
  const insets = useSafeAreaInsets();

  const heartAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: heartScale.value }],
  }));

  const handleHeartPress = useCallback(() => {
    heartScale.value = withSequence(
      withSpring(1.45, { damping: 8, stiffness: 400 }),
      withSpring(1, { damping: 12, stiffness: 200 }),
    );

    onHeartPress?.();
  }, [heartScale, onHeartPress]);

  const handleSharePress = useCallback(() => {
    onSharePress?.();
  }, [onSharePress]);

  const setRef = (r: VideoRef | null) => {
    videoRef.current = r;
    onVideoRef?.(r);
  };

  useEffect(() => () => onVideoRef?.(null), [onVideoRef]);

  const bottom = 200;
  const resolvedSource =
    typeof source === 'number'
      ? (() => {
          const asset = Image.resolveAssetSource(source);
          return asset?.uri ? { uri: asset.uri } : source;
        })()
      : source;

  return (
    <View style={{ position: 'relative', width, height,borderWidth:2 ,borderColor:'red'}}>
      {resolvedSource != null && (
        <Video
          ref={setRef}
          source={{ uri: "https://d2gjsddmcw1mmx.cloudfront.net/Compress-Video/coconut_tree.mp4" }}
          paused={paused}
          muted={paused}
          repeat
          onLoad={() => {
            if (__DEV__) console.log('Video loaded');
          }}
          onError={error => {
            if (__DEV__) console.log('Video error', JSON.stringify(error));
          }}
          playInBackground={false}
          playWhenInactive={false}
          style={{
            position: 'absolute',
            zIndex: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: '100%',
            height: '100%',
            borderWidth:2
          }}
          resizeMode="cover"
        />
      )}
      <View
        style={{
          position: 'absolute',
          zIndex: 1,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.50)',
          pointerEvents: 'none',
        }}
      />
      <View
        style={{
          position: 'absolute',
          zIndex: 2,
          top: Platform.OS === 'android' ? insets.bottom + 1.5 : 60,
          left: 0,
          right: 0,
        }}
      >
        <Text>{category}</Text>
      </View>

      <View
        style={{
          position: 'absolute',
          zIndex: 2,
          bottom: Platform.OS === 'android' ? insets.bottom + 130 : bottom,
          right: 20,
          gap: 32,
          flexDirection: 'column',
        }}
      >
        <Pressable onPress={handleHeartPress} hitSlop={12}>
          <Animated.View style={heartAnimatedStyle}>
            {/* <Icon
              icon="heart"
              size={32}
              color={liked ? '#FF6B9D' : theme.white}
              isFilled={liked}
            /> */}
            <Text>Heart</Text>
          </Animated.View>
        </Pressable>
        <Pressable onPress={handleSharePress} hitSlop={12}>
          {/* <Icon icon="share" size={32} color={theme.white} /> */}
          <Text>Share</Text>
        </Pressable>
      </View>

      {onPress && (
        <View
          style={{
            position: 'absolute',
            zIndex: 2,
            bottom: Platform.OS === 'android' ? insets.bottom + 20 : 80,
            left: '50%',
            transform: [{ translateX: '-50%' }],
          }}
        >
          <Button
            title={created ? 'Added' : 'Reflect in your Journal'}
            onPress={onPress}
          />
        </View>
      )}

      <View
        style={{
        //   position: 'absolute',
          zIndex: 2,
          left: '50%',
          top: '50%',
          transform: [{ translateX: '-50%' }, { translateY: '-50%' }],
          padding: 20,
        }}
      >
        <Text style={{ fontSize: 24, color: 'white', textAlign: 'center' }}>
          {affirmation}
        </Text>
      </View>
    </View>
  );
}
