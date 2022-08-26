import getMarket from "#/api/queries/getMarket";
import getRedditSubmissions from "#/api/queries/getRedditSubmissions";
import ContractsList from "#/components/ContractsList";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MarketDetail: React.FC = () => {
  const { marketId } = useParams();

  if (!marketId) {
    return <div>No market id provided</div>;
  }

  const navigate = useNavigate();

  useEffect(() => {
    if (marketId === undefined || !/\d+/.test(marketId)) {
      console.error("Invalid marketId:", marketId);
      navigate(-1);
    }
  }, [marketId, navigate]);

  const market = getMarket(parseInt(marketId));

  const redditSubmissions = getRedditSubmissions("Politics");

  return (
    <div className="container mt-3">
      {market.isLoading && <div>Loading...</div>}
      {market.isError && <div>Error: {market.error.message}</div>}
      {market.isSuccess && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{market.data.name}</h5>
            {market.data.tags?.map((tag) => (
              <span key={`${market.data.id}-${tag.name}`} className="badge bg-secondary">
                {tag.name}
              </span>
            ))}
            <ContractsList contracts={market.data.contracts} />
          </div>
        </div>
      )}
      {redditSubmissions.isLoading && <div>Loading...</div>}
      {redditSubmissions.isError && <div>Error: {redditSubmissions.error.message}</div>}
      {redditSubmissions.isSuccess && (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">Reddit Submissions - searched for {redditSubmissions.data.term}</h5>
            {redditSubmissions.data.submissions?.map((submission) => (
              <div key={submission.permalink} className="card">
                <div className="card-body">
                  <h5 className="card-title">{submission.title}</h5>
                  <p className="card-text">{submission.selftext}</p>

                  <a href={submission.permalink} className="btn btn-primary">
                    View on Reddit
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketDetail;
