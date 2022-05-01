import React from 'react';
import { Link } from 'react-router-dom';

function NotFoundPage() {
  return (
    <>
      <div className="wrapper">
        <div className="card z-20">
          <div class="flex flex-col items-center">
            <h1 class="font-bold text-blue-600 text-9xl">404</h1>

            <h6 class="mb-2 text-2xl font-bold text-center md:text-3xl">
              <span class="text-red-500">Oops!</span> Page not found
            </h6>

            <p class="mb-8 text-center text-gray-500 md:text-lg">
              The page you’re looking for doesn’t exist.
            </p>

            <Link
              to="/"
              class="text-blue-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              回首頁
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default NotFoundPage;
