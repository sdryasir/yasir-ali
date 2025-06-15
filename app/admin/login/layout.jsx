import {Poppins, Roboto} from 'next/font/google';
import 'bootstrap/dist/css/bootstrap.min.css';
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
  title: "Admin Login",
  description: "Login",
};

export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className={`${roboto.variable} ${poppins.variable}`}>
        {children}
      </body>
    </html>
  );
}
