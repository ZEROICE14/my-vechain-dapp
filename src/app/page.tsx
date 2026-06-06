import dynamic from 'next/dynamic';

const HomePage = dynamic(() => import('./HomePageClient'), { ssr: false });

export default function Page() {
  return <HomePage />;
}