import { memo, useCallback, useMemo, useRef, useState, useEffect } from 'react';
import {
  Animated,
  Easing,
  FlatList,
  Share,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useFocusEffect, useRoute } from '@react-navigation/native';
import type { VideoRef } from 'react-native-video';
import Reel from './components/Reel';

type AffirmationCategory = {
  name: string;
  video?: number | { uri: string };
  thumbnail?: string;
};

type AffirmationListItem = {
  id: number;
  affirmation: string;
  is_liked: boolean;
  category: AffirmationCategory;
};

const AFFIRMATION_ITEMS: AffirmationListItem[] = [
  {
    id: 1,
    affirmation:
      'I begin this day with peace in my mind and purpose in my heart.',
    is_liked: false,
    category: {
      name: 'Calm',
      video: require('../assets/1.mp4'),
      thumbnail:
        'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200',
    },
  },
  {
    id: 2,
    affirmation: 'I trust myself to make wise choices one step at a time.',
    is_liked: false,
    category: {
      name: 'Confidence',
      video: require('../assets/2.mp4'),
      thumbnail:
        'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1200',
    },
  },
  {
    id: 3,
    affirmation: 'I welcome growth and celebrate steady progress today.',
    is_liked: false,
    category: {
      name: 'Growth',
      video: require('../assets/3.mp4'),
      thumbnail:
        'https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1200',
    },
  },
  {
    id: 4,
    affirmation: 'I choose calm responses and protect my inner balance.',
    is_liked: false,
    category: {
      name: 'Balance',
      video: require('../assets/1.mp4'),
    },
  },
  {
    id: 5,
    affirmation: 'I am capable, prepared, and ready for what comes next.',
    is_liked: false,
    category: {
      name: 'Strength',
      video: require('../assets/2.mp4'),
    },
  },
  {
    id: 6,
    affirmation: 'My energy is focused, clear, and aligned with my goals.',
    is_liked: false,
    category: {
      name: 'Focus',
      video: require('../assets/3.mp4'),
    },
  },
  {
    id: 7,
    affirmation: 'I release comparison and honor my own unique path.',
    is_liked: false,
    category: {
      name: 'Self-Worth',
      video: require('../assets/1.mp4'),
    },
  },
  {
    id: 8,
    affirmation: 'I create space for joy, rest, and meaningful moments.',
    is_liked: false,
    category: {
      name: 'Joy',
      video: require('../assets/2.mp4'),
    },
  },
  {
    id: 9,
    affirmation: 'I speak to myself with kindness, patience, and respect.',
    is_liked: false,
    category: {
      name: 'Compassion',
      video: require('../assets/3.mp4'),
    },
  },
  {
    id: 10,
    affirmation: 'I deserve good things, and I am open to receiving them.',
    is_liked: false,
    category: {
      name: 'Abundance',
      video: require('../assets/1.mp4'),
    },
  },
  {
    id: 11,
    affirmation: 'I let go of what I cannot control and breathe with ease.',
    is_liked: false,
    category: {
      name: 'Release',
      video: require('../assets/2.mp4'),
    },
  },
  {
    id: 12,
    affirmation: 'I am resilient, and every challenge is shaping my strength.',
    is_liked: false,
    category: {
      name: 'Resilience',
      video: require('../assets/3.mp4'),
    },
  },
  {
    id: 13,
    affirmation: 'I choose courage over fear and action over hesitation.',
    is_liked: false,
    category: {
      name: 'Courage',
      video: require('../assets/1.mp4'),
    },
  },
  {
    id: 14,
    affirmation: 'I am learning, improving, and becoming my best self daily.',
    is_liked: false,
    category: {
      name: 'Learning',
      video: require('../assets/2.mp4'),
    },
  },
  {
    id: 15,
    affirmation: 'I honor my boundaries and protect my peace without guilt.',
    is_liked: false,
    category: {
      name: 'Boundaries',
      video: require('../assets/3.mp4'),
    },
  },
  {
    id: 16,
    affirmation: 'I am proud of how far I have come and where I am headed.',
    is_liked: false,
    category: {
      name: 'Pride',
      video: require('../assets/1.mp4'),
    },
  },
  {
    id: 17,
    affirmation: 'I trust divine timing and stay patient with my process.',
    is_liked: false,
    category: {
      name: 'Patience',
      video: require('../assets/2.mp4'),
    },
  },
  {
    id: 18,
    affirmation: 'I welcome new opportunities with curiosity and confidence.',
    is_liked: false,
    category: {
      name: 'Opportunity',
      video: require('../assets/3.mp4'),
    },
  },
  {
    id: 19,
    affirmation:
      'I choose thoughts that support my health, hope, and happiness.',
    is_liked: false,
    category: {
      name: 'Wellness',
      video: require('../assets/1.mp4'),
    },
  },
  {
    id: 20,
    affirmation: 'I am enough exactly as I am, and I keep rising with grace.',
    is_liked: false,
    category: {
      name: 'Self-Love',
      video: require('../assets/2.mp4'),
    },
  },
];

