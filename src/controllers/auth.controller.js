const { verifyEncriptedPassword } = require("../helpers/bcrypt.helper");
const { dbGetUserByUsername, dbRegisterUser } = require("../services/auth.service");
const { generateToken } = require( '../helpers/jwt.helper' );
const { dbInsertUserInfo } = require("../services/userinfo.service");

async function register( req, res ) {
    // Paso 1: Obtener los datos a registrar (usuario)
    const inputData = req.body;
    

    const UserData = {
        name: inputData.name,
        lastname: inputData.lastname,
        gender: inputData.gender,
        username: inputData.username, 
        password: inputData.password,
        mobile: inputData.mobile
    }

    
    try {
        // Paso 2: Verificar si el usuario existe BD  ---> email
        const userFound = await dbGetUserByUsername( inputData.username );
        
            console.log(userFound)
        if( userFound ) {
            return res.json({
                ok: false,
                msg: 'El usuario ya existe.'
            });
        }
        
        // Paso 3: Registrar usuario (No existe)
        const data =  await dbRegisterUser( UserData );
        console.log( data );   
        const UserInfoData = {
            age: inputData.age,
            weight: inputData.weight,
            height: inputData.height,
            userId: data._id
        }
        const UserInfoFound = await dbInsertUserInfo(UserInfoData);
        
        // Paso Opcional: Generar las credenciales (Token) y esto autenticara al usuario

        // Paso 4: Responder al cliente, si el usuario a sido registrado
        res.json({
            ok: true,
            data,
            UserInfoFound
        });
    } 
    catch ( error ) {
        console.error( error );
        res.json({
            ok: false,
            msg: 'Error al registrar usuario'
        });
    }
    
}

async function login( req, res ) {
    // Paso 1: Obtener los datos para autenticar el usuario (username, password) 
    const inputData = req.body;

    try {
        // Paso 2: Verificar si el usuario existe en la BD  -->  email
        const userFound = await dbGetUserByUsername( inputData.username );
        
        if( ! userFound ) {
            return res.json({
                ok: false,
                msg: 'El usuario no existe. Por favor registrese'
            });
        }

        // Paso 3: Verificar si la contrasenia conhincide
        const isValidPassword = verifyEncriptedPassword( inputData.password, userFound.password );

        if( ! isValidPassword ) {
            return res.json({
                ok: false,
                msg: 'Contraseña invalida'
            });
        }

        // Paso 4: Generar credencial para autenticacion pasiva (Token)
        const payload = {
            id: userFound._id,
            name: userFound.name,
            username: userFound.username,
            role: userFound.role
        };
        
        const token = generateToken( payload );
        const jsonUser = userFound.toObject()
        delete jsonUser.__v
        delete jsonUser.createdAt
        delete jsonUser.updatedAt
        // Paso 5: Responder al cliente enviandole el Token
        res.json({
            ok: true,
            token, 
            data: jsonUser
        });

    } 
    catch ( error ) {
        console.error( error );
        res.json({
            ok: false,
            msg: 'Error al ingresar a la aplicacion'
        });        
    }
}

function reNewToken( req, res ) {
    // Paso 1: Obtener el payload del objeto Request
    const payload = req.authUser;

    // Paso 2: Genera nuevo Token con payload del Token anterior
    const newToken = generateToken( payload );

    // Paso 3: Envia el Token al cliente
    res.json({
        ok: true,
        token: newToken
    });
}

module.exports = {
    register,
    login,
    reNewToken
};