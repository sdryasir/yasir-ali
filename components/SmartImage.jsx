import Image from 'next/image';

const SmartImage = ({
  src,
  alt,
  width,
  height,
  fill = false,
  priority = false,
  objectFit = 'cover',
  sizes = '100vw',
  className = '',
  style = {}
}) => {
 
  const imageProps = fill
    ? {
        fill: true,
        sizes,
        style: {
          objectFit,
          ...style,
        },
      }
    : {
        width,
        height,
        style: {
          objectFit,
          ...style,
        },
      };

  return (
    <div
      className={className}
      style={{
        position: fill ? 'relative' : 'initial',
        width: fill ? '100%' : width,
        height: fill ? '100%' : height,
        overflow: 'hidden',
        ...style,
      }}
    >
      <Image
        src={src}
        alt={alt}
        priority={priority}
        {...imageProps}
      />
    </div>
  );
};

export default SmartImage;
