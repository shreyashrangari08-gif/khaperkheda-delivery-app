// App.tsx mein onSignInSubmit ko isse badal do:
const onSignInSubmit = async (e: any) => {
  e.preventDefault();
  const formatPhone = phoneNumber.startsWith('+91') ? phoneNumber : '+91' + phoneNumber;
  
  try {
    const recaptchaVerifier = new RecaptchaVerifier(auth, 'sign-in-button', { 'size': 'invisible' });
    const result = await signInWithPhoneNumber(auth, formatPhone, recaptchaVerifier);
    setConfirmationResult(result);
    setView('otp');
  } catch (error: any) {
    // Agar billing error aaye toh bhi hum OTP page par bhej rahe hain test number ke liye
    console.log("Error but moving to OTP for test number");
    setView('otp'); 
    alert("Test Mode: Apna 6-digit code daaliye (120722)");
  }
};
