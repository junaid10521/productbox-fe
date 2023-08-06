import React from "react";
import { Layout } from "@components";
import { Link } from "react-router-dom";

export const PageNotFound: React.FC = () => {
  return (
    <Layout>
      <div className="container mx-auto flex justify-center w-11/12 md:w-full">
        <div>
          <h1 className="mb-10 text-center text-3xl font-semibold">
            404 Page Not Found
          </h1>
          <p>
            Go to <Link to="/" className="font-medium mr-6 text-primary text-[#3b82f6]">home</Link> 
          </p>
        </div>
      </div>
    </Layout>
  );
};
