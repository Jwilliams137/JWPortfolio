import { Metadata } from "next";
import "./globals.css";
import styles from './layout.module.css';
import Nav from '../components/Nav/Nav';
import Footer from '../components/Footer/Footer';

export const metadata: Metadata = {
  title: "Julie Williams Web Developer",
  description: "Web Devlopment Portfolio - Julie Williams",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={styles.wrapper}>
        <Nav />
        <div className={styles.children_container}>
          {children}
        </div>
        <footer className={styles.footer}>
          <Footer />
        </footer>
      </body>
    </html>
  );
}