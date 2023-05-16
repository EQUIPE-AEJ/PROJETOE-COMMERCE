const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

//RETORNA TODOS OS PRODUTOS
router.get('/', (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error }) };
        conn.query(
            'SELECT * FROM Produto;',
            (error, resultado, fields) =>{
                conn.release();
                if(error){ return res.status(500).send({ error: error }) };
                return res.status(200).send({response: resultado});
            }
        )
    })
});

//RETORNA UM PRODUTO ESPECIFICO
router.get('/:Cd_produto', (req, res, next) =>{
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error }) };
        conn.query(
            'SELECT * FROM Cliente WHERE Cd_produto = ?;',
            [req.params.Cd_produto],
            (error, resultado, fields) =>{
                conn.release();
                if(error){ return res.status(500).send({ error: error }) };
                return res.status(200).send({response: resultado});
            }
        )
    })
});

//CADASTRA UM NOVO PRODUTO
router.post('/cadastro', (req, res, next) => {
    mysql.getConnection((error, conn) =>{
        if(error){ return res.status(500).send({ error: error }) };
        conn.query('SELECT * FROM Cliente WHERE Nome_Produto = ?', [req.body.Nome_Produto], (error, results) =>{
            if(error) { return res.status(500).send({ error: error })}
            if(results.length > 0) {
                res.status(409).send({ mensagem: 'Produto já cadastrado' })
            } else{
                conn.query(`INSERT INTO Produto (Nome_Produto, Marca, Preco, Custo, Cor) VALUES (?,?,?,?,?)`,
                [req.body.Nome_Produto, req.body.Marca, req.body.Preco, req.body.Custo, req.body.Cor],
                (error, results) =>{
                    conn.release();
                    if (error) { return res.status(500).send({ error: error })}
                    res.status(201).send({
                        mensagem: 'Produto cadastrado com sucesso!'
                    })
                })
            }
        })
    })
});