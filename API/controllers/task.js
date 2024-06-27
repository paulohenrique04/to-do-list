import { server } from "../server.js";

export const getTasks = (_, res) => {
    const q = "SELECT * FROM tarefas";

    server.query(q, (err, data) => {
        if(err) 
            return res.json(err);
        return res.status(200).json(data);
    })
};

export const addTask = (req, res) => {
    const q =
        "INSERT INTO tarefas(`categoria`, `nome_da_tarefa`) VALUES(?)";

    const values = [
        req.body.categoria,
        req.body.nome_da_tarefa,
    ];
    server.query(q, [values], (err) => {
        if (err)
            return res.json(err);
        return res.status(200).json("nova tarefa criada");
    })
};

export const updateTask = (req, res) => {
    const q =
        "UPDATE tarefas SET `categoria` = ?, `nome_da_tarefa` = ? WHERE `id` = ?";
    const values = [
        req.body.categoria,
        req.body.nome_da_tarefa,
    ];
    server.query(q, [...values, req.params.id], (err) => {
        if (err)
            return res.json(err);
        return res.status(200).json("tarefa atualizada");
    })
}

export const deleteTask = (req, res) => {
    const q =
        "DELETE FROM tarefas WHERE `id` = ?";
    server.query(q, [req.params.id], (err) => {
        if (err)
            return res.json(err);
        return res.status(200).json("tarefa excluída");
    });
};