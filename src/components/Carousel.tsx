import React from 'react';
import { Button, Flex, Text } from 'theme-ui';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Carousel from 'react-material-ui-carousel';

interface ItemProps {
  imageUrl: string;
  mobileImageUrl: string;
  imageAlt: string;
  title?: string;
  subtitle?: string;
  description?: string;
  contentPosition?: string,
  buttonText?: string;
  buttonLink: string;
}

export interface HeroCarouselProps {
  carouselItem: ItemProps[];
}

const HeroCarousel: React.FC<HeroCarouselProps> = ({ carouselItem }) => {
    return (
      <>
        {carouselItem?.length > 0 && (
          <Carousel navButtonsAlwaysVisible={true} swipe={true} sx={{ width: '100%' }}>
            {carouselItem?.map((item: ItemProps, index: number) => (
              <HeroItem key={index} {...item} />
            ))}
          </Carousel>
        )}
      </>
    );
};

const styles = {
  cardStyle: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '5%',
    backgroundColor: '#FFFFFF',
    opacity: '0.99',
    color: '#000000',
    justifyContent: 'center',
    width: { xs: '80%', md: '50%' },
    gap: 2,
  },
  nameStyle: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 600,
  },
  desStyle: {
    width: '100%',
    textAlign: 'center',
  },
  subTitleStyle: {
    width: '100%',
    textAlign: 'center',
    fontWeight: 800,
  },
};

const HeroItem: React.FC<ItemProps> = ({
  imageUrl,
  mobileImageUrl,
  imageAlt,
  title,
  subtitle,
  description,
  contentPosition,
  buttonText,
  buttonLink,
},) => {
  const router = useRouter();
  const mobileView = true; // Define your logic for mobile view here

  return (
    <Flex sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <Image
        src={mobileView ? mobileImageUrl : imageUrl}
        alt={imageAlt || 'product-image-alt'}
        width={400}
        height={300}
      />
      <Flex>
        <Text variant="h2">
          {title}
        </Text>
        <Text variant="h1">
          {subtitle}
        </Text>
        <Text>{description}</Text>
        <Button
          variant="contained"
          sx={{ fontSize: mobileView ? '0.5rem' : '1rem' }}
          onClick={() => router.push(buttonLink)}
        >
          {buttonText}
        </Button>
      </Flex>
    </Flex>
  );
};

export default HeroCarousel;
