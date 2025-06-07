interface ArrowIconProps {
  active?: boolean;
}

export const ArrowLeftIcon = ({ active = false }: ArrowIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15.41 7.41L14 6L8 12L14 18L15.41 16.59L10.83 12L15.41 7.41Z"
        fill="#3A3541"
        fillOpacity={active ? '0.87' : '0.54'}
      />
    </svg>
  );
};

export const ArrowRightIcon = ({ active = false }: ArrowIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10.0001 6L8.59009 7.41L13.1701 12L8.59009 16.59L10.0001 18L16.0001 12L10.0001 6Z"
        fill="#3A3541"
        fillOpacity={active ? '0.87' : '0.54'}
      />
    </svg>
  );
};
