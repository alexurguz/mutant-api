db.createUser({
    user: 'johnurbaguz',
    pwd: 'meli',
    roles: [
        {
            role: 'readWrite',
            db: 'mutant-challenge'
        }
    ]
});