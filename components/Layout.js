import Header from "./Header";

export default function Layout({ children }) {
  return (
    <div>
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
