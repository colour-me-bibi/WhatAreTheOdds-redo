import useCreateOffer from "#/api/mutations/useCreateOffer";
import getUser from "#/api/queries/getUser";
import { SelectedContract } from "#/types";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const OfferForm: React.FC<SelectedContract> = ({ bestPrice, contractType, offerType, contract }) => {
  const navigate = useNavigate();

  const [price, setPrice] = useState(bestPrice);
  const [shareAmount, setShareAmount] = useState(10);

  const user = getUser();

  const createOffer = useCreateOffer({
    onSuccess: (offer) => {
      console.log(offer);
      navigate("/profile");
    },
  });

  return (
    <div className="container border py-1">
      <div className="d-flex justify-content-center fs-4 fw-bold pb-2 border-bottom border-2 border-dark mb-2">
        {contract.name} | {contractType} | {offerType} | {price} | {shareAmount}
      </div>
      <div className="row g-2">
        <div className="col-6">
          <div className="d-flex flex-column align-items-center">
            <label htmlFor="" className="fw-semibold">
              {offerType == "B" ? "Maximum Buy" : "Minimum Sell"} Price
            </label>
            <div className="border border-dark p-1">
              <span className="">-1c</span>
              <input
                type="number"
                name=""
                id=""
                value={price}
                onChange={(e) => setPrice(parseInt(e.target.value))}
                className="text-center border-0"
              />
              <span>+1c</span>
            </div>
          </div>
        </div>
        <div className="col-6">
          <div className="d-flex flex-column align-items-center">
            <label htmlFor="" className="fw-semibold">
              Number Of Shares
            </label>
            <div className="border border-dark p-1">
              <span className="">-25</span>
              <input
                type="number"
                name=""
                id=""
                value={shareAmount}
                onChange={(e) => setShareAmount(parseInt(e.target.value))}
                className="text-center border-0"
              />
              <span>+25</span>
            </div>
          </div>
        </div>
        <button
          className="col-12 btn btn-primary rounded-0 fw-semibold"
          onClick={() =>
            user.isSuccess &&
            createOffer.mutate({
              price,
              shareAmount,
              contractType,
              offerType,
              contract: contract.id,
              user: user.data.pk,
            })
          }
        >
          Submit Offer
        </button>
      </div>
    </div>
  );
};

export default OfferForm;
