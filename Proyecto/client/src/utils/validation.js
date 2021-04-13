export function lettersValidation(name) {
  const lettersValid = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
  return lettersValid.test(String(name));
}

export function usernameValidation(username) {
  const usernameValid = /^[a-z0-9_-]{1,15}$/;
  return usernameValid.test(username);
}

export function isOverEighteen(dob) {
  let parts = dob.split("-");
  let dtDOB = new Date(parts[0] + "/" + parts[1] + "/" + parts[2]);
  let dtCurrent = new Date();

  if ((dtCurrent.getFullYear() - dtDOB.getFullYear() )< 18) {
    return false;
  }else{
    return true;
  }
}

export function isFutureDate(date) {
  let parts = date.split("-");
  let dtDOB = new Date(parts[0] + "/" + parts[1] + "/" + parts[2]);
  let dtCurrent = new Date();

  if (dtCurrent.getFullYear() - dtDOB.getFullYear()) {
    return false;
  }else{
    return true
  }
}

export function isPastDate100(date) {
  let parts = date.split("-");
  let dtDOB = new Date(parts[0] + "/" + parts[1] + "/" + parts[2]);
  let dtCurrent = new Date();
  if ((dtCurrent.getFullYear() - dtDOB.getFullYear()) >= 100) {
    return false;
  }else{
    return true
  }
}

export function emailValidation(email){
     const emailValid= /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
     return emailValid.test(String(email))
}

export function passwordValidation(password){
     const passwordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/
     return passwordValid.test(String(password))
}

export function passwordMatchValidation(password1, password2){

  if(password1 === password2){
    return true
  }else{
    return false
  }

}