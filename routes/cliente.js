const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');


//RETORNA TODOS OS CLIENTES
router.get('/', (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error }) };
        conn.query(
            'SELECT * FROM Cliente;',
            (error, resultado, fields) =>{
                conn.release();
                if(error){ return res.status(500).send({ error: error }) };
                return res.status(200).send({response: resultado});
            }
        )
    })
});

//RETORNA UM CLIENTE ESPECIFICO
router.get('/:Id_Cliente', (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error }) };
        conn.query(
            'SELECT * FROM Cliente WHERE Id_Cliente = ?;',
            [req.params.Id_Cliente],
            (error, resultado, fields) =>{
                conn.release();
                if(error){ return res.status(500).send({ error: error }) };
                return res.status(200).send({response: resultado});
            }
        )
    })
});

//CADASTRA UM CLIENTE NOVO
router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error }) };
        conn.query('SELECT * FROM Cliente WHERE Email = ?', [req.body.Email], (error, results) =>{
            if(error) { return res.status(500).send({ error: error })}
            if(results.length > 0) {
                res.status(409).send({ mensagem: 'Cliente já cadastrado' })
            } else{
                bcrypt.hash(req.body.Senha, 10, (errBcrypt, hash) =>{
                    if (errBcrypt) { return res.status(500).send({ error: errBcrypt }) }
                    conn.query(`INSERT INTO Cliente (Email, Senha, Nome, Sobrenome, Dt_Nascimento, RG, Celular, CPF, Sexo) VALUES (?,?,?,?,?,?,?,?,?)`,
                    [req.body.Email, hash, req.body.Nome, req.body.Sobrenome, req.body.Dt_Nascimento, req.body.RG, req.body.Celular, req.body.CPF, req.body.Sexo],
                    (error, results) =>{
                        conn.release();
                        if (error) { return res.status(500).send({ error: error })}
                        res.status(201).send({
                            mensagem: 'Cliente cadastrado com sucesso!'
                        })
                    })
                })
            }
        })
    })
});