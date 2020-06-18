'use strict'

const repository = require('../repositories/usuario-repository');
const validation = require('../bin/helpers/validation');
const ctrlBase = require('../bin/base/controller-base');
const _repo = new repository();
const md5 = require('md5');

function usuarioController(){
    
    
}

usuarioController.prototype.post = async(req, res) => {
    let _validationContract = new validation();

    _validationContract.isRequired(req.body.email, 'Informe seu e-mail');
    _validationContract.isEmail(req.body.email, 'O e-mail informado é inválido');
    _validationContract.isRequired(req.body.senha, 'A senha informada é obrigatória');
    _validationContract.isRequired(req.body.senha == req.body.senhaConformacao, 'A senha de confirmação é obrigatória');
    _validationContract.isTrue(req.body.senha != req.body.senhaConformacao, 'A Senha e a Confirmação não são iguais');

    let usuarioIsEmailExiste = await _repo.IsEmailExiste(req.body.email);
    if(usuarioIsEmailExiste){
        _validationContract.isTrue((usuarioIsEmailExiste.nome != undefined), `Já existe o e-mail ${req.body.email} cadastrado em nossa base.`);
    }
    //Criptografando a senha do usuário 
    req.body.senha = md5(req.body.senha);

 };

usuarioController.prototype.put = async(req, res) => {
    let resultado = await _repo.update(req.params.id, req.body);
    res.status(202).send(resultado);
 };

usuarioController.prototype.get = async(req, res) => { 
    let lista = await _repo.getAll();
    res.status(200).send(lista);
};

usuarioController.prototype.getById = async(req, res) => {
    let usuario = await _repo.getById(req.params.id);
    res.status(200).send(usuario);
 };

usuarioController.prototype.delete = async(req, res) => { 
    let deletado = await _repo.delete(req.params.id)
    res.status(204).send(deletado);
};

module.exports = usuarioController;