const AddUpdateValidator = (myObj)=>{
  if(myObj.firstName===''||myObj.firstName===null){
    return false;
  }
  if(myObj.lastName===''||myObj.lastName===null){
    return false;
  }
  if(myObj.number===''||myObj.number===null){
    return false;
  }
  if(myObj.email===''||myObj.email===null){
    return false;
  }
  if(myObj.address===''||myObj.address===null){
    return false;
  }
  if(myObj.category===''||myObj.category===null){
    return false;
  }
  if(myObj.country===''||myObj.country===null){
    return false;
  }
  return true;
}

const loginValidator = (myObj)=>{
  let errorObj={};
  if(myObj.email===''){
    errorObj.emailError='Email can not be empty';
  }
  
  if(myObj.password===''){
    errorObj.passwordError='Password can not be empty';
  }
  
  return errorObj;
}

module.exports.addUpdateValidator=AddUpdateValidator;
module.exports.loginValidator=loginValidator;