
import validator from 'validator';

const validateData =(name,email, password,confirmPassword="login")=> {

    const errors = [];
    
    if (!validator.isEmail(email)) {
      errors.push("Invalid Email");
    }
  
    if (password.length < 6) {
      errors.push("password should be at least 6 characters long");
    }
    if(confirmPassword!=="login")
    {
      if(name.length < 1)
        errors.push("first name should be at least 1 characters long");
      if(confirmPassword.length <6)
        errors.push("password should be at least 6 characters long");
      
      if(password !== confirmPassword ) 
        errors.push('Passwords dont match');
    }

    return errors;
  }

  export default validateData;