import { Field, FieldArray, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";

import useCreateMarket from "#/api/mutations/useCreateMarket";
import { MarketFormData } from "#/types";
import { useNavigate } from "react-router-dom";

const CreateMarket: React.FC = () => {
  const navigate = useNavigate();

  // const MarketSchema = Yup.object({
  //   name: Yup.string().required("Name is required"),
  //   rules: Yup.string().required("Rules is required"),
  //   tags: Yup.array(Yup.string().max(16, "Must be 16 characters or less").required()),
  //   contracts: Yup.array(
  //     Yup.object({
  //       name: Yup.string().required("Name is required"),
  //     }),
  //   ).min(1, "Must have at least one contract"),
  // });

  const initialValues: MarketFormData = {
    name: "",
    rules: "",
    tags: [{ name: "Politics" }],
    contracts: [{ name: "Latest Price" }],
  };

  const createMarket = useCreateMarket({
    onSuccess: (market) => navigate(`/markets/${market.id}`),
  });

  return (
    <div className="container mt-3">
      <h1>Create Market</h1>
      <Formik
        initialValues={initialValues}
        // validationSchema={MarketSchema}
        onSubmit={(values) => {
          console.log(values);
          createMarket.mutate(values);
        }}
      >
        {({ values }) => (
          <Form>
            <Field name="name">
              {({ field, meta }: FieldProps) => (
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    {...field}
                    type="text"
                    id="name"
                    placeholder="Name"
                    className={`form-control ${meta.touched && meta.error && "border-danger"}`}
                  />
                  {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                </div>
              )}
            </Field>
            <Field name="rules">
              {({ field, meta }: FieldProps) => (
                <div className="mb-3">
                  <label htmlFor="rules" className="form-label">
                    Rules
                  </label>
                  <textarea
                    {...field}
                    id="rules"
                    placeholder="Rules"
                    className={`form-control ${meta.touched && meta.error && "border-danger"}`}
                  />
                  {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                </div>
              )}
            </Field>
            <FieldArray name="tags">
              {({ push, remove }) => (
                <div>
                  <h5>Tags</h5>
                  {values.tags.map((tag, index) => (
                    <div key={index} className="d-flex align-items-center py-1">
                      <div className="flex-fill ">
                        <Field name={`tags[${index}].name`}>
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <input
                                {...field}
                                type="text"
                                id={`tags[${index}].name`}
                                placeholder="Name"
                                className={`form-control ${meta.touched && meta.error && "border-danger"}`}
                              />
                              {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className="px-2" />
                      <button type="button" className="btn btn-secondary" onClick={() => remove(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary" onClick={() => push({})}>
                      Add tag
                    </button>
                  </div>
                </div>
              )}
            </FieldArray>
            <FieldArray name="contracts">
              {({ push, remove }) => (
                <div>
                  <h5>Contracts</h5>
                  {values.contracts.map((contract, index) => (
                    <div key={index} className="d-flex align-items-center py-1">
                      <div className="flex-fill ">
                        <Field name={`contracts[${index}].name`}>
                          {({ field, meta }: FieldProps) => (
                            <div>
                              <input
                                {...field}
                                type="text"
                                id={`contracts[${index}].name`}
                                placeholder="Name"
                                className={`form-control ${meta.touched && meta.error && "border-danger"}`}
                              />
                              {meta.touched && meta.error && <div className="text-danger">{meta.error}</div>}
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className="px-2" />
                      <button type="button" className="btn btn-secondary" onClick={() => remove(index)}>
                        Remove
                      </button>
                    </div>
                  ))}
                  <div className="d-flex justify-content-center">
                    <button type="button" className="btn btn-primary" onClick={() => push({})}>
                      Add contract
                    </button>
                  </div>
                </div>
              )}
            </FieldArray>
            <div className="d-flex flex-row-reverse">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default CreateMarket;