const AffirmationReelItem = memo(function AffirmationReelItem({
  item,
  index,
  reelHeight,
  width,
  isScreenFocused,
  isActive,
  onAddToJournal,
  onLike,
  onShare,
  onVideoRef,
}: {
  item: AffirmationListItem;
  index: number;
  reelHeight: number;
  width: number;
  isScreenFocused: boolean;
  isActive: boolean;
  onAddToJournal: (item: AffirmationListItem) => void;
  onLike: (item: AffirmationListItem) => void;
  onShare: (payload: {
    category: string;
    affirmation: string;
    imageUri?: string;
    id: number;
  }) => void;
  onVideoRef: (index: number, ref: VideoRef | null) => void;
}) {
  const shareCardRef = useRef<any>(null);

  const handleShare = async () => {
    try {
      const uri = await shareCardRef.current?.capture?.();
      onShare({
        category: item.category.name,
        affirmation: item.affirmation,
        imageUri: uri,
        id: item.id,
      });
    } catch {
      onShare({
        category: item.category.name,
        affirmation: item.affirmation,
        id: item.id,
      });
    }
  };

  return (
    <>
      <View style={{ height: reelHeight }}>
        <Reel
          source={item.category.video}
          loadingThumbnailSource={
            item.category.thumbnail
              ? { uri: item.category.thumbnail }
              : undefined
          }
          category={item.category.name}
          affirmation={item.affirmation}
          paused={!isScreenFocused || !isActive}
          width={width}
          height={reelHeight}
          loading={false}
          onPress={() => onAddToJournal(item)}
          liked={item.is_liked}
          onVideoRef={ref => {
            onVideoRef(index, ref);
          }}
          onHeartPress={() => onLike(item)}
          onSharePress={handleShare}
          created={false}
          isHome
        />
      </View>
      {/* Hidden shareable card — captured by ViewShot on share */}
      {/* <ViewShot
        ref={shareCardRef}
        options={{
          format: 'jpg',
          quality: 0.95,
          fileName: `mellow-${String(Date.now()).slice(-6)}`,
        }}
        style={{ position: 'absolute', left: -9999 }}
      >
        <View style={{ width, height: reelHeight, backgroundColor: '#000' }}>
          {item.category.thumbnail ? (
            <RNImage
              source={{ uri: item.category.thumbnail }}
              style={{ position: 'absolute', width: '100%', height: '100%' }}
              resizeMode="cover"
            />
          ) : null}
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.45)',
            }}
          />
          <View style={{ paddingTop: 50, alignItems: 'center' }}>
            <RNImage
              source={require('../assets/logo.png')}
              style={{ width: 70, height: 70, opacity: 0.9 }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              paddingHorizontal: 30,
            }}
          >
            <View style={{ marginBottom: 10 }}>
              <Animated.Text
                style={{
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 12,
                  fontWeight: '600',
                  textAlign: 'center',
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}
              >
                {item.category.name}
              </Animated.Text>
            </View>
            <Animated.Text
              style={{
                color: '#fff',
                fontSize: 22,
                fontWeight: '600',
                textAlign: 'center',
                lineHeight: 30,
              }}
            >
              {item.affirmation}
            </Animated.Text>
          </View>
          <View style={{ paddingBottom: 40, alignItems: 'center' }}>
            <Animated.Text
              style={{
                color: 'rgba(255,255,255,0.5)',
                fontSize: 11,
                fontWeight: '500',
              }}
            >
              mellow by sunshine club
            </Animated.Text>
          </View>
        </View>
      </ViewShot> */}
    </>
  );
});

