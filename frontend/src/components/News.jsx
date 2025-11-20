import { useEffect, useState } from "react";
import { api } from "../services/api";
import Loader from "./Loader";

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadNews = async () => {
    try {
      const res = await api.get("/news");
      setNews(res.data.stories);
    } catch {
      alert("Unable to load news");
    }
    setLoading(false);
  };

  useEffect(() => {
    loadNews();
  }, []);

  return (
    <div>
      {loading && <Loader />}

      {!loading && (
        <div className="news-list">
          {news.map((item) => (
            <div key={item.id} className="border-b py-3">
              <a
                href={item.url}
                target="_blank"
                className="font-semibold hover:underline"
              >
                {item.title}
              </a>
              <p className="muted text-sm mt-1">
                Score: {item.score} | By {item.by}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
