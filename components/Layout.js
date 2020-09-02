import Header from "./Header";
import Head from "next/head";

export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-2343150-50"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-2343150-50');
        `,
          }}
        />
      </Head>
      <Header />
      <div>{children}</div>

      <style global jsx>{`
        html,
        body,
        body > div:first-child,
        div#__next,
        div#__next > div {
          height: 100vh;
          background-color: #f8f8f8;
        }
      `}</style>
    </div>
  );
}
