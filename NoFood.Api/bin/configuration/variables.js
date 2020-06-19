const variables = {
    api: {
        port: process.env.port || 3000
    },
    Database: {
        connection: process.env.connection || 'mongodb+srv://nofoodadmin:avenida689@nofood-tf3en.mongodb.net/nofood?retryWrites=true&w=majority'
    },
    Security: {
        secretKey: 'd41d8cd98f00b204e9800998ecf8427ec76c8c834683ebbab3db58c45'
    }
}

module.exports = variables;