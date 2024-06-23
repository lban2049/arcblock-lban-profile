import styles from '../styles/Home.module.css';
import * as React from 'react';

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MuiTelInput, matchIsValidTel } from 'mui-tel-input';
import { useState } from 'react';
import { generateUID } from '../utils';
import { getUser, saveUser } from '../services/dataApi';

export default function Home() {
  const [profileData, setProfileData] = useState({
    id: '',
    name: '',
    mobile: '',
    email: '',
    introduction: '',
  });

  const [originData, setOriginData] = useState({
    id: '',
    name: '',
    mobile: '',
    email: '',
    introduction: '',
  });

  // check name
  const isNameError = () => {
    if (profileData.name === undefined || profileData.name === '' || profileData.name === null) {
      return true;
    }

    return false;
  };

  // check email
  const isEmailError = () => {
    if (profileData.email === undefined || profileData.email === '' || profileData.email === null) {
      return false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailPattern.test(profileData.email);
  };

  // check can save
  const canSave = () => {
    if (isNameError() || isEmailError() || isMobileError) {
      return false;
    }

    return true;
  };

  const USERID_KEY = 'arc_user_id';

  const [isEdit, setIsEdit] = useState(false);
  const [isFirst, setIsFirst] = useState(false);
  // When first opened, set user ID and remind to fill in user information.
  React.useEffect(() => {
    const initUserData = async () => {
      let userId = localStorage.getItem(USERID_KEY);
      if (!userId) {
        setIsFirst(true);
        setIsEdit(true);
        userId = generateUID();

        localStorage.setItem(USERID_KEY, userId);
        setProfileData({
          ...profileData,
          id: userId,
        });
      } else {
        // query profile info
        const res = await getUser(userId);
        if (res.success) {
          setProfileData({
            ...res.data,
          });
        } else {
          setProfileData({
            ...profileData,
            id: userId,
          });
        }
      }
    };

    initUserData();
  }, []);

  // open edit
  const handleEdit = () => {
    setOriginData({
      ...profileData,
    });

    setIsEdit(true);
  };

  // mobile change
  const [isMobileError, setIsMobileError] = useState(false);
  const handleMobileChange = (value) => {
    const isCorrect = matchIsValidTel(value);
    setIsMobileError(!isCorrect);

    setProfileData({
      ...profileData,
      mobile: value,
    });
  };

  // cancel edit
  const handleCancel = () => {
    setProfileData({ ...originData });
    setIsEdit(false);
  };

  // save
  const handleSave = async () => {
    const res = await saveUser(profileData);

    if (res.success) {
      setIsEdit(false);
    }
  };

  return (
    <div className="sm:flex container pt-6 px-4 mx-auto justify-center">
      <div className=" text-2xl mb-4 sm:min-w-40">Basic Details</div>
      <div className="flex-1 overflow-hidden sm:max-w-xl">
        {isFirst && <div>For first-time use, please fill in profile information.</div>}
        <Box
          component="form"
          sx={{
            '& .MuiTextField-root': { my: 1, width: '100%' },
          }}
          noValidate
          autoComplete="off">
          <div className="">
            <TextField
              error={isNameError()}
              required
              id="name"
              label="Name"
              disabled={!isEdit}
              value={profileData.name}
              onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
              helperText={isNameError() ? 'Please enter your name' : ''}
            />
            <MuiTelInput
              error={isMobileError}
              disabled={!isEdit}
              defaultCountry="US"
              label="Mobile"
              onChange={handleMobileChange}
              value={profileData.mobile}
              helperText={isMobileError ? 'Please enter a valid mobile number' : ''}
            />
            <TextField
              error={isEmailError()}
              id="email"
              label="Email"
              disabled={!isEdit}
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
              helperText={isEmailError() ? 'Please enter a valid email address' : ''}
            />
            <TextField
              id="introduction"
              label="introduction"
              multiline
              maxRows={4}
              disabled={!isEdit}
              value={profileData.introduction}
              onChange={(e) => setProfileData({ ...profileData, introduction: e.target.value })}
            />
          </div>
        </Box>
        <Box sx={{ '& button': { m: 1 } }}>
          <div className=" text-center">
            {isEdit ? (
              <React.Fragment>
                <Button size="medium" variant="outlined" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button disabled={!canSave()} size="medium" variant="contained" onClick={handleSave}>
                  Save
                </Button>
              </React.Fragment>
            ) : (
              <Button size="medium" variant="contained" onClick={handleEdit}>
                Edit
              </Button>
            )}
          </div>
        </Box>
      </div>
    </div>
  );
}
