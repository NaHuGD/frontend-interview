import Image from 'next/image';

interface AvatarProps {
  index: number;
  width: number;
  height: number;
}

const Avatar: React.FC<AvatarProps> = ({ index, width, height }) => {
  const src = `/avatar-${index}.webp`;

  return (
    <Image
      src={src}
      alt={`Avatar image ${index}`}
      width={width}
      height={height}
      className="rounded-full"
    />
  );
};

export default Avatar;
