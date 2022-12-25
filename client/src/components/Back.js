import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';

import useGet from '../utils/useGet';

//====== below 取得Context資料 start ======//
import { useData } from '../utils/context';
//====== above 取得Context資料 end ======//
import { S3_BUCKET_URL } from '../utils/config';

function Back() {
  const history = useHistory();
  const { auth } = useData(); // 取得登入狀態

  const { data: cards, error, isPending } = useGet(`/cards?page=1`);

  return (
    <>
      {auth ? (
        <div className="wrapper">
          <div className="w-full z-20">
            <div className="p-2 bg-white rounded-lg border border-gray-200 shadow-md sm:p-4 lg:p-5 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex flex-col">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="bg-white border-b">
                      <tr>
                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left w-60">
                          Image
                        </th>
                        <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                          Description
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {cards && cards.map((card, idx)  => (<tr className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100" key={idx}>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          <img
                            src={S3_BUCKET_URL + card.imageName}
                            alt=""
                            className="w-56"
                            />
                        </td>
                        <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                          { card.description }
                        </td>
                      </tr>))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="wrapper">
          <div className="card z-20 text-center">
            <Link
              type="button"
              to="/login"
              className="text-blue-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-20 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              請前往登入
            </Link>
          </div>
        </div>
      )}
    </>
  );
}

export default Back;
