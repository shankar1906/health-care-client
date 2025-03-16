"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button"; // Adjust the import based on your button component
import { Card } from "@/components/ui/card"; // Adjust the import based on your card component

export default function UnAuth() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-light-gray">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-blue-600 invisible">404</h1>
        <div className="mt-4">
          {/* Placeholder for illustration */}
          <img src="https://data.textstudio.com/output/sample/animated/0/7/8/2/401-29-12870.gif" alt="Illustration" className="w-1/2 mx-auto" />
        </div>
        <div className="mt-4 w-1/2 mx-auto">
        <h2 className="text-2xl font-bold text-gray-700">Unauthorized Access</h2>
        <p className="mt-4 text-lg text-gray-700">
        Oops! It looks like you don't have permission to access this page. Please log in or contact the administrator if you believe this is an error.
        </p>
        </div>
        <Button
          variant="primary"
          className="mt-6 bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
          onClick={() => router.back()} // Change to your projects route
        >
          Go to Back
        </Button>
      </div>
    </div>
  );
}