export default function AffirmationsScreen() {
  const insets = useSafeAreaInsets();
  const { width, height } = useWindowDimensions();
  const reelHeight = height + insets.top + insets.bottom;
  const [affirmations, setAffirmations] =
    useState<AffirmationListItem[]>(AFFIRMATION_ITEMS);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isScreenFocused, setIsScreenFocused] = useState(true);
  const videoRefs = useRef<(VideoRef | null)[]>([]);

  const route = useRoute();
  console.log('Route Params:', route.params);
  const idParam = (route.params as { id?: number | string } | undefined)?.id;
  const id = idParam != null ? Number(idParam) : undefined;
  console.log('Affirmation ID:', id);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (id != null && !Number.isNaN(id)) {
      console.log('Affirmation ID:', id);
      // The ID to move to the front
      const idToMove = id;

      // Create a new array with the item with the given ID moved to the front
      const newAffirmationItems = [
        ...AFFIRMATION_ITEMS.filter(item => item.id === idToMove), // First, grab the item with the given ID
        ...AFFIRMATION_ITEMS.filter(item => item.id !== idToMove), // Then, grab the rest excluding the item with the given ID
      ];

      console.log(newAffirmationItems, "newAffirmationItems--------");

      setAffirmations(newAffirmationItems);
      setLoading(false);
    } else {
      setAffirmations(AFFIRMATION_ITEMS);
      setLoading(false);
    }
  }, [id]);

  const sessionStartRef = useRef(Date.now());

  useFocusEffect(
    useCallback(() => {
      setIsScreenFocused(true);
      sessionStartRef.current = Date.now();
      return () => {
        setIsScreenFocused(false);
        videoRefs.current.forEach(ref => {
          try {
            ref?.pause();
            ref?.seek(0);
          } catch (err) {
            if (__DEV__) console.warn('Failed to reset video ref', err);
          }
        });
      };
    }, []),
  );

  const viewabilityConfig = useMemo(
    () => ({ itemVisiblePercentThreshold: 60 }),
    [],
  );

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }: { viewableItems: { index: number | null }[] }) => {
      if (viewableItems?.length > 0 && viewableItems[0].index != null) {
        setActiveIndex(viewableItems[0].index);
      }
    },
    [],
  );

  const keyExtractor = useCallback(
    (item: (typeof affirmations)[0], index: number) => `${item.id}-${index}`,
    [],
  );

  const getItemLayout = useCallback(
    (_: unknown, index: number) => ({
      length: reelHeight,
      offset: reelHeight * index,
      index,
    }),
    [reelHeight],
  );
  const totalHeight = affirmations?.length * reelHeight;

  const handleAddToJournalForAffirmation = useCallback(
    (item: AffirmationListItem) => {
      if (__DEV__) console.log('Reflect in Journal:', item.id);
    },
    [],
  );

  const handleLikeAffirmation = useCallback((item: AffirmationListItem) => {
    setAffirmations(prev =>
      prev.map(entry =>
        entry.id === item.id ? { ...entry, is_liked: !entry.is_liked } : entry,
      ),
    );
  }, []);

  const handleShareAffirmation = useCallback(
    async ({
      category: _category,
      affirmation: _affirmation,
      imageUri,
      id: sharedId,
    }: {
      category: string;
      affirmation: string;
      imageUri?: string;
      id: number;
    }) => {
      await Share.share({
        message: `https://anne-untippled-dispiritedly.ngrok-free.dev/affirmations/${sharedId}`,
        ...(imageUri ? { url: imageUri } : {}),
      });
    },
    [],
  );

  const [showSwipeHint, setShowSwipeHint] = useState(true);
  const bobAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!showSwipeHint) return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(bobAnim, {
          toValue: -12,
          duration: 600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(bobAnim, {
          toValue: 0,
          duration: 600,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [bobAnim, showSwipeHint]);

  useEffect(() => {
    if (activeIndex > 0) setShowSwipeHint(false);
  }, [activeIndex]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {showSwipeHint && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 100,
            alignSelf: 'center',
            zIndex: 10,
            alignItems: 'center',
            transform: [{ translateY: bobAnim }],
          }}
          pointerEvents="none"
        >
          <View
            style={{
              width: 20,
              height: 20,
              borderTopWidth: 2.5,
              borderLeftWidth: 2.5,
              borderTopColor: 'rgba(255,255,255,0.8)',
              borderLeftColor: 'rgba(255,255,255,0.8)',
              transform: [{ rotate: '45deg' }],
            }}
          />
          <View
            style={{
              marginTop: 4,
              backgroundColor: 'rgba(0,0,0,0.4)',
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: 10,
            }}
          >
            <View>
              <Animated.Text
                style={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: 11,
                  fontWeight: '500',
                }}
              >
                Swipe up
              </Animated.Text>
            </View>
          </View>
        </Animated.View>
      )}
      <FlatList
        data={affirmations}
        keyExtractor={keyExtractor}
        contentInsetAdjustmentBehavior="never"
        renderItem={({ item, index }) => (
          <AffirmationReelItem
            item={item}
            index={index}
            reelHeight={reelHeight}
            width={width}
            isScreenFocused={isScreenFocused}
            isActive={index === activeIndex}
            onAddToJournal={handleAddToJournalForAffirmation}
            onLike={handleLikeAffirmation}
            onShare={handleShareAffirmation}
            onVideoRef={(i, ref) => {
              videoRefs.current[i] = ref;
            }}
          />
        )}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        pagingEnabled
        snapToAlignment="start"
        snapToInterval={reelHeight}
        decelerationRate="fast"
        showsVerticalScrollIndicator={false}
        getItemLayout={getItemLayout}
        contentContainerStyle={{ height: totalHeight }}
        style={[
          { flex: 1 },
          { marginTop: -insets.top, marginBottom: -insets.bottom },
        ]}
        removeClippedSubviews={false}
        initialNumToRender={1}
        maxToRenderPerBatch={2}
        windowSize={3}
      />
    </View>
  );
}
