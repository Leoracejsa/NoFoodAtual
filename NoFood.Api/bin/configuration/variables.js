const variables = {
    api: {
        port: process.env.port || 3000
    },
    Database: {
        connection: process.env.connection || 'mongodb+srv://nofoodadmin:avenida689@nofood-tf3en.mongodb.net/nofood?retryWrites=true&w=majority'
    }
}

module.exports = variables;