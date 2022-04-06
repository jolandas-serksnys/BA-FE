import { Card, CardTitle, Input, Button } from "@src/components/common";
import { Layout } from "@src/components/common/Layout/Layout";
import { useSignInEmployee } from "@src/hooks/user";
import { Form, Formik } from "formik";
import React from "react";
import { Link } from "react-router-dom";

export const SignInPage = () => {
  const { mutate, isLoading } = useSignInEmployee();

  const handleSubmit = (values: any) => {
    mutate(values);
  }

  return (
    <Layout noHeader noFooter className="py-5">
      <div className="row d-flex h-100 align-items-center justify-content-center">
        <div className="d-flex col-12 col-lg-6 flex-column justify-content-center gap-3">
          <Card
            header={
              <CardTitle title="Employee" subTitle="Please sign in with your employee account information" />
            }
            body={
              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                onSubmit={handleSubmit}
              >
                {() => (
                  <Form
                    className="d-flex flex-column gap-3"
                  >
                    <div>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Email address"
                        autoComplete="email"

                      />
                    </div>
                    <div>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"

                        autoComplete="current-password"
                      />
                    </div>
                    <div className="btn-group">
                      <Button
                        type="submit"
                        disabled={isLoading}
                        isLoading={isLoading}
                      >
                        Sign In
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            }
          />
          <Link className="btn btn-gray w-100" to="/e/sign-up">I have employee sign up code</Link>
        </div>
      </div>
    </Layout>
  );
};