var users = {
  admin: { id: 1, username: "admin", password: "1234" },
  pepe:  { id: 2, username: "pepe",  password: "5678" }
};

exports.autenticar = function (login, clave, callback) {
  var ok = false;
  if (users[login]) {
    if (clave === users[login].password) {
      callback(null, users[login]);
      ok = true;

    }
  }
  
  if (!ok)
    callback(new Error("Usuario o clave incorrecta."), null); 
};