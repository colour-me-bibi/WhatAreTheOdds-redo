import getPortfolio from "#/api/queries/getPortfolio";
import getUser from "#/api/queries/getUser";
import TokenTindr from "#/components/TokenTindr";

const Profile: React.FC = () => {
  const user = getUser();
  const portfolio = getPortfolio();

  return (
    <div className="container mt-3">
      {user.isLoading && <div>Loading user...</div>}
      {user.isError && <div>Error: {user.error.message}</div>}
      {user.isSuccess && (
        <>
          <h1>{user.data.username}' Profile</h1>
          <hr />
          <h5>Your token balanace is: {user.data.tokenAmount} tokens.</h5>
        </>
      )}

      {portfolio.isLoading && <div>Loading portfolio...</div>}
      {portfolio.isError && <div>Error: {portfolio.error.message}</div>}
      {portfolio.isSuccess && (
        <>
          <hr />
          <div>
            <h4>Pending Offers</h4>
            <hr />
            {portfolio.data.pendingOffers?.map((offer) => (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">Contract #{offer.contract}</h5>
                  <p className="card-text">
                    {offer.shareAmount} shares at {offer.price} tokens per share.
                  </p>
                  <p className="card-text">Created on {offer.createdAt.toLocaleString()}</p>
                </div>
              </div>
            ))}
            <h4>Current Investments - {portfolio.data.currentInvestments?.length ?? 0} investments</h4>
            <hr />
            {portfolio.data.currentInvestments?.map((investment) => (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{JSON.stringify(investment)}</h5>
                </div>
              </div>
            ))}
          </div>
          <TokenTindr />
        </>
      )}
    </div>
  );
};

export default Profile;
