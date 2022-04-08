import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import axios from 'axios';

//====== below icon start ======//
import { CameraIcon } from '@heroicons/react/solid';
//====== above icon end ======//

//====== below 取得Context資料 start ======//
import { useData } from '../utils/context';
//====== above 取得Context資料 end ======//

function BackEnd() {
  const { auth } = useData(); // 取得登入狀態

  const [image, setImage] = useState({ preview: '', raw: '' });
  console.log('image', image.raw); //for check

  //存欄位值
  const [fields, setFields] = useState({
    file: '',
    description: '',
  });
  console.log('fields', fields); //for check

  //存錯誤訊息
  const [fieldErrors, setFieldErrors] = useState({
    file: '',
    description: '',
  });

  const handleFieldChange = (e) => {
    if (e.target.name === 'file') {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
    const updatedFields = {
      ...fields,
      [e.target.name]: e.target.value,
    };
    setFields(updatedFields);
  };

  //當表單有變動的時候
  const handleFormChange = (e) => {
    const errorFields = {
      ...fieldErrors,
      [e.target.name]: '',
    };
    setFieldErrors(errorFields);
  };

  //當表單有錯誤(不合檢查的時候)的時候
  const handleFormInvalid = (e) => {
    e.preventDefault();
    const errorFields = {
      ...fieldErrors,
      [e.target.name]: e.target.validationMessage,
    };
    setFieldErrors(errorFields);
  };

  //接表單輸入的資料
  const handleSumbmit = (e) => {
    e.preventDefault(); //記住你輸入時的值,submit時不會清空

    const data = new FormData();
    data.append('uploadImage', image.raw);
    data.append('description', fields.description);
    let checkFile = data.get('uploadImage');
    let checkDescription = data.get('description');
    console.log('checkFile', checkFile); //for check
    console.log('checkDescription', checkDescription); //for check

    //NEXT: 送到伺服器去
    async function sendSubmit() {
      try {
        const sendApi = await axios.post(`http://localhost:8080/api/card`, data);
        console.log('Post sendApi:', sendApi.data);
      } catch (e) {
        console.log(e.response);
      }
    }
    sendSubmit();
  };

  return (
    <>
      {auth ? (
        <div className="wrapper">
          <div className="card z-20">
            <div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
              <form
                onChange={handleFormChange}
                onInvalid={handleFormInvalid}
                onSubmit={handleSumbmit}
                className="space-y-6"
              >
                <h5 className="text-xl font-medium ">後台</h5>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    Upload
                  </label>
                  <label className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 text-gray-400 cursor-pointer flex">
                    <CameraIcon className="w-5 h-5 mr-2" />
                    <input
                      onChange={handleFieldChange}
                      type="file"
                      name="file"
                      value={fields.file}
                      accept=".png,.jpg,.jpeg"
                      className="hidden"
                      required
                    />
                    請上傳圖片
                  </label>
                  {fieldErrors.file !== '' && (
                    <small className="text-red-500">{fieldErrors.file}</small>
                  )}
                  {image.preview ? (
                    <img
                      src={image.preview}
                      alt="preview"
                      className="w-[200px]"
                    />
                  ) : (
                    <h5 className="text-center">Preview your photo</h5>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium">
                    description
                  </label>
                  <textarea
                    onChange={handleFieldChange}
                    name="description"
                    value={fields.description}
                    maxLength="120"
                    placeholder="限輸入120字"
                    className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 placeholder-gray-400 h-[150px]"
                    required
                  />
                  {fieldErrors.description !== '' && (
                    <small className="text-red-500">
                      {fieldErrors.description}
                    </small>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full text-blue-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Send
                </button>
              </form>
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

export default BackEnd;
