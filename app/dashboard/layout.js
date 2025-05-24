import {Poppins, Roboto} from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from '@/components/admin-components/navbar';
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
  title: "Admin Dashboard",
  description: "Manage Courses",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable}`}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
