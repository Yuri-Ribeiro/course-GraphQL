//hard-code arrays
const profiles = [
    {id: 1, name: 'common'},
    {id: 2, name: 'administrator'}
]

const users = [{
    id: 1,
    name: 'João Silva',
    email: 'jsilva@zemail.com',
    age: 29,
    profile_id: 1
}, {
    id: 2,
    name: 'Rafael Junior',
    email: 'rafajun@wemail.com',
    age: 31,
    profile_id: 2
}, {
    id: 3,
    name: 'Daniela Smith',
    email: 'danismi@umail.com',
    age: 24,
    profile_id: 1
}]

module.exports = { profiles, users }