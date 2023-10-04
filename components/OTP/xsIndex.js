import React, { useState } from 'react';
import OtpInput from 'react-otp-input';

export default function App() {
  const [otp, setOtp] = useState('');

  return (
    <div className="w-screen h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-40">
            <OtpInput
                value={otp}
                onChange={setOtp}
                numInputs={6}
                renderSeparator={<span>-</span>}
                containerStyle="justify-between"
                renderInput={(props) => <input inputStyle=' bg-red-400' {...props} />}
            />
        </div>
    </div>
    
  );
}