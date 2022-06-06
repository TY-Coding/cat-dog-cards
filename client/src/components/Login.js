import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { Account, Password } from '../utils/config';

//====== below 取得Context資料 start ======//
import { useData } from '../utils/context';
//====== above 取得Context資料 end ======//

function Login() {
  const { setAuth } = useData(); // 取得登入狀態
  const history = useHistory();

  //存欄位值
  const [fields, setFields] = useState({
    email: '',
    password: '',
  });

  //存錯誤訊息
  const [fieldErrors, setFieldErrors] = useState({
    email: '',
    password: '',
  });

  const handleFieldChange = (e) => {
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

    const formData = new FormData(e.target);
    let checkEmail = formData.get('email');
    let checkPassword = formData.get('password');
    if (checkEmail === Account && checkPassword === Password) {
      setAuth(true);
      history.push('/upload');
    } else {
      setAuth(false);
      alert('帳號或密碼錯誤');
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="card z-20">
          <div className="p-4 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md sm:p-6 lg:p-8 dark:bg-gray-800 dark:border-gray-700">
            <form
              onChange={handleFormChange}
              onInvalid={handleFormInvalid}
              onSubmit={handleSumbmit}
              className="space-y-6"
            >
              <h5 className="text-xl font-medium">Login in</h5>
              <div>
                <label className="block mb-2 text-sm font-medium ">
                  account
                </label>
                <input
                  onChange={handleFieldChange}
                  type="email"
                  name="email"
                  value={fields.email}
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500"
                  placeholder="name@company.com"
                  required
                />
                {fieldErrors.email !== '' && (
                  <small className="text-red-500">{fieldErrors.email}</small>
                )}
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium">
                  password
                </label>
                <input
                  onChange={handleFieldChange}
                  type="password"
                  name="password"
                  value={fields.password}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500"
                  required
                />
                {fieldErrors.password !== '' && (
                  <small className="text-red-500">{fieldErrors.password}</small>
                )}
              </div>

              <button
                type="submit"
                className="w-full text-blue-50 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Login to Back-end
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
