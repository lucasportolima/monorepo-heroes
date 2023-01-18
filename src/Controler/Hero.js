import { openDb } from '../configDB.js';

export async function createTable(){
    openDb().then(db=>{
        db.exec('CREATE TABLE IF NOT EXISTS Hero ( id INTEGER PRIMARY KEY, name TEXT, team TEXT )')
    })
}

export async function selectHeroes(req, res){
    openDb().then(db=>{
        db.all('SELECT * FROM Hero')
        .then(heroes=>  res.json(heroes))
    });
}

export async function selectHero(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('SELECT * FROM Hero WHERE id=?', [id])
        .then(hero=> res.json(hero) );
    });
}

export async function insertHero(req, res){
    let hero = req.body;
    openDb().then(db=>{
        db.run('INSERT INTO Hero (name, team) VALUES (?,?)', [hero.name, hero.team]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function updateHero(req, res){
    let hero = req.body;
    openDb().then(db=>{
        db.run('UPDATE Hero SET name=?, team=? WHERE id=?', [hero.name, hero.team, hero.id]);
    });
    res.json({
        "statusCode": 200
    })
}

export async function deleteHero(req, res){
    let id = req.body.id;
    openDb().then(db=>{
        db.get('DELETE FROM Hero WHERE id=?', [id])
        .then(res=>res)
    });
    res.json({
        "statusCode": 200
    })
}