import './globals.css';
import { spaceGrotesk } from './ui/fonts';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={`${spaceGrotesk.variable}`}>
      <body>
        <header className='sr-only'>
          <h1>INTERACTIVE DETAILS FORM</h1>
        </header>
        {children}
      </body>
    </html>
  );
}
