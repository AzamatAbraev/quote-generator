import { memo, useEffect, useState } from "react";
import useQuote from "../../store/quote";
import { Link } from "react-router-dom";

import "./style.scss";

const HomePage = () => {

  const { quote, getQuote } = useQuote();
  const [callback, setCallback] = useState(false);

  useEffect(() => {
    getQuote()
  }, [getQuote, callback])


  return (
    <section id="home">
      <Link to="/quotes" className="home__title">Get Your Favourite Quotes</Link>
      <div className="container home__container">
        {quote.map(data => <div key={data?._id} className="quote">
          <h2 className="quote__content">{data?.content}</h2>
          <p className="quote__author">-{data?.author}</p>
          <button onClick={() => setCallback(!callback)} className="quote__renew">
            Renew
          </button>
        </div>)}
      </div>
    </section>
  )
}

const MemoHomePage = memo(HomePage);
export default MemoHomePage;