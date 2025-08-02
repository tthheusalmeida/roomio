interface TitleProps {
  children: React.ReactNode;
}

export default function Title({ children }: TitleProps) {
  return (
    <>
      <h1 className="font-bold text-5xl my-8">{children}</h1>
    </>
  );
}
