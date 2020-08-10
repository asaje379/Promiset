exports.makeFixture = (nbv, nbt, nbr) => {
    const voyelles = 'aeiouy';
    const consonnes = 'bcdfghjklmnpqrstvwxz';
    let villes = [], trajets = [], reservations = [];

    for (let i = 0; i < nbv; ++i) {
        const nbLettres = getRamdom(4, 8);
        let newVille = '';
        for (let j = 0; j < nbLettres; ++j) {
            newVille += (j % 2 == 0 ? consonnes[getRamdom(0, 19)] : voyelles[getRamdom(0, 5)]);
        }
        villes.push({
            id: i + 1,
            name: newVille
        });
    }

    for (let i = 0; i < nbt; ++i) {
        const depart = villes[getRamdom(0, villes.length - 1)].id;
        const copieVille = [ ...villes ];
        copieVille.splice(villes.findIndex(el => el.id == depart) - 1, 1);
        const arrivee = copieVille[getRamdom(0, copieVille.length - 1)].id;
        const nbrPlaces = getRamdom(2, 100);
        trajets.push({
            id: i + 1,
            depart,
            arrivee,
            nbrPlaces
        });
    }

    for (let i = 0; i < nbr; ++i) {
        reservations.push({
            id: i + 1,
            trajet: trajets[getRamdom(0, trajets.length - 1)].id,
            nbrPlaces: getRamdom(1, 5)
        });
    }
    
    return { villes, trajets, reservations }
}

function getRamdom(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

class Ville {
    static id = 0;

    static getId() {
        return ++Ville.id;
    }
}