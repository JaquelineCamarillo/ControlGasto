// Coleccion : Personal
{
    "RFC": "", //RFC Unico de cada empleado para evitar duplicados
    "NombrePersonal": "", //Nombre(s) de los empleados
    "ApPaterno": "", //Apellido Paterno del empleado
    "ApMaterno":"", //Apellido Materno del empleado
    "Sexo": "", //Genero del Emplead
    "FechaNacimiento" : ISODate(), // Fecha de Nacimiento del empleado
    "CorreoElectronico" : "", //Correo electronico del empleado
    "Password" : "", //Contraseña del empleado
    "Rol" : "", //Rol del empleado (Administrador/Operador)
    "FechaCreacion" : ISODate () , // Fecha de registro del empleado
    "Direccion":
    {
		"NumeroInterior":"", //Numero interno (Depto, Habitacion) Opcional
		"NumeroExterior":"", //Numero exterior de la vivienda
		"Calle":"", //Nombre de la calle extraido del catalogo (API)
		"Colonia":"", //Nombre de la colonia extraido del catalogo (API)
		"Ciudad":"" //Nombre de ciudad extraido del catalogo (API)
    } //Direccion Del Empleado
    "Telefono":[
        {
        "Lada":"",
        "Numero": "" //Numero Telefonico
        }
    ], //Puede tener uno o varios
    "Estado":"", //Estado de la cuenta (Activo/Inactivo/Bloqueado)
    "TokenVerificacion" : "", //Token Generado mediante Backend para verificacion de la cuenta
    "EstadoVerificacion" :"", // Booleano que representa si la cuenta esta verificada o no (0: False, 1: True)
    "FechaUltimaModificacion" :"" //Fecha en que se realizo la ultima modificacion de la cuenta
  }
  
  //Coleccion: Ordenante
  {
    "RFCOrdenante":"", //RFC del ordenante
    "NombreOrdenante": "", //Nombre(s) de ordenante
    "ApPaterno": "", //Apellido Paterno del Ordenante
    "ApMaterno":"",//Apellido Materno del Ordenante
    "Sexo": "", //Genero del Ordeannte
    "FechaNacimiento": ISODate(), //Fecha de Nacimiento del Ordenante
    "Cuenta":{
        "NumeroCuenta": "", //Numero de cuenta del ordenante
        "Saldo": 0.00, // Dinero con que cuenta el ordenante, no puede ser negativo
        "Estado":""// Puede ser activo, inactivo y bloqueado.
    },//Solo puede tener una cuenta
    "FechaRegistro" : ISODate(), //Fecha de registro del Ordenante
    "RFCOperador": "", //RFC del Operador que realizo el registro
    "Telefono":{
        [
            "Numero": , // Numero Telefonico
        ]
    }, // Puede tener uno o varios 
    "Direccion":{
        "NumeroInterior": "", //Numero interno (Depto, Habitacion) Opcional
        "NumeroExterior": "", //Numero Exterior de la vivienda
        "Calle": "", //Nombre de calle extraido del catalogo (API)
        "Colonia": "", //Nombre de colonia extraido del catalogo (API)
        "Ciudad": "" // Nombre de ciudad extraido del catalogo (API)
    }, //Direccion del Ordenante
    "FechaUltimaModificacion": ISODate() //Fecha de Ultima Modificacion
  }
  
  //Coleccion: Transaccion
  {
    "IdComprobante": "", // Id Comprobante autogenerada
    "ClaveRastreo": "", // Clave de rastreo autogenerada
    "NumeroCuentaOrdenante": "", // Numero cuenta del ordenante, solo aplica cuando el tipo de transaccion es transferencia
    "NombreCompletoOrdenante": "",//Nombre completo de ordenante, solo aplica cuando el tipo de transaccion es transferencia
    "NombreCompletoBeneficiario": , //Nombre Completo del beneficiario
    "NumeroCuentaBeneficiario":"", // Numero de cuenta del beneficiario
    "RFC_Operador": "", // RFC del operador que realiza la transaccion
    "NombreCompletoOperador" :"", // Nombre del operador que realiza la transaccion
    "Monto": 00.00,// Monto de la transaccion
    "Tipo": "",  // Tipo de transaccion (Transferencia/Deposito/Etc)
    "Estado": "",// Estado de transaccion (Exitoso, Pendiente, Fallado, Cancelado)
    "Fecha": ISODate(), // Fecha de realizacion de la transaccion
    "Concepto":"" //Concepto de la transaccion
  }
  
  //Coleccion: Actividad
  {
    "RFC": , //RFC del Personal quien realiza // No es necesario mostrarlo en BackEnd
    "NombreCompleto":"" //Nombre Completo del personal
    "Rol": "", // Rol del Personal (Operador/Administrador)
    "Accion": "",//Tipo de accion  (Registro/Eliminacion/Login/etc)
    "Detalles": "",//detalles de la actividad
    "Fecha": ISODate()//Fecha de Incidencia.
  }