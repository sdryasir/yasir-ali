
import {Poppins, Roboto} from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./globals.css";
import Header from '@/components/header';
import Footer from '@/components/Footer';
import { SessionProvider } from 'next-auth/react'
import { Providers } from './Providers';

const roboto = Roboto({
  subsets:["latin"],
  weight:["100", "300", "400", "500", "700", "900"],
  variable:"--font-roboto"
})
const poppins = Poppins({
  subsets:["latin"],
  weight:["100", "200", "300", "400", "400", "500", "600", "700", "800", "900"],
  variable:"--font-poppins"
})
export const metadata = {
  type: 'website',
  title: {
    template:'%s',
    default: 'Learn Skills - Boost Your Skills - Grow Faster'
  },
  description: "Discover high-quality tech learning videos designed to boost skills and fuel career growth for students and professionals. Learn programming, development, and the latest technologies anytime, anywhere.",
  metadataBase: new URL('https://yasir-ali.vercel.app/'),
  twitter:{
    card:'summary_large_image',
    site:'https://yasir-ali.vercel.app/',
    creator:'@Yasir_SuperTech',
    title:'Your Learning Partner',
    description:'Learn programming, development, and the latest technologies anytime, anywhere.',
    images:['https://yasir-ali.vercel.app/open_graph.jpg']
  },
  openGraph:{
    title: 'Learn Skills - Boost Your Skills - Grow Faster',
    description: 'Discover high-quality tech learning videos to grow your career. Learn coding, design, and more with expert-led tutorials.',
    url: 'https://yasir-ali.vercel.app/',
    siteName: 'Tech Learning Hub',
    images: [{
      url:'https://yasir-ali.vercel.app/open_graph.jpg',
      width: 1200,
      height: 630,
      alt: 'Tech Learning Platform'
    }],
  },
  icons: {
    icon: '/favicon.png', 
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable}`}>
        <Providers>
          <Header/>
            {children}
          <Footer/>
        </Providers>
      </body>
    </html>
  );
}
