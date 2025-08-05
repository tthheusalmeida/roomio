import Loading from "./Loading";

export default function SplashScreen() {
  return (
    <div className="h-dvh w-dvw flex items-center justify-center bg-violet-900">
      <Loading height={120} width={120} />
    </div>
  );
}
