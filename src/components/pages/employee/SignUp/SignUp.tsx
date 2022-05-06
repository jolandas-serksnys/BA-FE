import { Card, CardTitle, Input, Button } from "@src/components/common";
import { Layout } from "@src/components/common/Layout/Layout";
import { useSignUpEmployee } from "@src/hooks/user";
import { Form, Formik } from "formik";
import React from "react";
import { validationSchema } from "./validation";

export const SignUpPage = () => {
  const { mutate, isLoading } = useSignUpEmployee();

  const handleSubmit = (values: any) => {
    mutate(values);
  }

  return (
    <Layout noHeader noFooter className="py-5">
      <div className="row d-flex h-100 align-items-center justify-content-center">
        <div className="d-flex col-12 col-lg-6 flex-column justify-content-center">
          <Card
            header={
              <CardTitle title="Employee" subTitle="Create a new employee account" />
            }
            body={
              <Formik
                initialValues={{
                  email: '',
                  firstName: '',
                  lastName: '',
                  password: '',
                  passwordConfirmation: '',
                  signUpCode: '',
                }}
                onSubmit={handleSubmit}
                validationSchema={validationSchema}
              >
                <Form className="d-flex flex-column gap-3">
                  <div>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      placeholder="Email address"
                    />
                  </div>
                  <div className="row">
                    <div className="col-6">
                      <Input
                        type="text"
                        name="firstName"
                        id="firstName"
                        placeholder="First name"
                      />
                    </div>
                    <div className="col-6">
                      <Input
                        type="text"
                        name="lastName"
                        id="lastName"
                        placeholder="Last name"
                      />
                    </div>
                  </div>
                  <div>
                    <Input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="Password"
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      name="passwordConfirmation"
                      id="passwordConfirmation"
                      placeholder="Repeat password"
                    />
                  </div>
                  <div>
                    <Input
                      type="password"
                      name="signUpCode"
                      id="signUpCode"
                      placeholder="Sign up code"
                      note="This is the code your employer gave your. Contact your employer if they had not given you a code."
                    />
                  </div>
                  <div className="btn-group">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      isLoading={isLoading}
                    >
                      Sign Up
                    </Button>
                  </div>
                </Form>
              </Formik>
            }
          />
        </div>
      </div>
    </Layout>
  );
};