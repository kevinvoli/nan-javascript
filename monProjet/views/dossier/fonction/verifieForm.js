verification = require('./verifieValeur')


exports.verifForm = function verifForm(values)
{
   var nameOk = verification.verifieName(values.name);
   var prenomOk = verification.verifiePrenom(values.prenom);
   var emailOk = verification.verifieEmail(values.email);
   var passwordOk = verification.verifiePassword(values.password,values.confirm);
   var numeroOk = verification.verifieNumero(values.numero);
  
   
   if( nameOk && prenomOk && emailOk && passwordOk && numeroOk){
      return true;
   }
   else
   {
      
      return false;
   }
}